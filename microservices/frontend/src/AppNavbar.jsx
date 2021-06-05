import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from './components/Logout';

const AppNavbar = ({ auth }) => {
  const { isAuthenticated, user } = auth;
  const authLinks = (
    <>
      <span className='navbar-text mr-3'>
        <strong className='text-light'>
          {' '}
          {user ? `Welcome ${user.email}` : ''}
        </strong>
      </span>
      <Logout />
    </>
  );
  const guestLinks = (
    <>
      <Link to='/login' className='nav-link'>
        Login
      </Link>
      <Link to='/register' className='nav-link'>
        Register
      </Link>
    </>
  );

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Navbar.Brand as={Link} to='/'>
        Ask<span className='font-weight-bold text-white'>Me</span>Anything
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.shape({
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.shape({
      user_id: PropTypes.number,
      email: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
