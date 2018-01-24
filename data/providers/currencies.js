import RestClient from '@iqoption/affiliate-rest-client';
const restClient = new RestClient('currencies', {}, process.env.REST);

export const get = (query={}, headers) => {
  return restClient.get('', query, headers)
}

export default {
  get,
};
