import RestClient from '@iqoption/affiliate-rest-client';
const restClient = new RestClient('/api/coins');

export const get = (req, id, query={}, headers) => {
  const baseUrl = req ? `${req.protocol}://${req.headers.host}` : ''
  restClient.restPath = baseUrl;
  return restClient.get(`${id}.json`, query, headers)
}

export default {
  get,
};
