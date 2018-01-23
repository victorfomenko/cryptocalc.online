import RestClient from '@iqoption/affiliate-rest-client';
const restClient = new RestClient('coins', {}, process.env.REST);

export const get = (id, query={}, headers) => {
  return restClient.get(`${id}.json`, query, headers)
}

export default {
  get,
};
