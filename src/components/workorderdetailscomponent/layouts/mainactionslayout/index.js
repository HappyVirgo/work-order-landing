//Basic imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { GlobalContext } from "../../../../context/globalcontext";
import PopupComponent from '../../../popupcomponent';
import {AddNoteComponent} from '../addnotelayout';
import {CancelWorkOrderComponent} from '../cancelworkorderlayout';
import {ReassignWorkOrderComponent} from '../reassignworkorderlayout';
// app status
import { W0_STATUS_CAN_CANCEL } from '../../constants/index';

//Icons
import {
    AddNote,
    NotFixed,
    ReAssigned,
    Cancel
} from '../../../../assets/icons';

const useStyles = makeStyles((theme) => ({
    actionButton:{
        color: "#FFFFFF",
        backgroundColor: '#0072CE',
        fontWeight: 'bold',
        width: '140px',
        maxWidth: '190px',
        height: '32px',
        float: 'right',
        fontSize: '13px',
        margin: '5px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
        },
        '&.$Mui-disabled': {
            backgroundColor:'#EEEEEE'
        }
    },
    actionButtonOutlned:{
        color: "#0072CE",
        border: '2px solid #0072CE',
        fontWeight: 'bold',
        width: '140px',
        maxWidth: '150px',
        // minWidth: '150px',
        height: '32px',
        float: 'right',
        fontSize: '13px',
        margin: '5px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#0072CE',
            color: "#FFFFFF",
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
    MuiDialogTitle: {
        root: {
            color: 'blue'
        }
    },
    textField: {
        minHeight: 200 
    },
    reassignForm: {
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0px',
        alignItems: 'center'
    },
    reassignSelect: {
        flex: '1',
        marginTop: 'unset !important',
    },
    disabled: {
        color: 'grey',
        backgroundColor: '#EEEEEE',
        pointerEvents: 'none'
    },
    '@media screen and (max-width: 1024px)': {
        actionButton:{
            maxWidth: '100%',    
        },

    },     
}));

// const serviceProviders = [
//     "NUCO2 Beer Blast System, call direct@ 800-472-2855 ext. 3028",
//     "General Parts Corporate Dispatch",
//     "Reddi Industries"
// ]

export const MainActions = ({detailsdata, jobtitles, noteserviceproviders, reassignserviceproviders, status}) => {
    const classes = useStyles()
    const global = useContext(GlobalContext)
    
    // ADD NOTES FUNCTIONALLITY
    const createNoteWOData = global.createNoteWOData;
    const noteDescriptionError =  global.noteDescription === '' ||  global.noteDescription.length > 1000;
    const resetNotesForm = global.resetNotesForm;
    const addNoteContent = <AddNoteComponent jobtitles={jobtitles} noteserviceproviders={noteserviceproviders} />;

    // CANCEL WORK ORDER FUNCTIONALLITY
    const cancelWorkOrder = global.cancelWorkOrder;
    const cancelProceeds = global.cancelProceeds;
    const handleCancelProceeds = global.handleCancelProceeds;
    const resetCancelWOForm = global.resetCancelWOForm;
    const cancelWorkOrderContent = <CancelWorkOrderComponent/>;
    const cancelNoteError = global.cancelWONoteDescription === '' ||  global.cancelWONoteDescription.length > 1000;

    // REASSIGN WORK ORDER FUNCTIONALLITY
    const reassignWorkOrder = ()=>console.log('REASSIGNING WORK ORDER')
    const reassignWorkOrderContent = <ReassignWorkOrderComponent detailsdata={detailsdata} reassignserviceproviders={reassignserviceproviders} />;
    const resetReassingWOForm = global.resetReassingWOForm
    const reassignError = global.reassignSPSelectVal == ''

    const updateWOStatus = global.updateWOStatus
    //const reassignedTo = global.handleReassignToSelect
    //const reassignToVal = global.reassignToVal

    return (
        <Grid item xs={12} md={12} lg={4} className="action-button-grid">
            <PopupComponent 
                actionDisabled={false}
                buttonLabel="ADD NOTE"
                modalTitle="Add Note"
                btn1Classes={`${classes.actionButton} action-button`}
                btnClasses={`${classes.actionButton} action-button`}
                btn2Classes={`${classes.actionButtonOutlned} action-button`}
                btnStartIcon={<AddNote/>}
                btn2Label="Cancel"
                onSubmit={createNoteWOData}
                onCancel={resetNotesForm}
                submitDisabled={(noteDescriptionError)}
                btn1Label="Send Note"
                MuiDialogTitle={classes.MuiDialogTitle}
                content={addNoteContent}
            />
            <PopupComponent buttonLabel="Not Fixed" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button ${classes.disabled}`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} onSubmit={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <PopupComponent 
                actionDisabled={true}
                buttonLabel="Reassign"
                modalTitle={'Reassing Work Order'}
                btnClasses={`${classes.actionButton} action-button`} 
                btn2Classes={`${classes.actionButtonOutlned} action-button`} 
                btn1Classes={`${classes.actionButton} action-button`} 
                MuiDialogTitle={classes.MuiDialogTitle} 
                btnStartIcon={<ReAssigned/>} 
                onSubmit={reassignWorkOrder}
                submitDisabled={reassignError}
                onCancel={resetReassingWOForm}
                btn1Label='Reassign'
                btn2Label='Cancel'
                content={reassignWorkOrderContent} />
            {/* <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} onSubmit={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Complete?" /> */}
            <PopupComponent
                actionDisabled={!(W0_STATUS_CAN_CANCEL.includes(status))}
                buttonLabel="Cancel"
                modalTitle={cancelProceeds ? "Work Order Cancellation Note" : "Work Order Cancel Confirmation"}
                btnClasses={`${classes.actionButton} action-button`} 
                btn2Classes={`${classes.actionButtonOutlned} action-button`} 
                btn1Classes={`${classes.actionButton} action-button`} 
                MuiDialogTitle={classes.MuiDialogTitle} 
                btnStartIcon={<Cancel/>} 
                onSubmit={cancelProceeds ? cancelWorkOrder : null}
                submitDisabled={cancelProceeds && cancelNoteError}
                onCancel={resetCancelWOForm}
                preConfirmationSubmit={cancelProceeds ? null : handleCancelProceeds}
                btn1Label='Cancel this Work Order'
                btn2Label='Close'
                content={cancelWorkOrderContent}
            />
        </Grid>
    )
}