import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from './BarChart';
import { getKeywordsBar as getKeywordsBarAction } from '../../actions/analyticsActions';
import DateForm from './DateForm';
import DiagramLoader from '../DiagramLoader';

const KeywordAnalyticsPage = ({
  barGraph,
  barGraphLoading,
  getKeywordsBar,
}) => {
  useEffect(() => {
    getKeywordsBar();
  }, []);

  return (
    <>
      <DateForm submitAction={getKeywordsBar} />
      <Row>
        <Col md={8} className='bg-white rounded'>
          {barGraphLoading ? (
            <DiagramLoader />
          ) : (
            <BarChart
              title='Keywords Usage'
              subTitle='Total questions of top 20 keywords'
              data={barGraph}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

KeywordAnalyticsPage.propTypes = {
  barGraph: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  getKeywordsBar: PropTypes.func.isRequired,
  barGraphLoading: PropTypes.bool.isRequired,
};
KeywordAnalyticsPage.defaultProps = {
  barGraph: { labels: [], datasets: [{ label: '', data: [] }] },
};

const mapStateToProps = (state) => ({
  barGraph: state.analytics.keywordsBar,
  barGraphLoading: state.analytics.keywordsBarLoading,
});
export default connect(mapStateToProps, {
  getKeywordsBar: getKeywordsBarAction,
})(KeywordAnalyticsPage);
