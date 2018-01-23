import 'isomorphic-fetch';

import RestClient from '@iqoption/affiliate-rest-client';
const restClient = new RestClient('currencies', {}, process.env.REST_URL);

export const get = (req, query={}, headers) => {
  return restClient.get('', query, headers)
}

export default {
  get,
};
