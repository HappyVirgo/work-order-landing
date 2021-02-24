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
    serviceProvidersFormControl: {
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0px',
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'baseline',
    },
    serviceProviders: {
        flex: '1',
        marginTop: 'unset !important',
        width: '100%'
    }
}));

export const NoteServiceProvidersDropDown = ({noteserviceproviders}) => {
    const classes = useStyles();
    const noteFunc = useContext(GlobalContext);
    const serviceProviders = noteFunc.handleServiceProvidersSelect;
    const onDeleteChipServiceProvider = noteFunc.handleOnDeleteChipServiceProvider;
    const serviceProvidersVal = noteFunc.serviceProvidersSelectVal;
    const woHasServiceProviders =() => noteserviceproviders && noteserviceproviders.data && noteserviceproviders.data.serviceProviders.length > 0;

    return (
        <>
            <FormControl  variant="outlined" className={classes.serviceProvidersFormControl} style={{width: '100%', display:'flex'}}>
                <FormLabel className={classes.inputLabel}>Select Service Providers:</FormLabel>
                <Select
                    className={classes.serviceProviders}
                    onChange={serviceProviders}
                    disabled={!woHasServiceProviders()}
                    value={woHasServiceProviders() ? serviceProvidersVal : ['']}
                    renderValue={(selected) => woHasServiceProviders() ?`Service Providers Selected ${selected.length}`:'No available service providers'}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                    }}
                    multiple
                >
                    {woHasServiceProviders() && <MenuItem value={1} disabled>Service Providers</MenuItem>}
                    {
                        woHasServiceProviders() ? (noteserviceproviders.data.serviceProviders.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <Checkbox checked={serviceProvidersVal.indexOf(item) > -1} />
                                    <ListItemText primary={item.companyName} />
                                </MenuItem>
                            )
                        })):(<MenuItem value={''} disabled >No available service providers</MenuItem>)
                    }
                </Select>
            </FormControl>
            {serviceProvidersVal.length > 0 && 
                <div className={classes.chips}>
                    {serviceProvidersVal.map((value) => (
                        <Chip 
                            key={value.userId}
                            label={value.companyName}
                            className={classes.chip}
                            onDelete={() => onDeleteChipServiceProvider(value)}
                        />
                    ))}
                </div>
            }
        </>
    );
}