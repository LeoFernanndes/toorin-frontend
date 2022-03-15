import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container'


type MyProps = {
    // using `interface` is also ok
    message: string;
  };
type MyState = {
  count: number; // like this
};
export class TopNavbar extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/create-book">Create book</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
          </Container>
      </Navbar>       
    );
  }
}