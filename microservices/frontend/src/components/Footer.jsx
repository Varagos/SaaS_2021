import Container from 'react-bootstrap/Container';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';

export default function Footer() {
  return (
    <section className='text-center py-5 bg-indigo'>
      <Container>
        <div className='w-25 mx-auto d-flex justify-content-around pt-5'>
          <AiFillFacebook size={32} className='footer-icon' />
          <AiFillTwitterCircle size={32} className='footer-icon' />
          <AiFillLinkedin size={32} className='footer-icon' />
          <AiFillGithub size={32} className='footer-icon' />
        </div>
        <hr />
        <p className='text-light'>
          ©{new Date().getFullYear()} Ask<strong>Me</strong>Anything. All Rights
          Reserved.
        </p>
      </Container>
    </section>
  );
}
