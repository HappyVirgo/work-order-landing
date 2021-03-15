/**
 * Description: Display user information
 * Author: Carlos Blanco
 * Created: 11/02/2020
 * Ticket: ET-292
 */
import * as types from '../../constants';
import { apiUsers, apiPermissions } from '../../api/'


export const receiveUserData = (user) => {
    return {type: types.RECEIVE_USER_DATA, userdata: user};
}

export const fetchUsersInformation = () => {
    return dispatch => {
        return fetch(apiUsers)
        .then(response => response.json())
        .then(json => dispatch(receiveUserData(json)))                  
    };    
};

export const receivePermissionData = (data) => {
    return {type: types.RECEIVE_USER_PERMISIONS_DATA, data: data};
}

export const fetchPermissionsByUser = async (userId, token) => {
    const permissionsURL = `user/${userId}/permissions`
    const accessFetchToken = (tk) => {
        return tk.data
    }

    let accessToken = await accessFetchToken(token)
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    };

    return dispatch => {
        return fetch(apiPermissions + permissionsURL, requestOptions)
        .then(response => response.json())
        .then(json => dispatch(receivePermissionData(json)))
        .catch(error => console.log(error))
    };    
};