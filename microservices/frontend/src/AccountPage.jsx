import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import accountPage from './img/undraw_Account_re_o7id.svg';
import questionImg from './img/undraw_Faq_re_31cw.svg';
import answerImg from './img/undraw_online_test_gba7.svg';

const AccountPage = () => (
  <>
    <Container fluid='sm' className='bg-light mt-5 p-3 rounded'>
      <div className='mx-auto block w-25 d-flex justify-content-center'>
        <Image src={accountPage} thumbnail fluid />
      </div>
      <div className='d-flex justify-content-around py-3 mb-4'>
        <div className='text-center'>
          <h4 className='font-weight-light'>Questions</h4>
          <br />
          <h5 className='font-weight-bold'>5</h5>
        </div>
        <div className='text-center'>
          <h4 className='font-weight-light'>Answers</h4>
          <br />
          <h5 className='font-weight-bold'>13</h5>
        </div>
      </div>

      <Row>
        <Col md={5} className='py-4 mb-5 mx-5'>
          <Card>
            <Image src={questionImg} className='card-img-top' alt='' fluid />
            {/* <Card.Img variant='top' src={questionImg} /> */}
            <Card.Body>
              <Card.Title>My questions</Card.Title>
              <Card.Text>
                Judge a man by his questions rather than his answers.
                <br />
                <p className='font-weight-light font-italic'>- Voltaire</p>
              </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
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
                You can tell whether a man is clever by his answers. You can
                tell whether a man is wise by his questions.
                <br />
                <p className='font-weight-light font-italic'>
                  - Naguib Mahfouz
                </p>
              </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link href='#'>Card Link</Card.Link>
              <Card.Link href='#'>Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className='bg-light'>Hello welcome back</div>
      <Image src={accountPage} className='w-25' fluid />
    </Container>
  </>
);

export default AccountPage;
