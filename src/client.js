export const apiUrl = process.env.REACT_APP_API_URL;

export const request = (host, path, options) => {
    host = host || process.env.REACT_APP_API_URL;
    path  = path || "/test";
    const url = host+path;
    return fetch(url, options).then(parseResponse);
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
