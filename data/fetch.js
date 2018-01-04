import fetch from 'isomorphic-unfetch';

export default (method, path, body, headers) => {
    const fetchParams = {
        headers: { ...headers },
        method
    };
      
    if (body) {
        fetchParams.body = JSON.stringify(body);
    }

    return fetch(path, fetchParams).then((response: Response) => {
        // success
        if (response.ok) {
            if (response.status === 204) {
            return null;
            }
            return response.json().catch(() => null);
        }
        // error
        return response.json().then((badResponseBody: any) => {
            if (typeof badResponseBody === "object") {
            badResponseBody.response = response;
            }
            throw badResponseBody;
        });
    });  
}
