/**
 * Description: Create notes components
 * Author: Carlos Blanco
 * Created: 9/14/2020
 * Ticket: ET-257
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

let newState = {}
const notesWorkOrderReducer = handleActions({
    [types.RECEIVE_NOTES_DATA]: (state, action) => {
        newState.data = action.data;
        return newState;    
    },
    [types.ADD_NOTE]: (state, action) => {
        newState.data = action.data;
        return newState;
    },
    [types.RECEIVE_JOB_TITLES_WO_NOTES_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };
    },
    [types.RECEIVE_SERVICE_PROVIDERS_WO_NOTES_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };
    }    
}, initialState);

export default notesWorkOrderReducer;