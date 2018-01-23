import 'isomorphic-fetch';

import RestClient from '@iqoption/affiliate-rest-client';
const restClient = new RestClient('bitfinex', {}, process.env.REST_URL);


export const get = (id, query={}, headers) => {
  return restClient.get(id, query, headers)
}

export default {
  get,
};
