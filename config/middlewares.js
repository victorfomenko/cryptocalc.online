import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// Спиок мидлвар
const middlewares = [
  thunk,
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
  }),
];

// logger для девелопа
if (process.env.NODE_ENV === 'develop') {
  // eslint-disable-next-line
  const createLogger = require('redux-logger');
  middlewares.push(createLogger({ collapsed: true }));
}

export default middlewares;
