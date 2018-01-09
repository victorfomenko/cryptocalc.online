import { get as restGET } from '../../data/rest'

export const get = async (req, path = '', query={}, headers) => {
    const baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';
    return await restGET(`${baseUrl}/api/bitfinex/${path}`, query,  headers)
}

export default {
  get,
};
