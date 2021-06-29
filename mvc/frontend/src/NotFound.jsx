import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import pageNotFound from './img/undraw_page_not_found_su7k.svg';

const NotFound = () => (
  <Jumbotron>
    <div className='d-sm-flex align-items-center justify-content-start'>
      <div className='mr-4'>
        <h1>Sorry</h1>
        <p>This page cannot be found</p>
        <Link to='/'>Back to homepage</Link>
      </div>
      <img
        className='img-fluid w-25 d-none d-md-block'
        src={pageNotFound}
        alt='Page not found'
      />
    </div>
  </Jumbotron>
);

export default NotFound;
