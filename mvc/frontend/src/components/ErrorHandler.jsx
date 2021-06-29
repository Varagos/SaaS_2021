import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { logout as logoutConnect } from '../actions/authActions';

const ErrorHandler = ({ status, msg, logout, isAuthenticated }) => {
  console.log(status, typeof status);
  if (status === 401 && isAuthenticated) {
    logout();
    return (
      <Alert variant='warning'>
        Your session has timed out. Please login again.
      </Alert>
    );
  }
  if (status === 401) {
    return <></>;
  }
  return <div>{msg}</div>;
};

ErrorHandler.propTypes = {
  status: PropTypes.number.isRequired,
  msg: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.func.isRequired,
};

export default connect(null, { logout: logoutConnect })(ErrorHandler);
