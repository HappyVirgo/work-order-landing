/**
*Description: Component to reassign a work order
*Author: Christopher Aguilar
*Created:18/02/2021
*Update: -
*Notes:-
*/

//Basic imports
import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
//Layouts
import { ReassignServiceProvidersDropDown } from "../reassignserviceproviderdropdownlayout";

export const ReassignWorkOrderComponent = ({detailsdata, reassignserviceproviders}) => {
	let currentSP
	reassignserviceproviders.data.rankedServiceProviders.some((element) => {
		if(element.isCurrentAssignee){
		currentSP = element;
		}
	})
	const defaultServiceProvider = 
        <>
            <>{currentSP.serviceProviderRank} - {currentSP.companyName}  </>
            <Chip
                color="secondary"
                variant="outlined"
                size="small"
                label="current"
                deleteIcon={<DoneIcon />}
                onDelete={()=>{}}
            />
        </>

    return (
        <ReassignServiceProvidersDropDown  defaultServiceProvider={defaultServiceProvider} reassignserviceproviders={reassignserviceproviders}/>
    )
}