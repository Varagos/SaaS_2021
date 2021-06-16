import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import dataRe from '../../img/undraw_Data_re_80ws.svg';
import visualData from '../../img/undraw_visual_data_re_mxxo.svg';

export default function AnalyticsCarousel() {
  return (
    <section className='bg-indigo text-left py-5'>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h2>
              <strong className='text-light'>Live Analytics</strong>
            </h2>
            <p className='text-light pt-3'>
              Obtain statistics of most used keywords, high-traffic periods and
              many more through charts and tables.
            </p>
            <Button
              className='mt-2 mb-4'
              variant='info'
              size='md'
              as={Link}
              to='/analytics'
            >
              Find out more
            </Button>
          </Col>
          <Col sm={12} md={6}>
            <Carousel
              fade
              controls={false}
              indicators
              className='analytics-carousel'
            >
              <Carousel.Item interval={2500}>
                <Image src={dataRe} fluid />
              </Carousel.Item>
              <Carousel.Item interval={2500}>
                <Image src={visualData} fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
