import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getAccountPage as getAccountPageAction } from './actions/analyticsActions';
import accountPage from './img/undraw_Account_re_o7id.svg';
import questionImg from './img/undraw_Faq_re_31cw.svg';
import answerImg from './img/undraw_online_test_gba7.svg';
import DiagramLoader from './components/DiagramLoader';
import AccountListItem from './components/accountPage/AccountListItem';

dayjs.extend(localizedFormat);

const AccountPage = ({ profileInfo, profileLoading, getAccountPage }) => {
  useEffect(() => {
    getAccountPage();
  }, []);
  return (
    <>
      {profileLoading ? (
        <DiagramLoader />
      ) : (
        <Container fluid='sm' className='bg-light mt-5 p-3 rounded'>
          <div className='mx-auto block w-25 d-flex justify-content-center'>
            <Image src={accountPage} thumbnail fluid />
          </div>
          <div className='d-flex justify-content-around py-3 mb-4'>
            <div className='text-center'>
              <h4 className='font-weight-light'>Questions</h4>
              <br />
              <h5 className='font-weight-bold'>
                {profileInfo.questions.length}
              </h5>
            </div>
            <div className='text-center'>
              <h4 className='font-weight-light'>Answers</h4>
              <br />
              <h5 className='font-weight-bold'>
                {profileInfo.comments.length}
              </h5>
            </div>
          </div>

          <Row>
            <Col md={5} className='py-4 mb-5 mx-5'>
              <Card>
                <Image
                  src={questionImg}
                  className='card-img-top'
                  alt=''
                  fluid
                />
                {/* <Card.Img variant='top' src={questionImg} /> */}
                <Card.Body>
                  <Card.Title>My questions</Card.Title>
                  <Card.Text>
                    <br />
                  </Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  {profileInfo.questions.map(
                    ({ question_id: questionId, title, date }) => (
                      <AccountListItem
                        key={questionId}
                        text={title}
                        date={date}
                        id={questionId}
                      />
                    )
                  )}
                </ListGroup>
              </Card>
            </Col>
            <Col md={5} className='py-4 ml-md-auto mx-5'>
              <Card>
                <Image
                  src={answerImg}
                  className='card-img-top py-4 by-2'
                  alt=''
                  fluid
                />
                {/* <Card.Img variant='top' src={answerImg} /> */}
                <Card.Body>
                  <Card.Title>My answers</Card.Title>
                  <Card.Text>
                    <br />
                  </Card.Text>
                </Card.Body>
                <ListGroup className='list-group-flush'>
                  {profileInfo.comments.map(
                    ({ comment_id: commentId, text, date, question }) => (
                      <AccountListItem
                        key={commentId}
                        text={text}
                        date={date}
                        id={question.question_id}
                      />
                    )
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

AccountPage.propTypes = {
  profileInfo: PropTypes.shape({
    user_id: PropTypes.number,
    email: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({ question_id: PropTypes.number })
    ),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment_id: PropTypes.number,
        text: PropTypes.string,
        date: PropTypes.string,
        question: PropTypes.shape({
          question_id: PropTypes.number,
          title: PropTypes.string,
          text: PropTypes.string,
          date: PropTypes.string,
        }),
      })
    ),
  }),
  getAccountPage: PropTypes.func.isRequired,
  profileLoading: PropTypes.bool.isRequired,
};
AccountPage.defaultProps = {
  profileInfo: { questions: [], comments: [] },
};

const mapStateToProps = (state) => ({
  profileInfo: state.analytics.profileInfo,
  profileLoading: state.analytics.profileLoading,
});

export default connect(mapStateToProps, {
  getAccountPage: getAccountPageAction,
})(AccountPage);
