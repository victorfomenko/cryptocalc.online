import { get as restGET } from '../../data/rest'

export const get = async (req, query={}, headers) => {
  const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';
  return await restGET(`${baseUrl}/api/currencies`, query, headers)
}

export default {
  get,
};
