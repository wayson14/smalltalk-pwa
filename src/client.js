export const request = (host, path, options) => {
    const address = process.env.REACT_APP_API_URL;
    const location = "/test"
    const url = address+location;
    console.log(url);
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