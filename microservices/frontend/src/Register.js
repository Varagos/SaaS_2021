import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import { authenticator } from "./config";

function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function handleErrors(response) {
    if (!response.ok) {
      // handle wrong email / password
      throw Error(response.statusText); // skip next then
    }
    return response;
  }

  function handleClick(event) {
    event.preventDefault();
    fetch(`${authenticator}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        console.log("promise resolved", result);
      })
      .catch((error) => console.log("Error caught: ", error));
  }

  /* xs={12} md={6} => 12/12 in small devices, 6/12 in md */
  return (
    <Container fluid="sm">
      <h1 className="text-center mt-5 mb-5">Sign up</h1>
      <Form onSubmit={handleClick}>
        <Form.Row className="mb-4 justify-content-md-center">
          <Form.Label column md={2}>
            Email Address:
          </Form.Label>
          <Col xs={12} md={6}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address*"
              value={credentials.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className="mb-4 justify-content-md-center">
          <Form.Label column md={2}>
            Password:
          </Form.Label>
          <Col xs={12} md={6}>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password*"
              value={credentials.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Button variant="dark" size="lg" type="submit">
            Register
          </Button>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default Register;
