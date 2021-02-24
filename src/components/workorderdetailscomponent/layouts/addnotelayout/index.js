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

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

//Layouts
import { NoteJobTitlesDropDown } from "../notesjobtitlesdropdownlayout";
import { NoteServiceProvidersDropDown } from "../notesserviceproviderdropdownlayout";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: {
        minHeight: 200 
    },
}));
export const AddNoteComponent = ({jobtitles, noteserviceproviders}) => {
    const classes = useStyles();
    const noteFunc = useContext(GlobalContext);
    const chageInputNote = noteFunc.handleNoteInput;
    const maxNoteDescription = 1000;
    let noteDescription = noteFunc.noteDescription;
    const noteDescriptionError = noteDescription === '' || noteDescription.length > maxNoteDescription;

    return (
        <>
            <NoteServiceProvidersDropDown noteserviceproviders={noteserviceproviders}/>
            <NoteJobTitlesDropDown jobtitles={jobtitles}/>
            <FormControl required error={noteDescriptionError} component="fieldset" style={{width:'100%'}}>
                <FormLabel className={classes.inputLabel} autoFocus component="legend">Note({maxNoteDescription} characters max)</FormLabel>
                <TextField onChange={chageInputNote} autoFocus fullWidth={true} multiline={true} variant="outlined" InputProps={{ classes: { input: classes.textField } }}/>
            </FormControl>
            <FormControl required>
            </FormControl>
        </>
    )
}