import RestClient from '@iqoption/affiliate-rest-client';

const restClient = new RestClient('/api/currencies');

export const get = (req, query = {}, headers) => {
  const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';
  restClient.restPath = baseUrl;
  return restClient.get('', query, headers);
};

export default {
  get,
};
