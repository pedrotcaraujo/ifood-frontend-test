import queryString from 'query-string';

const DEFAULTS = {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
};

function validateStatus(status) {
    return status >= 200 && status < 300;
}

function getParams(params) {
    return params ? queryString.stringify(params) : '';
}

// Fetch API abstraction and improvements
// allows plain object in 'data' option
// allows plain object as query params in 'params' option
export default function localFetch(url, options = {}) {
    const { data, params } = options;

    if (data) {
        options.body = JSON.stringify(data);
    }
    
    return fetch(`${url}?${getParams(params)}`, Object.assign({}, DEFAULTS, options))
        .then(res => {
            if (!validateStatus(res.status)) {
                throw new Error(res.status);
            }

            return res.json();
        })
}
