import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';

import { fetchComments, addComment } from './commentSlice';
import styles from './Comment.module.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Comment() {
  const dispatch = useDispatch();
  const query = useQuery();
  const postId = query.get('postId');
  const { comments, loading, hasErrors } = useSelector(
    (state) => state.comments,
  );
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const formData = new FormData(form),
      formDataObj = Object.fromEntries(formData.entries());

    dispatch(
      addComment({
        ...formDataObj,
        postId: postId,
      }),
    );
    setValidated(false);
    setShow(false);
  };

  return (
    <div className={styles.commentPage} aria-label="Comment">
      <Container className="d-flex flex-wrap my-3 flex-column align-items-start">
        <Link to="/">Back</Link>
        <div className="d-flex w-100 justify-content-between align-items-center my-2">
          <h4>Comments</h4>
          <Button variant="primary" onClick={handleShow}>
            Add New
          </Button>
        </div>

        {loading && <Spinner animation="border" variant="primary" />}
        {hasErrors && <p>Cannot display comments...</p>}

        <div className="d-flex comment-list">
          <Row xs={1} md={3} className="d-flex g-4" role="list">
            {comments.map((comment, idx) => (
              <Col key={idx} role="list-item">
                <Card className={styles.card}>
                  <Card.Body className="flex-grow-0">
                    <Card.Title>{comment.name}</Card.Title>
                  </Card.Body>
                  <Card.Text>{comment.email}</Card.Text>
                  <Card.Text>{comment.body}</Card.Text>
                  <Card.Text className={styles.postId}>
                    Post ID: {comment.postId}
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required />
              <Form.Control.Feedback type="invalid">
                Please input name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea" name="body" rows={3} required />
              <Form.Control.Feedback type="invalid">
                Please input body.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
