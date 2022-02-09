export const apiUrl = process.env.REACT_APP_API_URL;

export const request = ({
    address = process.env.REACT_APP_API_URL,
    path = "/",
    options = {} }) => {
        const {
            headers,
            query = null,
            method = 'GET',
            body, 
            host = address
        } = options;
        assertPath(path);

        const requestConfig = {
            method, 
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            }
        };

        if (body) {
            requestConfig.body = typeof body === 'object' ? JSON.stringify(body): body;
        }

        let queryString = '';
        if (query) {
            queryString = new URLSearchParams(query).toString();
            queryString = queryString && `?${queryString}`;
        }

        return fetch(`${host}${path}${queryString}`, requestConfig)
        .then(res => {
            // if (!res.ok) console.log(res.statusText);
            return parseResponse(res);
        })
        .catch(err => console.log(err))
    // host = host || process.env.REACT_APP_API_URL;
    // path  = path || "/";
    const url = host+path;
    return fetch(url, options)
        .then(parseResponse)
        .catch((err) => {
            return err.message;
        })
}

const parseResponse = (response) => {
    return response.json()
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err.message;
        })
}

function assertPath(path) {
    const type = typeof path;
    if (type !== 'string') {
      throw new TypeError(`The path should be a string, instead received a ${type}`);
    }
  }