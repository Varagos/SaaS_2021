const analytics =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-analytics.herokuapp.com'
    : 'http://localhost:5005';

const authenticator =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-authenticator.herokuapp.com'
    : 'http://localhost:5000';

const browsing =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-browsing.herokuapp.com'
    : 'http://localhost:5004';

const questionDisplay =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-question-disp.herokuapp.com'
    : 'http://localhost:5003';

const questionCreate =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-question-cr.herokuapp.com'
    : 'http://localhost:5001';

const commentCreate =
  process.env.NODE_ENV === 'production'
    ? 'https://askmeanything37-comment-create.herokuapp.com'
    : 'http://localhost:5002';

export {
  analytics,
  authenticator,
  browsing,
  questionDisplay,
  questionCreate,
  commentCreate,
};
