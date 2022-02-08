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

// export const createUser = (user) => {
//     return request({path: '/users/'+id})
// }