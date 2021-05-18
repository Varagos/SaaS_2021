import React, {useEffect, useState, useRef} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import PropTypes from 'prop-types'
import { connect} from "react-redux";
import { register } from './actions/authActions'
import { clearErrors} from "./actions/errorActions";
import { useHistory} from "react-router";

function Register(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg ] = useState(null)
  const prevError = useRef(props.error)

  const history = useHistory();

  useEffect(() => {
    console.log('Initial Use Effect called')
    console.log('prevError: ', prevError.current)
      console.log('props.error: ', props.error)
    props.clearErrors()
  },[])

  useEffect(()=> {
    const { error, isAuthenticated } = props
    console.log('Dependencies Use Effect called')
    if (error !== prevError.current) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        console.log('REGISTER_FAIL')
        const msgReceived = Array.isArray(error.msg)? error.msg[0] : error.msg
        prevError.current = props.error
        setMsg(msgReceived)
      } else {
        setMsg(null)
      }
    }
    console.log('isAuthenticated: ',isAuthenticated)

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
    const { email, password } = credentials
    const newUser = {email, password}
    // Attempt to register
    props.register(newUser)
  }

  // const msgReceived = Array.isArray(error.msg)? error.msg[0] : error.msg

  /* xs={12} md={6} => 12/12 in small devices, 6/12 in md */
  return (
    <Container fluid="sm">
      <h1 className="text-center mt-5 mb-5">Sign up</h1>
      {msg && <Alert variant="danger">
        {msg}
      </Alert>}
      <Form onSubmit={handleSubmit}>
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

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
 isAuthenticated: state.auth.isAuthenticated,
 error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(Register);
