import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from './LineChart';
import BarChart from './BarChart';
import QuestionTable from './QuestionTable';
import {
  getQuestionsLine as getQuestionsLineAction,
  getQuestionsBar as getQuestionsBarAction,
} from '../../actions/analyticsActions';
import DateForm from './DateForm';

const QuestionAnalyticsPage = ({
  lineGraph,
  barGraph,
  getQuestionsLine,
  getQuestionsBar,
}) => {
  useEffect(() => {
    getQuestionsLine();
    getQuestionsBar();
  }, []);

  return (
    <>
      <DateForm submitAction={getQuestionsLine} />
      <Row>
        <Col sm={12} md={6} className='bg-white rounded mb-3'>
          <LineChart title='Questions Per Day' data={lineGraph} />
        </Col>
        <Col sm={12} md={5} className='bg-white rounded mb-3 ml-auto'>
          <BarChart
            title='Avg Questions/Answers'
            subTitle='12 month basis'
            data={barGraph}
          />
        </Col>
      </Row>
      <Row>
        <QuestionTable data={lineGraph} />
      </Row>
    </>
  );
};

QuestionAnalyticsPage.propTypes = {
  lineGraph: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  barGraph: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(),
  }),
  // barGraph,
  getQuestionsLine: PropTypes.func.isRequired,
  getQuestionsBar: PropTypes.func.isRequired,
};
QuestionAnalyticsPage.defaultProps = {
  lineGraph: { labels: [], datasets: [{ label: '', data: [] }] },
  barGraph: { labels: [], datasets: [{ label: '', data: [] }] },
};

const mapStateToProps = (state) => ({
  lineGraph: state.analytics.questionsLine,
  barGraph: state.analytics.questionsBar,
});

export default connect(mapStateToProps, {
  getQuestionsBar: getQuestionsBarAction,
  getQuestionsLine: getQuestionsLineAction,
})(QuestionAnalyticsPage);
