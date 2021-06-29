import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  BsFillQuestionCircleFill,
  BsFillTagFill,
  BsFillPersonFill,
} from 'react-icons/bs';

import QuestionAnalyticsPage from './components/analytics/QuestionAnalyticsPage';
import UserAnalyticsPage from './components/analytics/UserAnalyticsPage';
import KeywordAnalyticsPage from './components/analytics/KeywordAnalyticsPage';
import ErrorHandler from './components/ErrorHandler';

function AnalyticsDashboard({ error }) {
  return (
    <Tab.Container id='left-tab' defaultActiveKey='questions'>
      <Row className='min-vh-100 vw-100'>
        <Col md={2} className='bg-indigo p-0 rounded-bottom'>
          <Nav variant='pills' className='flex-md-column'>
            <Nav.Item>
              <Nav.Link eventKey='questions' className='text-light ml-2'>
                <BsFillQuestionCircleFill /> QUESTIONS
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='keywords' className='text-light ml-2'>
                <BsFillTagFill /> KEYWORDS
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='users' className='text-light ml-2'>
                <BsFillPersonFill /> USERS
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className='bg-light p-4'>
          {error.status && (
            <ErrorHandler msg={error.msg} status={error.status} />
          )}
          <Tab.Content>
            <Tab.Pane eventKey='questions'>
              <QuestionAnalyticsPage />
            </Tab.Pane>
            <Tab.Pane eventKey='keywords'>
              <KeywordAnalyticsPage />
            </Tab.Pane>
            <Tab.Pane eventKey='users'>
              <UserAnalyticsPage />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

AnalyticsDashboard.propTypes = {
  error: PropTypes.shape({
    msg: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
});
export default connect(mapStateToProps, null)(AnalyticsDashboard);
