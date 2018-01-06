import fetch from '../../data/fetch'
import { stringify } from 'qs';
const apiHost = process.env.API_HOST || ''; // by default host from request

export const get = async (coinId, headers) => {
    const fullPath = `${apiHost}/api/coins/${coinId}.json`;
    return await fetch('GET', fullPath, null, headers)
}

export default {
  get,
};
