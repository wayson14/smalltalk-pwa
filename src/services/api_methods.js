import {request} from './client';
const UUID = require('uuid-js');
const placeholderPromise = (promisedReturnType) => {
    return new Promise ((resolve, reject) => {
        if (promisedReturnType === 'number') {
            resolve(1);
        }
        if (promisedReturnType === 'ID') {
            const id = UUID.create(1);
            resolve(id);
        }
        else if (promisedReturnType === 'string') {
            resolve('hello');
        }
        else if (promisedReturnType === 'object') {
            resolve({
                color: 'white',
                size: 'large'
            });
        }
        else if (promisedReturnType === 'array') {
            resolve(['white', 'black', 'purple'])
        }
        else if (promisedReturnType === 'true') {
            resolve(true);
        }
        else if (promisedReturnType === 'false') {
            resolve(false);
        }
        else if (promisedReturnType === 'error') {
            reject('some error');
        }
    }
    )}

export const getUser = (id) => {
    return request({path: '/users/'+id+'/'})
}

export const createUser = (username, email, password) => {
    return request({
        path: '/users/',
        options: {
            method: 'POST',
            body: {
                username: username,
                email: email,
                password: password
            }
        }
    })
}

export const deleteUser = (id) => {
    return request({
        path: '/users/'+id+'/',
        options: {
            method: 'DELETE',
        }
    })
}
// chat
export const getRoomID = (userID) => {
    return placeholderPromise('number');
}
// export const createUser = (user) => {
//     return request({path: '/users/'+id})
// }

export const authRoom = () => {
    //there goes handling
    return true;
}

//auth
export const authUserLogin = (email, password) => {
    //tu będzie połączenie z bazą danych autentykacji
    //placeholder
    return new Promise ((resolve, reject) => {
        const id = placeholderPromise('ID')
        setTimeout(() => {
            resolve({
                username: email,
                password: password,
                id: id
            })
        }, 1000)

    })
};

export const authUserLogout = () => {
    //połączenie z bazą danych i wylogowanie użytkownika
    //placeholder
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, 1000)
    })

};

export const authUserRegister = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, 1000)
    })
};