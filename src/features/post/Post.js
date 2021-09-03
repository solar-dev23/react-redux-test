import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchPosts } from './postSlice';

export function Post() {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container className="d-flex flex-wrap my-3" aria-label="Post">
      {loading && <Spinner animation="border" variant="primary" />}
      {hasErrors && <p>Cannot display posts...</p>}

      <Row xs={1} md={3} className="g-4" role="list">
        {posts.map((post, idx) => (
          <Col key={idx} role="list-item">
            <Card className="d-flex p-2 h-100">
              <Card.Body className="flex-grow-0">
                <Link to={`/comments?postId=${post.id}`}>
                  <Card.Title>{post.title}</Card.Title>
                </Link>
              </Card.Body>
              <Card.Text>{post.body}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
