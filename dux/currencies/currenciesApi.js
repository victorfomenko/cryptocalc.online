import request from '../../data/fetch'
import { stringify } from 'qs';

const getCurrencies = async (query, headers) => {
    const queryKeys = Object.keys(query);
    const fullPath = 'https://fininfo.iqoption.com/api/currencies' + (queryKeys.length ? `?${stringify(query)}` : "");
    return await request('GET', fullPath, null, headers)
}

export default {
  getCurrencies,
};
