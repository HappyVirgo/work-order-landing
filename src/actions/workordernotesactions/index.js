/**
 * Description: Create notes component
 * Author: Carlos Blanco
 * Created: 9/14/2020
 * Ticket: ET-257
 */
//Basic imports
import * as types from '../../constants';
import { apiNotesWO, apiJobTitlesWO, apiServiceProvidersWO } from '../../api/';

export const receiveNotesWOData = (data) => {
    return { type: types.RECEIVE_NOTES_DATA, data: data };
}

export const addNoteWOData = (data) => {
    return { type: types.ADD_NOTE, data: data }
}

export const fetchNotesWOData = async(dtlsID, token) => {
    const notesURL = "/note/aggregate"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessDtlId = (id) => {
        return id
    }
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let init = {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    }
    return dispatch => {
        return fetch(apiNotesWO + idDtls + notesURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }
}

export const createNoteWOData = async(description, dtlsID, token, userId, customerId, jobTitleIds, serviceProviderIds) => {
    const addNoteURL = "/note/direct"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessDtlId = (id) => {
        return id
    }
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let data = {
        userId,
        customerId,
        description,
        jobTitleIds,
        serviceProviderIds
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
        return fetch(apiNotesWO + idDtls + addNoteURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)))
            .catch(error => console.log(error));
    }
}

export const receiveJobtitlesWOData = (data) => {
    return {type: types.RECEIVE_JOB_TITLES_WO_NOTES_DATA, data: data};
}

export const fetchJobTitlesWOData = async (dtlsID, token) => {
    const noteJobTitlesURL = "/note/jobtitles"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    
    const accessDtlId = (id) => {
        return id
    }

    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    }

    return dispatch => {
        return fetch(apiJobTitlesWO+idDtls+noteJobTitlesURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveJobtitlesWOData(json)))
            .catch(error=>console.log(error));
    }
}

export const receiveServiceProvidersWOData = (data) => {
    return {type: types.RECEIVE_SERVICE_PROVIDERS_WO_NOTES_DATA, data: data};
}

export const fetchServiceProvidersWOData = async (dtlsID, token) => {
    const noteServiceProvidersURL = "/note/serviceproviders"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    
    const accessDtlId = (id) => {
        return id
    }

    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    }

    return dispatch => {
        return fetch(apiServiceProvidersWO+idDtls+noteServiceProvidersURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveServiceProvidersWOData(json)))
            .catch(error => console.log(error));
    }
}

