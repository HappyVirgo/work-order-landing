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
import Avatar from '@material-ui/core/Avatar';

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
        margin: '20px 0px',
        flexDirection: 'column',
        alignItems: 'baseline',
    },
    serviceProviders: {
        flex: '1',
        marginTop: 'unset !important',
        width: '100%'
    }
}));

export const ReassignServiceProvidersDropDown = ({defaultServiceProvider, reassignserviceproviders}) => {
    const classes = useStyles();
    const global = useContext(GlobalContext);
    const handleReassignSPSelect = global.handleReassignSPSelect
    const reassignSPSelectVal = global.reassignSPSelectVal;
    
    const woHasServiceProviders =() => reassignserviceproviders && reassignserviceproviders.data && reassignserviceproviders.data.rankedServiceProviders.length > 0;
    const getChip = (serviceProvider)=>
                <>
                    <Chip
                        color="primary"
                        variant="outlined"
                        avatar={<Avatar>{serviceProvider.serviceProviderRank}</Avatar>}
                        size="small"
                        label={serviceProvider.companyName}
                    /> 
                </>
    
    return (
        <>
            <FormControl  variant="outlined" className={classes.serviceProvidersFormControl} style={{width: '100%', display:'flex'}}>
                <FormLabel className={classes.inputLabel}>Select a service provider:</FormLabel>
                <Select
                    className={classes.serviceProviders}
                    onChange={handleReassignSPSelect}
                    disabled={!woHasServiceProviders()}
                    displayEmpty
                    value={woHasServiceProviders() ? reassignSPSelectVal !== '' ? reassignSPSelectVal : defaultServiceProvider : ''}
                    renderValue={(selected) => {
                        if( reassignSPSelectVal == ''){
                            return defaultServiceProvider
                        }
                        return woHasServiceProviders() ? selected.serviceProviderRank + ' - ' + selected.companyName : 'No available service providers'
                    }
                    }
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                    }}
                >
                    {defaultServiceProvider && <MenuItem value={defaultServiceProvider}/>}
                    {woHasServiceProviders() && <MenuItem value={0} disabled>Service Providers</MenuItem>}
                    {
                        woHasServiceProviders() ? (reassignserviceproviders.data.rankedServiceProviders.map((item, index) => {
                            return (
                                
                                !item.isCurrentAssignee &&
                                <MenuItem key={index} value={item}>
                                    <Checkbox checked={reassignSPSelectVal.serviceProviderId === item.serviceProviderId} />
                                    <ListItemText
                                        primary={getChip(item)} 
                                        secondary={`Service Provider Type : ${item.serviceProviderType}`}
                                    />
                                </MenuItem>
                            )
                        })):(<MenuItem value={''} disabled >No available service providers</MenuItem>)
                    }
                </Select>
            </FormControl>
            
        </>
    );
}