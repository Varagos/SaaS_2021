import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout as logoutConnect } from '../actions/authActions';

const Logout = ({ logout }) => (
  <>
    <Link to='/' className='nav-link' onClick={logout}>
      Logout
    </Link>
  </>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout: logoutConnect })(Logout);
