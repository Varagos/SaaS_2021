import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from './LineChart';
import { getUsersLine as getUsersLineAction } from '../../actions/analyticsActions';
import DiagramLoader from '../DiagramLoader';

const UserAnalyticsPage = ({ lineGraph, lineGraphLoading, getUsersLine }) => {
  useEffect(() => {
    getUsersLine();
  }, []);

  return (
    <>
      <Row>
        <Col md={8} className='bg-white rounded'>
          {lineGraphLoading ? (
            <DiagramLoader />
          ) : (
            <LineChart
              title='Users Behavior'
              subTitle='24 Hours Performance'
              data={lineGraph}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

UserAnalyticsPage.propTypes = {
  lineGraph: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
  getUsersLine: PropTypes.func.isRequired,
  lineGraphLoading: PropTypes.bool.isRequired,
};
UserAnalyticsPage.defaultProps = {
  lineGraph: { labels: [], datasets: [{ label: '', data: [] }] },
};

const mapStateToProps = (state) => ({
  lineGraph: state.analytics.usersLine,
  lineGraphLoading: state.analytics.usersLineLoading,
});

export default connect(mapStateToProps, { getUsersLine: getUsersLineAction })(
  UserAnalyticsPage
);
