import {request} from './client';


export const getUser = (id) => {
    return request({path: '/users/'+id})
}

// export const createUser = (user) => {
//     return request({path: '/users/'+id})
// }