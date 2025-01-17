//Basic imports
import React from 'react';

//Material UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    DetailsImageLayout,
    MainDetails,
    MainActions,
    LinkActions,
    WorkOrderDescription,
    EnhancedDetails,
    BoxedDetails,
    LocationDetails
} from '../../layouts'

//Components
import { 
    TabsComponent,
    //ModalComponent
} from '../../../../components'

export const RenderNotNull = ({
    detailsdata,
    history, 
    attachments, 
    notes, 
    jobtitles, 
    noteserviceproviders, 
    reassignserviceproviders, 
    warranty, 
    serviceProviders}) => {   
    //In null case
    const nullVal = null;    
    //Image Section
    let image
    //Store data to display in new array
    let assetName
    let assetId
    let workOrderId
    let woType
    let manufacturer
    let model
    let serial
    let assetType
    let warrantyLabel
    //Enhanced Section
    let id
    let description
    let status
    let priority
    let tradeType
    let problemType
    let categoryType
    let nte
    let raisedNte
    //Border Section
    let currentEta
    let createdDate
    let serviceProvider
    let assignTo
    let invoiceStatus
    //let invoiceStatusDesc
    //Location Section
    let locationAddress
    let location
    let locationPhone
    //Check PM
    let ifPM
    let proposalStatus
    let proposalId    
    let invoiceId
    //let serviceProviderLast
    let storeNumber

    let isAvailable

    if(detailsdata!==undefined){
        //If is a PM
        if(detailsdata.data.work_order===undefined) {
            isAvailable = true
        } else {

            if(detailsdata.data.work_order.asset!==nullVal) {
                ifPM = false
            } else {
                ifPM = true
            }
            //Image Section
            if(detailsdata.data.work_order.asset!==nullVal) {
                let pre_image = detailsdata.data.work_order.asset.assetImage
                image = pre_image[0]!==undefined?pre_image[0]['fileName']:nullVal;
            }         
            //Short Detail Section
            if(detailsdata.data.work_order.asset!==nullVal){
                let pre_assetName = detailsdata.data.work_order.asset
                assetName = pre_assetName!==nullVal?detailsdata.data.work_order.asset.name:nullVal;
                assetId = pre_assetName!==nullVal?detailsdata.data.work_order.asset.id:nullVal;
            }        
            if(detailsdata.data.work_order!==nullVal){
                workOrderId = detailsdata.data.work_order.id!==nullVal?detailsdata.data.work_order.id:nullVal;
            }          
            woType = detailsdata.data.work_order.asset!==nullVal?detailsdata.data.work_order.woType:nullVal;
            if(detailsdata.data.work_order.asset!==nullVal){
                let pre_manufacturer = detailsdata.data.work_order.asset.manufacturer
                manufacturer = pre_manufacturer!==nullVal?detailsdata.data.work_order.asset.manufacturer.companyName:nullVal;
            }
            model = detailsdata.data.work_order.asset!==nullVal?detailsdata.data.work_order.asset.modelNumber:nullVal;
            serial = detailsdata.data.work_order.asset!==nullVal?detailsdata.data.work_order.asset.serialNumber:nullVal;
            assetType = detailsdata.data.work_order.assetType!==nullVal?detailsdata.data.work_order.assetType.name:nullVal;
            warrantyLabel = detailsdata.data.work_order.asset!==nullVal?detailsdata.data.work_order.warrantyAvailable:nullVal;
            //Enhanced Section
            id = detailsdata.data.work_order.id!==nullVal?detailsdata.data.work_order.id:nullVal;
            description = detailsdata.data.work_order.description!==nullVal?detailsdata.data.work_order.description:nullVal;
            status = detailsdata.data.work_order.workOrderStatus!==nullVal?detailsdata.data.work_order.workOrderStatus:nullVal;
            priority = detailsdata.data.work_order.priority!==nullVal?detailsdata.data.work_order.priority.name:nullVal;
            tradeType = detailsdata.data.work_order.tradeType!==nullVal?detailsdata.data.work_order.tradeType:nullVal;
            problemType = detailsdata.data.work_order.problemType!==nullVal?detailsdata.data.work_order.problemType.name:nullVal;
            categoryType = detailsdata.data.work_order.categoryType!==nullVal?detailsdata.data.work_order.categoryType.name:nullVal;
            nte = detailsdata.data.work_order.nte!==nullVal?detailsdata.data.work_order.nte:nullVal;
            raisedNte = detailsdata.data.work_order.raisedNte!==nullVal?detailsdata.data.work_order.raisedNte:nullVal;
            if(detailsdata.data.work_order.proposal!==nullVal){
                let pre_proposalStatus = detailsdata.data.work_order.proposal.proposalStatus
                proposalStatus = pre_proposalStatus!==nullVal?detailsdata.data.work_order.proposal.proposalStatus.description:nullVal;
                proposalId = detailsdata.data.work_order.proposal.proposalId
            }  
            assignTo = detailsdata.data.work_order.assignTo!==nullVal?detailsdata.data.work_order.assignTo.user:nullVal;   
            //Bordered Section 
            invoiceStatus = detailsdata.data.work_order.invoice.length!==0?detailsdata.data.work_order.invoice.reduce((acc, crr, idx)=> acc+(idx===0?'':', ')+crr.invoiceStatusDesc.description, ''):nullVal;
            invoiceId = detailsdata.data.work_order.invoice.length!==0?detailsdata.data.work_order.invoice[0].invoiceId:nullVal;
            serviceProvider = detailsdata.data.work_order.serviceProviderProfile!==nullVal?detailsdata.data.work_order.serviceProviderProfile.companyName:nullVal;
            // serviceProvider = detailsdata.data.work_order.serviceProviderProfile!==nullVal?detailsdata.data.work_order.serviceProviderProfile.firstName:nullVal;
            // serviceProviderLast = detailsdata.data.work_order.serviceProviderProfile!==nullVal?detailsdata.data.work_order.serviceProviderProfile.lastName:nullVal;
            currentEta = detailsdata.data.work_order.currentEta!==nullVal?detailsdata.data.work_order.currentEta:nullVal;
            createdDate = detailsdata.data.work_order.dateCreated!==nullVal?detailsdata.data.work_order.dateCreated:nullVal;
            //Location Section
            locationAddress = detailsdata.data.work_order.location!==nullVal?detailsdata.data.work_order.location.address1:nullVal;
            location = detailsdata.data.work_order.location!==nullVal?detailsdata.data.work_order.location.name:nullVal;
            locationPhone = detailsdata.data.work_order.location!==nullVal?detailsdata.data.work_order.location.phone1:nullVal;
            storeNumber = detailsdata.data.work_order.location!==nullVal?detailsdata.data.work_order.location.store_number:nullVal;

    }
    return(
        <div>
            {isAvailable&& <div>Something went wrong!</div>}
            {!isAvailable&& <>
            <Grid container spacing={0}>
                <DetailsImageLayout
                    image={image}
                    ifPM={ifPM}
                />
                <MainDetails 
                    workOrderId={workOrderId}
                    assetName={assetName}
                    woType={woType}
                    manufacturer={manufacturer}
                    model={model}
                    serial={serial}
                    assetType={assetType}
                    warrantyLabel={warrantyLabel}
                    warranty={warranty}
                    storeNumber={storeNumber}
                    nullVal={nullVal}
                />
                <MainActions
                    detailsdata={detailsdata}
                    serviceProviders={serviceProviders}
                    jobtitles={jobtitles}
                    noteserviceproviders={noteserviceproviders}
                    reassignserviceproviders={reassignserviceproviders}
                    status={status}
                />
            </Grid>
            <LinkActions
                workOrderId={workOrderId}
                invoiceStatus={invoiceStatus}
                invoiceId={invoiceId}
                proposalStatus={proposalStatus}
                proposalId={proposalId}
                assetId={assetId}
            />
            <Divider/>
            <Grid container spacing={0}>
                <WorkOrderDescription
                    id={id}
                    description={description}
                    nullVal={nullVal}
                />
                <EnhancedDetails 
                    status={status}
                    priority={priority}
                    tradeType={tradeType}
                    problemType={problemType}
                    categoryType={categoryType}
                    woType={woType}
                    nte={nte}
                    raisedNte={raisedNte}
                    nullVal={nullVal}
                />
                <BoxedDetails 
                    proposalId={proposalId}
                    invoiceId={invoiceId}
                    currentEta={currentEta}
                    createdDate={createdDate}
                    serviceProvider={serviceProvider}
                    // serviceProviderLast={serviceProviderLast}
                    proposalStatus={proposalStatus}
                    invoiceStatus={invoiceStatus}
                    assignTo={assignTo}
                    nullVal={nullVal}
                />
                <LocationDetails
                    locationAddress={locationAddress}
                    location={location}
                    locationPhone={locationPhone}
                    nullVal={nullVal}
                />
            </Grid>
            <Divider/>  
            <TabsComponent
                history={history}
                attachments={attachments}
                notes={notes}
            /></>}                      
        </div>            
    )}
}
        