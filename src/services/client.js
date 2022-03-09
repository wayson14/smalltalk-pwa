export const apiUrl = process.env.REACT_APP_API_URL;
export const chatApiUrl = process.env.REACT_APP_CHATAPI_URL;
export const request = ({
    token = '',
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

        if (token) {

        }
        const requestConfig = {
            
            method, 
            credentials: 'include', //wystarczyło dopisać jedną linię CORS SPRAWKA
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            }
        };

        if (body) {
            requestConfig.body = typeof body === 'object' ? JSON.stringify(body): body;
        }

        if (token) {
            requestConfig.headers.Authorization = 'Token '+token;
        }
        let queryString = '';
        if (query) {
            queryString = new URLSearchParams(query).toString();
            queryString = queryString && `?${queryString}`;
        }

        return fetch(`${host}${path}${queryString}`, requestConfig)
        .then(res => {
            if (!res.ok) return null
            return parseResponse(res);
        })
        
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

export const handleErrorResponse = (res, message) => {
    return new Promise ((resolve, reject) => {
        console.log(res)
        if (res === null) {
            reject(message)
        }
        else if (res.type === 'error') {
            reject(res.message)
        }
        else{
            resolve(res)
        }
    })
}