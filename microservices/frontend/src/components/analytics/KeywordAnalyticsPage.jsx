import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from './BarChart';
import { getKeywordsBar as getKeywordsBarAction } from '../../actions/analyticsActions';
import DateForm from './DateForm';

const KeywordAnalyticsPage = ({ barGraph, getKeywordsBar }) => {
  useEffect(() => {
    getKeywordsBar();
  }, []);

  return (
    <>
      <DateForm submitAction={getKeywordsBar} />
      <Row>
        <Col md={8} className='bg-white rounded'>
          <BarChart
            title='Keywords Usage'
            subTitle='Total questions of top 20 keywords'
            data={barGraph}
          />
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
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  getKeywordsBar: PropTypes.func.isRequired,
};
KeywordAnalyticsPage.defaultProps = {
  barGraph: { labels: [], datasets: [{ label: '', data: [] }] },
};

const mapStateToProps = (state) => ({
  barGraph: state.analytics.keywordsBar,
});
export default connect(mapStateToProps, {
  getKeywordsBar: getKeywordsBarAction,
})(KeywordAnalyticsPage);
