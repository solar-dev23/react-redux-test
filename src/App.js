import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { Post } from './features/post/Post';
import { Comment } from './features/comment/Comment';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>React Redux Test</Navbar.Brand>
          <Nav.Link>Jayden Jin</Nav.Link>
        </Container>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Post} />
          <Route exact path="/comments" component={Comment} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
