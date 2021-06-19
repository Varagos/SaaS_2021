import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

const QuestionLoader = () => (
  <div className='w-100 p-3 d-flex justify-content-center align-content-center'>
    <Loader type='ThreeDots' color='#00BFFF' height={100} width={100} />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
export default QuestionLoader;
