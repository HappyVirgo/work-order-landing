/**
 * Description: WO, Action - Reassign WO in Pending SP Acceptance to an Internal SP
 * Author: Christopher Aguilar
 * Created: 10/13/2021
 * Ticket: EN-455
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

const reassignWorkOrderReducer = handleActions({
    [types.RECEIVE_USER_PERMISIONS_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    },    
}, initialState);

export default reassignWorkOrderReducer;