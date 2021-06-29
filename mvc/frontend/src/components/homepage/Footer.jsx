import Container from 'react-bootstrap/Container';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <section className='text-center py-5 bg-indigo'>
      <Container>
        <Row>
          <Col
            size={3}
            md={3}
            className='mx-auto d-flex justify-content-around px-5 pt-5'
          >
            <AiFillFacebook size={32} className='footer-icon' />
            <AiFillTwitterCircle size={32} className='footer-icon' />
            <AiFillLinkedin size={32} className='footer-icon' />
            <AiFillGithub size={32} className='footer-icon' />
          </Col>
        </Row>
        <hr />
        <p className='text-light'>
          ©{new Date().getFullYear()} Ask<strong>Me</strong>Anything. All Rights
          Reserved.
        </p>
      </Container>
    </section>
  );
}
