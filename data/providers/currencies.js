import { get as restGET } from '../../data/rest'

export const get = async (query, headers) => {
    return await restGET('/api/currencies', query, headers)
}

export default {
  get,
};
