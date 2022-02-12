import {request} from './client';


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
export const getChatID = () => {
    return 0;
}
// export const createUser = (user) => {
//     return request({path: '/users/'+id})
// }

//auth
export const authUserLogin = (email, password) => {
    //tu będzie połączenie z bazą danych autentykacji
    //placeholder
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve({
                username: email,
                password: password
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