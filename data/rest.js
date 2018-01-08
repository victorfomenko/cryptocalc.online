import fetch from 'isomorphic-fetch';
import { stringify } from 'qs';

export const get = (path, query, headers) => {
    const queryKeys = Object.keys(query);
    const fullPath = path + (queryKeys.length ? `?${stringify(query)}` : "");
    return request('GET', fullPath, null, headers);
}

export const post = (path, body, headers) => request('POST', path, body, headers);


const request =  (method, path, body, headers) => {
    const fetchParams = {
        headers: { ...headers },
        method
    };
      
    if (body) {
        fetchParams.body = JSON.stringify(body);
    }

    return fetch(path, fetchParams).then((response) => {
        // success
        if (response.ok) {
            if (response.status === 204) {
            return null;
            }
            return response.json().catch(() => null);
        }
        // error
        return response.json().then((badResponseBody) => {
            if (typeof badResponseBody === "object") {
            badResponseBody.response = response;
            }
            throw badResponseBody;
        });
    });  
}

export default { get, post };
