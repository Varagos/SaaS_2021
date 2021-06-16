import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import discussionImg from '../../img/undraw_online_discussion_5wgl.svg';

export default function Showcase() {
  return (
    <section className='bg-light p-5 text-center text-sm-left'>
      <Container>
        <div className='d-sm-flex align-items-center justify-content-between'>
          <div>
            <h1>Welcome to AskMeAnything</h1>
            <p className='my-4'>
              Share your questions with our community and find answers to common
              inquiries.{' '}
            </p>
            <Row>
              <Col sm={10} md={6} lg={5}>
                <Button
                  className='mt-2'
                  variant='info'
                  size='lg'
                  as={Link}
                  to='/create'
                  block
                >
                  Ask question
                </Button>
              </Col>
              <Col sm={10} md={6} lg={5}>
                <Button
                  className='mt-2'
                  variant='outline-info'
                  size='lg'
                  as={Link}
                  to='/posts/page/1'
                  block
                >
                  Browse questions
                </Button>
              </Col>
            </Row>
          </div>
          <Image
            className='w-50 d-none d-md-block'
            src={discussionImg}
            alt=''
            fluid
          />
        </div>
      </Container>
    </section>
  );
}
