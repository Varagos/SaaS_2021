import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from './LineChart';
import { getUsersLine as getUsersLineAction } from '../../actions/analyticsActions';

const UserAnalyticsPage = ({ lineGraph, getUsersLine }) => {
  // const data = {
  //   labels: [
  //     '9:00AM',
  //     '12:00AM',
  //     '3:00PM',
  //     '6:00PM',
  //     '9:00PM',
  //     '12:00PM',
  //     '3:00PM',
  //     '6:00PM',
  //   ],
  //   datasets: [
  //     {
  //       label: '# of Questions',
  //       data: [300, 190, 300, 500, 200, 300, 757, 441],
  //       fill: false,
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgba(255, 99, 132, 0.2)',
  //     },
  //     {
  //       label: '# of Answers',
  //       fill: false,
  //       data: [340, 290, 550, 740, 290, 380, 657, 441],
  //       backgroundColor: 'rgb(54, 162, 235)',
  //       borderColor: 'rgba(54, 162, 235, 0.2)',
  //     },
  //   ],
  // };

  useEffect(() => {
    getUsersLine();
  }, []);

  return (
    <>
      <Row>
        <Col md={8} className='bg-white rounded'>
          <LineChart
            title='Users Behavior'
            subTitle='24 Hours Performance'
            data={lineGraph}
          />
        </Col>
      </Row>
    </>
  );
};

UserAnalyticsPage.propTypes = {
  lineGraph: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf({
      label: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  getUsersLine: PropTypes.func.isRequired,
};
UserAnalyticsPage.defaultProps = {
  lineGraph: { labels: [], datasets: [{ label: '', data: [] }] },
};

const mapStateToProps = (state) => ({
  lineGraph: state.analytics.usersLine,
});

export default connect(mapStateToProps, { getUsersLine: getUsersLineAction })(
  UserAnalyticsPage
);
