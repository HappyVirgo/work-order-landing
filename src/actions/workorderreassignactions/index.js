/**
 * Description: Actions to reassign a WO
 * Author: Christopher Aguilar
 * Created: 24/2/2020
 * Updated: --/--/---
 * Ticket: EN-468
 */
//Basic imports
import * as types from '../../constants';
import { apiServiceProvidersReassign, apiReassignWO } from '../../api';

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

export const reassignWorkOrderData = (data) => {
    return {type: types.REASSIGN_WORK_ORDER_DATA, data: data};
}

export const reassignWorkOrder = async (dtlsID, token, userId, customerId, serviceProviderId) => {
    const reassignWOURL = "/reassignRequest"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    
    const accessDtlId = (id) => {
        return id
    }
    let accessToken = await accessFetchToken(token);
    let idDtls = await accessDtlId(dtlsID);

    const data = {
        userId,
        customerId,
        serviceProviderId
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    return dispatch => {
        return fetch(apiReassignWO+idDtls+reassignWOURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(reassignWorkOrderData(json)))
            .catch(error => console.log(error))
    }
}
