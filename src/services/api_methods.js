import { request } from './client';
const UUID = require('uuid-js');
const placeholderPromise = (promisedReturnType) => {
    return new Promise((resolve, reject) => {
        if (promisedReturnType === 'number') {
            resolve(1);
        }
        else if (promisedReturnType === 'ID') {
            const id = UUID.create(1);
            resolve(id);
        }
        else if (promisedReturnType === 'randomNumber') {
            resolve(Math.floor(Math.random() * 10000));
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
    )
}

export const getUser = (token) => {
    return request({ 
        path: '/auth/user/',
        token: token,
    })
}

export const createUser = (username, email, password) => {
    return request({
        path: '/models/users/',
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
        path: '/models/users/' + id + '/',
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
    //zwraca token autentykacyjny
    return request({
        path: '/auth/login/',
        options: {
            method: 'POST',
            body: {
                email: email,
                password: password
            }
        } 
    })


    // return new Promise((resolve, reject) => {
    //     const id =
    //         setTimeout(() => {
    //             placeholderPromise('randomNumber').then(val =>
    //                 resolve({
    //                     username: email,
    //                     password: password,
    //                     id: val
    //                 }))
    //         }, 1000)

    // })
};



export const authUserLogout = () => {
    //połączenie z bazą danych i wylogowanie użytkownika
    //placeholder
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, 1000)
    })

};

export const authUserRegister = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('')
        }, 1000)
    })
};

