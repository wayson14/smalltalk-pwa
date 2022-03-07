import { request, apiUrl, chatApiUrl } from './client';
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

//sprawdzanie, czy sesja jest git
export const checkSession = () => {
    return request({
        path: '/check_session',
        address: chatApiUrl
    })
}
export const getUser = (token) => {
    return request({ 
        path: '/auth/user/',
        token: token,
    })
}
export const parseUserObject = (user, token) => {
    if (user === '' & null & undefined){
        console.log('user is null')
        return ''
    }
    else return {
        id: user.pk,
        username: user.username,
        email: user.email,
        token: token,
        roomID: user?.room_id,
        // first_name: user.first_name,
        // last_name: user.last_name
      }
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
export const getRoomID = () => {
    return request({
        path: '/get_room_id/',
        address: chatApiUrl 
    })
}

export const getRoomMessages = () => {
    return request({
        path: '/get_room_messages/',
        address: chatApiUrl 
    })
}

export const joinWaitingroom = () => {
    return request({
        path: '/join_waitingroom/',
        address: chatApiUrl 
    })
}

export const leaveWaitingroom = () => {
    return request({
        path: '/leave_waitingroom/',
        address: chatApiUrl 
    })
}

export const closeSession = () => {
    return request({
        path: '/close_session/',
        address: chatApiUrl 
    })
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
                password: password,
                // csrfmiddlewaretoken: 'kw5wMHQxHJKAdZWArdYQn1e6oexuEL9vEdVaV5UugD068o1Za7h0qRX8y2WPtXEg' 
            }
        } 
    })
};



export const authUserLogout = () => {
    //połączenie z bazą danych i wylogowanie użytkownika
    //placeholder
    return request({
        address: '/auth/logout/'
    })
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('')
    //     }, 1000)
    // })

};

export const authUserRegister = (email, password, username, socialContact) => {
    return request({
        path: '/auth/register/',
        options: {
            method: 'POST',
            body: {
                email: email,
                password1: password,
                password2: password,
                social_contact: socialContact,
                username: username
            }
        } 
    })
};

// circles
export const joinCircle = (code) => {
    return request({
        path: `/join_circle/${code}`,
        address: chatApiUrl
    })
    // return request({

    // })
}

export const getUserCirclesIDs = () => {
    return request({ 
        path: '/get_user_circles_ids/',
        address: chatApiUrl 
    })
}

export const getCircle = (id) => {
    return request({ 
        path: '/models/circles/'+id+'/',
    })
}
export const leaveCircle = (id) => {
    return request({ 
        path: '/leave_circle/'+id+'/',
        address: chatApiUrl 
    })
}
