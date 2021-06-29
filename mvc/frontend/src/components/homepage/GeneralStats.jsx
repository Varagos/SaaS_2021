import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import birdImg from '../../img/undraw_quick_chat_re_bit5.svg';

export default function GeneralStats() {
  return (
    <section className='p-5'>
      <Container>
        <Row className='text-center'>
          <Col md={4} className='my-4'>
            <h5>Users</h5>
            <h1>
              1M+ Active
              <br /> Users
            </h1>
          </Col>
          <Col md={4} className='my-4'>
            <h5>Questions</h5>
            <h1>
              100K+ New
              <br />
              Questions/Yr.
            </h1>
          </Col>
          <Col md={4} className='my-4'>
            <h5>Globally Scalable Search</h5>
            <h1>
              1.5T+ Search
              <br /> Operations/Yr.
            </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={5}>
            <Image className='rotated-img' src={birdImg} fluid />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
