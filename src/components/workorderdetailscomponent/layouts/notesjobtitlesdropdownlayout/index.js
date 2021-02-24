/**
*Description: Display appropriate Job Titles for a WO Note in a multiselect drop down
*Author: Christopher Aguilar
*Ticket: EN-331
*Created: 26/01/2021
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
import { Select, MenuItem, Checkbox, ListItemText, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #c4c4c4',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0px',
    },
    chip: {
        margin: 2,
    },
    jobTitlesFormControl: {
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0px',
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'baseline',
    },
    jobTitlesSelect: {
        flex: '1',
        marginTop: 'unset !important',
        width: '100%',
    },
    menuListPopOver: {
        '& .MuiPaper-root':{
            maxHeight:'275px !important',
        }
    }
}));

export const NoteJobTitlesDropDown = ({jobtitles}) => {
    const classes = useStyles();
    const noteFunc = useContext(GlobalContext);
    const jobTitlesSelect = noteFunc.handleJobTitlesSelect;
    const onDeleteChipJobTitle = noteFunc.handleOnDeleteChipJobTitle;
    const jobTitlesSelectVal = noteFunc.jobTitlesSelectVal;

    return (
        <>
            <FormControl  variant="outlined" className={classes.jobTitlesFormControl} style={{width: '100%', display:'flex'}}>
                <FormLabel className={classes.inputLabel}>Select Job Titles:</FormLabel>
                <Select
                    className={classes.jobTitlesSelect}
                    onChange={jobTitlesSelect}
                    value={jobTitlesSelectVal}
                    renderValue={(selected) => `Job Titles Selected ${selected.length}`}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                        className: classes.menuListPopOver
                    }}
                    multiple
                >
                    <MenuItem value={1} disabled>Job Titles</MenuItem>
                    {
                        jobtitles ? (jobtitles.data.jobTitles.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <Checkbox checked={jobTitlesSelectVal.indexOf(item) > -1} />
                                    <ListItemText primary={item.jobTitle} />
                                </MenuItem>
                            )
                        })):(<MenuItem value={2} disabled>No available job titles</MenuItem>)
                    }
                </Select>
            </FormControl>
            {jobTitlesSelectVal.length > 0 && 
                <div className={classes.chips}>
                    {jobTitlesSelectVal.map((value) => (
                        <Chip 
                            key={value.jobTitleId}
                            label={value.jobTitle}
                            className={classes.chip}
                            onDelete={() => onDeleteChipJobTitle(value)}
                        />
                    ))}
                </div>
            }
        </>
    );
}