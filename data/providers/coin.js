import { get as restGET } from '../../data/rest'

export const get = async (path = '', query={}, headers) => {
    const fullPath = `/api/coins/${path}`;
    return await restGET(fullPath, query,  headers)
}

export default {
  get,
};
