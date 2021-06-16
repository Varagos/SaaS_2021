import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { logout as logoutConnect } from '../actions/authActions';

const ErrorHandler = ({ status, msg, logout }) => {
  console.log(status, typeof status);
  if (status === 401) {
    logout();
    return (
      <Alert variant='warning'>
        Your session has timed out. Please login again.
      </Alert>
    );
  }
  return <div>{msg}</div>;
};

ErrorHandler.propTypes = {
  status: PropTypes.number.isRequired,
  msg: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout: logoutConnect })(ErrorHandler);
