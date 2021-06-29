const server =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-mvc-backend.herokuapp.com'
    : 'http://localhost:8080';

// eslint-disable-next-line import/prefer-default-export
export { server };
