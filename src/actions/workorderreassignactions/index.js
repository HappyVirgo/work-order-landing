/**
 * Description: Actions to reassign a WO
 * Author: Christopher Aguilar
 * Created: 24/2/2020
 * Updated: --/--/---
 * Ticket: EN-468
 */
//Basic imports
import * as types from '../../constants';
import { apiServiceProvidersReassign } from '../../api';

export const receiveServiceProvidersReassignData = (data) => {
    return {type: types.RECEIVE_SERVICE_PROVIDERS_REASSIGN_DATA, data: data};
}

export const fetchServiceProvidersReassignData = async (dtlsID, userId, token) => {
    const serviceProvidersReassignURL = "/sp_ranked?userId="
    const accessFetchToken = (tk) => {
        return tk.data
    }

    let accessToken = await accessFetchToken(token)
    let options = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    }

    return dispatch => {
        return fetch(apiServiceProvidersReassign + dtlsID + serviceProvidersReassignURL + userId, options)
            .then(response => response.json())
            .then(json => dispatch(receiveServiceProvidersReassignData(json)))
            .catch(error => console.log(error));
    }
}

