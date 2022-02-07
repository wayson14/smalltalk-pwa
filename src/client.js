export const apiUrl = process.env.REACT_APP_API_URL;

export const request = ({host = process.env.REACT_APP_API_URL,
     path = "/",
     options = null}) => {
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