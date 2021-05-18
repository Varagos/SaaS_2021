import React, {useEffect, useRef, useState} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import PropTypes from 'prop-types'
import { connect} from "react-redux";
import {login} from './actions/authActions'
import { clearErrors} from "./actions/errorActions";
import { useHistory} from "react-router";
import Alert from "react-bootstrap/Alert";

function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg ] = useState(null)
  const prevError = useRef(props.error)

  const history = useHistory();

  useEffect(() => {
    console.log('Initial Use Effect called')
    props.clearErrors()
  },[])

  useEffect(()=> {
    const { error, isAuthenticated } = props
    if (error !== prevError.current) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        const msgReceived = Array.isArray(error.msg)? error.msg[0] : error.msg
        prevError.current = props.error
        setMsg(msgReceived)
      } else {
        setMsg(null)
      }
    }
    if(isAuthenticated) {
      props.clearErrors()
      history.push('/')
    }
  })


  function handleChange(event) {
    const { name, value } = event.target;
    setCredentials((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }


  function handleSubmit(event) {
    event.preventDefault();
    // Attempt to register
    props.login(credentials)
  }


  return (
    // <div>
    <Container fluid="sm">
      <h1 className="text-center mt-5 mb-5">Sign in</h1>
      {msg && <Alert variant="danger">
        {msg}
      </Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Row className="mb-4 justify-content-md-center">
          <Form.Label column md={2}>
            Email Address:
          </Form.Label>{" "}
          {/* 12/12 in small devices, 6/12 in md */}
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
            Login
          </Button>
        </Form.Row>
      </Form>
    </Container>
    // </div>
  );
}


Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {login, clearErrors})(Login);
