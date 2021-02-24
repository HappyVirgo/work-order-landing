/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */
//Basic imports
import * as types from '../../constants';
import { apiCancelWO } from '../../api';

export const cancelWorkOrderData = (data) => {
    return {type: types.CANCEL_WORK_ORDER, data: data};
}

export const cancelWorkOrder = async (dtlsID, token, note, userId, customerId) => {
    const cancelWOURL = "/cancel"
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
        note
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
        return fetch(apiCancelWO+idDtls+cancelWOURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(cancelWorkOrderData(json)))
            .catch(error => console.log(error))
    }
}
