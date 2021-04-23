import React from "react";
import "./Login.css";
import GlobalNavbar from "../common/GlobalNavbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function Login() {
  return (
    <div>
      <GlobalNavbar />
      <Container fluid="sm">
        <h1 className="text-center mt-5 mb-5">Sign in</h1>
        <Form>
          <Form.Row className="mb-4 justify-content-md-center">
            <Form.Label column md={2}>
              Email Address:
            </Form.Label>{" "}
            {/* 12/12 in small devices, 6/12 in md */}
            <Col xs={12} md={6}>
              <Form.Control type="email" placeholder={"Email address*"} />
            </Col>
          </Form.Row>
          <Form.Row className="mb-4 justify-content-md-center">
            <Form.Label column md={2}>
              Password:
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control type="password" placeholder={"Password*"} />
            </Col>
          </Form.Row>
          <Form.Row className="justify-content-center">
            <Button variant="dark" size="lg" type="submit">
              Login
            </Button>
          </Form.Row>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
