import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const DiagramLoader = () => (
  <div className='w-100 p-3 d-flex justify-content-center align-content-center'>
    <Loader type='Circles' color='#00BFFF' height={80} width={80} />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default DiagramLoader;
