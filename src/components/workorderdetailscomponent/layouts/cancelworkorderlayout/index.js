/**
*Description: Component to create a note
*Author: Christopher Aguilar
*Created:26/01/2021
*Update: -
*Notes:-
*/

//Basic imports
import React, {useContext} from 'react';
import { GlobalContext } from "../../../../context/globalcontext";
import {Typography} from "@material-ui/core";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
//Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        minHeight: 200 
    },
    confirmationQuestion:{
        textAlign:"center"
    }
}));
export const CancelWorkOrderComponent = () => {
    const classes = useStyles();
    const global = useContext(GlobalContext);
    const cancelProceeds = global.cancelProceeds;
    const handleCancelNoteInput = global.handleCancelNoteInput;
    const cancelNoteError = global.cancelWONoteDescription === '' ||  global.cancelWONoteDescription.length > 1000;
    return (
        <>
            {
                cancelProceeds ?
                <FormControl required error={cancelNoteError} component="fieldset" style={{width:'100%'}}>
                <FormLabel  autoFocus component="legend">Cancel Note</FormLabel>
                <TextField onChange={handleCancelNoteInput} autoFocus fullWidth={true} multiline={true} variant="outlined" InputProps={{ classes: { input: classes.textField } }}/>
                </FormControl>
                :
                <Typography className={classes.confirmationQuestion} variant="body1">Are you sure you want to Cancel this Work Order?</Typography>
            }
            
        </>
    )
}