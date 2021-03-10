//Basic imports
import React, { Component } from 'react';
import { connect } from "react-redux";

//Components
import { 
    CTASectionComponent, 
    DataTableComponent, 
    WorkOrderDetailsComponent,
    Alert, 
} from '../../components'

//Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
//Actions
import { 
    oauthFetchToken,
    fetchUsersInformation,
    fetchCTAsData, 
    fetchSearchData,
    fetchEmergencyWOData, 
    fetchOpenWOData, 
    fetchPendingWOData, 
    fetchDetailsWOData,
    fetchAssignedToMeWOData,
    fetchUnassignedWOData,
    fetchHistoryWOData,
    fetchNotesWOData,
    fetchJobTitlesWOData,
    fetchServiceProvidersWOData,
    fetchServiceProvidersReassignData,
    fetchAttachmentsWOData,
    fetchWarrantyWOData,
    createNoteWOData,
    updateWOStatus,
    cancelWorkOrder
    //fetchServiceProviders,
} from '../../actions';

//Context
import { GlobalContext } from '../../context/globalcontext'


//Declaring global variables
//Token
let token
//User ID
let userId
let userData
let customerId
//CTA component
let ctadata
//Datatable component
let tmpdata
let tmpDataAmount
//Details component
let detailsdata
//Tab component
let historydata
let notesdata
let jobtitlesdata
let noteserviceprovidersdata
let reassignspdata
let attachmentsdata
let dtlsID
let trgtID
//Search
let searchTerm
let searchBy
//Warranty
let warrantydata
//Filter
let filterByAssetType
let filterByStatus
let filterByCategory

let newNote
let newNoteAvailable
let noteDescription
let jobTitlesSelectVal
let noteJobTitlesIds
let serviceProvidersSelectVal
let noteServiceProvidersIds

//cancel Work Order
let cancelWONoteDescription
let cancelProceeds
let workOrderCancelled

//reassign Work Order
let reassignSPSelectVal

let workOrderUpdateResponse
let updatedStatus
let reassignToVal
//let serviceProviders

// snack bar
let snack = {
    severity: 'info',
    open: false,
    message: ''
}

class WorkOrdersBuilder extends Component {
    constructor() {
        super()
        this.state = {
            targetId: "emergencyWO",
            detailsId: "",
            loading: false,
            loadingDetails: false,
            loadingAll: false,
            searchTerm: "", 
            searchBy: 1,
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByCategory: 1,
            newNote: '',
            newNoteAvailable: false,
            noteDescription: '',
            workOrderUpdateResponse: '',
            updatedStatus: '',
            reassignToVal: 1,
            reassignToAvailable: false,
            itsActive: false,
            jobTitlesSelectVal: [],
            noteJobTitlesIds: [],
            serviceProvidersSelectVal: [],
            noteServiceProvidersIds: [],
            cancelWONoteDescription: '',
            cancelProceeds: false,
            workOrderCancelled: false,
            reassignSPSelectVal: ''
        };
    }
    handleChangeStateSearchTerm = (value) => {
        searchTerm = value     
    }
    handleSearchTerm = (event) => {
        let value = event.target.value
        this.setState({
            searchTerm: value,
        }, this.handleChangeStateSearchTerm(value));
    } 
    handleChangeStateSearchBy = (value) => {
        searchBy = value  
    }    
    handleSearchBy = (event) => {
        let value = event.target.value
        this.setState({
            searchBy: value
        }, this.handleChangeStateSearchBy(value));
    }
    handleChangeStateFilterByAssetType = (value) => {
        filterByAssetType = value       
        console.log(filterByAssetType)
    }    
    handleFilterByAssetType = (event) => {
        let value = event.target.value
        this.setState({
            filterByAssetType: value,
        }, this.handleChangeStateFilterByAssetType(value))
    } 
    handleChangeStateFilterByStatus = (value) => {
        filterByStatus = value 
        console.log(filterByStatus)
    }    
    handleFilterByStatus = (event) => {
        let value = event.target.value
        this.setState({
            filterByStatus: value,
        }, this.handleChangeStateFilterByStatus(value))        
    } 
    handleChangeStateFilterByCategory = (value) => {
        filterByCategory = value       
        console.log(filterByCategory)
    }    
    handleFilterByCategory = (event) => {
        let value = event.target.value
        this.setState({
            filterByCategory: value,
        }, this.handleChangeStateFilterByCategory(value))        
    }

    handleChangeStateFilterClearAll = () => {
        filterByCategory = 1;
        filterByStatus = 1;
        filterByAssetType = 1; 
    }

    handleFilterClearAll = (event) => {
        this.setState({
            filterByAssetType: 1,
            filterByStatus: 1,
            filterByCategory: 1,
        }, this.handleChangeStateFilterClearAll()) 
    }

    handleChangeNoteInput = (value) => {
        noteDescription = value;
    }

    handleNoteInput = (event) => {
        let value = event.target.value
        this.setState({
            noteDescription: value
        }, this.handleChangeNoteInput(value))
    }

    handleAddNote = (isAvailable) => {
        newNoteAvailable = isAvailable
    }

    createNoteWOData = (event) => {
        this.setState({
            newNoteAvailable: !newNoteAvailable,
            loadingDetails: true
        }, this.handleAddNote(!newNoteAvailable))
    }

    handleChangeReassignToSelect = (value) => {
        reassignToVal = value
        //console.log('reassignToVal', reassignToVal)
    }
    handleReassignToSelect = (event) => {
        console.log("id", event.target)
        let value = event.target.value
        this.setState({
            reassignToVal: value
        }, this.handleChangeReassignToSelect(value))
    }

    handleChangeJobTitlesSelect = (value, ids) => {
        jobTitlesSelectVal = value
        noteJobTitlesIds = ids
    }

    handleOnDeleteChipJobTitle = (value) => {
        const jobTitles = this.state.jobTitlesSelectVal;
        jobTitles.splice(jobTitles.indexOf(value), 1);
        let noteJobTitlesIds = [];
        jobTitles.forEach(item=>noteJobTitlesIds.push(item.jobTitleId));
        this.setState({
                jobTitlesSelectVal: jobTitles,
                noteJobTitlesIds
            }, this.handleChangeJobTitlesSelect(jobTitles, noteJobTitlesIds)
        );
    }

    handleJobTitlesSelect = (event) => {
        const { value } = event.target;
        const { jobTitles } = jobtitlesdata.data;
        const itemsSelected = [];

        jobTitles.forEach((jobtitle) => {
            if(value.includes(jobtitle)) itemsSelected.push(jobtitle);
        });

        let noteJobTitlesIds = [];
        itemsSelected.forEach(item=>noteJobTitlesIds.push(item.jobTitleId));
        this.setState({
                jobTitlesSelectVal: itemsSelected,
                noteJobTitlesIds
            }, this.handleChangeJobTitlesSelect(itemsSelected, noteJobTitlesIds)
        );
    }

    handleChangeServiceProvidersSelect = (value, ids) => {
        serviceProvidersSelectVal = value
        noteServiceProvidersIds = ids
    }

    handleOnDeleteChipServiceProvider = (value) => {
        const serviceProviders = this.state.serviceProvidersSelectVal;
        serviceProviders.splice(serviceProviders.indexOf(value), 1);
        let noteServiceProvidersIds = [];
        serviceProviders.forEach(item=>noteServiceProvidersIds.push(item.userId));
        this.setState({
                serviceProvidersSelectVal: serviceProviders,
                noteServiceProvidersIds
            }, this.handleChangeServiceProvidersSelect(serviceProviders, noteServiceProvidersIds)
        );
    }

    handleServiceProvidersSelect = (event) => {
        const { value } = event.target;
        const { serviceProviders } = noteserviceprovidersdata.data;
        const itemsSelected = [];

        serviceProviders.forEach((jobtitle) => {
            if(value.includes(jobtitle)) itemsSelected.push(jobtitle);
        });

        let noteServiceProvidersIds = [];
        itemsSelected.forEach(item=>noteServiceProvidersIds.push(item.userId));
        this.setState({
                serviceProvidersSelectVal: itemsSelected,
                noteServiceProvidersIds
            }, this.handleChangeServiceProvidersSelect(itemsSelected, noteServiceProvidersIds)
        );
    }

    resetNotesForm = () => {
        noteServiceProvidersIds = [];
        noteJobTitlesIds = [];
        this.setState({
            jobTitlesSelectVal: [],
            serviceProvidersSelectVal: [],
            noteDescription: ''
        },this.resetNotesFormState);
    }

    resetNotesFormState = () => {
        jobTitlesSelectVal = [];
        serviceProvidersSelectVal = [];
        noteDescription = '';
    }

    handleChangeCancelNoteInput = (value) => {
        cancelWONoteDescription = value;
        console.log(value)
    }

    handleCancelNoteInput = (event) => {
        let value = event.target.value
        this.setState({
            cancelWONoteDescription: value
        }, this.handleChangeCancelNoteInput(value))
    }

    handleChangehCancelProceeds =(value)=>{
        cancelProceeds = value;
    }

    handleCancelProceeds = (value) => {
        this.setState({
            cancelProceeds: value
        },this.handleChangehCancelProceeds(value));
    }

    resetCancelWOForm = () => {
        this.setState({
            cancelWONoteDescription: '',
            cancelProceeds: false,
        },this.resetCancelWOFormState);
    }

    resetCancelWOFormState = () => {
        cancelWONoteDescription = '';
        cancelProceeds = false;
    }

    handleChangeReassignSPSelect = (value) => {
        reassignSPSelectVal = value
    }

    handleReassignSPSelect = (event) => {
        const { value } = event.target;
        const itemsSelected = value;
        this.setState({
                reassignSPSelectVal: itemsSelected
            }, this.handleChangeReassignSPSelect(itemsSelected)
        );
    }

    resetReassingWOForm = () => {
        this.setState({
            reassignSPSelectVal: '',
        },this.resetCancelWOFormState);
    }

    resetReassingWOFormState = () => {
        reassignSPSelectVal = '';
    }

    handleCancelWO = (cancelled) => {
        workOrderCancelled = cancelled
    }

    cancelWorkOrder = (event) => {
        this.setState({
            workOrderCancelled: !workOrderCancelled,
            loadingDetails: true
        }, this.handleCancelWO(!workOrderCancelled))
    }

    handleUpdateStatus = (target) => {
        if(target === "CANCEL"){
            updatedStatus = "CANCELLED"
        } else {
            updatedStatus = target
        }
        console.log("updatedStatus", updatedStatus)
    }
    updateWOStatus = (event) => {
        let target = event.target.parentElement.getAttribute("status")
        if(target !== 'Reassign' && !!target) {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                // loadingDetails: true,
            }, this.handleUpdateStatus(target))
        } else {
            target = target.toUpperCase().replace(' ', '_')
            this.setState({
                updatedStatus: target,
                reassignToAvailable: !this.state.reassignToAvailable,
                // loadingDetails: true,
            }, this.handleUpdateStatus(target))
        }
    }
    handleDynamicDetails = (target) => {
        dtlsID = target 
    }           
    dynamicDetails = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            if(target !== this.state.detailsId) {
                this.setState({
                    detailsId: target,
                    // loadingDetails: true
                }, this.handleDynamicDetails(target))
            }
        }else{
            target = event.target.closest('.datatable-row')
            target = target.id
            if(!!target && target !== this.state.detailsId) {
                this.setState({
                    detailsId: target,
                    // loadingDetails: true
                },  this.handleDynamicDetails(target))
            }
        }
    }
    handleDynamicData = (target) => {
        trgtID = target
    }      
    dynamicData = (event) => {
        event.preventDefault();
        let target = event.target.id
        if(target.length>0){
            this.setState({
                targetId: target,
                // loading: true
            }, this.handleDynamicData(target))
        }else{
            target = event.target.closest('div')
            target = target.id
            this.setState({
                targetId: target,
                //loading: true
            }, this.handleDynamicData(target))
        }
        
    }
    sortWOByCreatedDate = (data) => {
        data.sort((a, b) => b.workOrderId-a.workOrderId);
        data.sort((a, b) => b.dateCreated-a.dateCreated);
    }
    
    async componentDidMount() {
        token = await this.props.oauthFetchToken()
        //Setting user information
        //userData = await this.props.fetchUsersInformation()
        //userId = userData.userdata.user.user_id   
        //Next line it's to test in local     
        userId = "2152"
        this.setState({ 
            firstLoading: true
        })
        ctadata = await this.props.fetchCTAsData()

        tmpdata = await this.props.fetchEmergencyWOData()  
        if(tmpdata.data.work_orders!==undefined) {
            this.sortWOByCreatedDate(tmpdata.data.work_orders);
            dtlsID = !!tmpdata.data.work_orders?(!!tmpdata.data.work_orders[0]?tmpdata.data.work_orders[0]['workOrderId']:''):''
            tmpDataAmount = tmpdata.data.work_orders.length
            this.setState({
                detailsId: dtlsID,
            })
        }      
        historydata = await this.props.fetchHistoryWOData()
        detailsdata = await this.props.fetchDetailsWOData()
        customerId = detailsdata.data.work_order.customerId
        notesdata = await this.props.fetchNotesWOData()
        jobtitlesdata = await this.props.fetchJobTitlesWOData()
        noteserviceprovidersdata = await this.props.fetchServiceProvidersWOData()
        //reassignspdata = await this.props.fetchServiceProvidersReassignData()
        //serviceProviders = await this.props.fetchServiceProviders();
        // this.sortOrderNotesByDate()
        warrantydata = await this.props.fetchWarrantyWOData()
        attachmentsdata = await this.props.fetchAttachmentsWOData()
        this.setState({ firstLoading: false })
        trgtID = trgtID===undefined?this.state.targetId:trgtID
    }

    /**
     * handleId() => loads data changes
     * handleAsyncId() => call async functions since cannot be pass through setState as callback
     * handleChangePrevState() => trigger setState 
     * 
     * Author: Carlos Blanco
     * Date: 11/13/2020
     * Ticket: ET-735
     * */
    handleId = async(id) => {
        dtlsID = id
        detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
        notesdata = await this.props.fetchNotesWOData(dtlsID, token)
        jobtitlesdata = await this.props.fetchJobTitlesWOData(dtlsID, token)
        noteserviceprovidersdata = await this.props.fetchServiceProvidersWOData(dtlsID, token)
        //reassignspdata = await this.props.fetchServiceProvidersReassignData()
        // this.sortOrderNotesByDate()
        attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
        historydata = await this.props.fetchHistoryWOData(dtlsID, token)
        warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)                  
    }

    handleAsyncId = (id) => {
        dtlsID = id
        this.handleId(dtlsID)
    }
    //Change details data
    handleChangePrevState = (id) => {
        dtlsID = id     
        this.setState({
            detailsId: dtlsID,
            loading: true
        }, this.handleAsyncId(id))        
    }
    //move active item to the top of grid
    // array_move = (arr, old_index, new_index) => {
    //     if (new_index >= arr.length) {
    //         let k = new_index - arr.length + 1;
    //         while (k--) {
    //             arr.push(undefined);
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    //     return arr;
    // };
    // isCurrent = (element) => element.workOrderId.toString() === this.state.detailsId.toString();

    async componentDidUpdate(prevProps, prevState) {

        const currentState = this.state.targetId
        //const props = this.props
        const searchTermIn = this.state.searchTerm
        const searchByIn = this.state.searchBy 
        const filterByInByAssetType = this.state.filterByAssetType
        const filterByInByStatus = this.state.filterByStatus
        const filterByInByCategory = this.state.filterByCategory
        if(
            prevState.targetId !== this.state.targetId ||
            prevState.detailsId !== this.state.detailsId ||
            prevState.searchTerm !== this.state.searchTerm ||
            prevState.searchBy !== this.state.searchBy ||
            prevState.filterByAssetType !== this.state.filterByAssetType ||
            prevState.filterByStatus !== this.state.filterByStatus ||
            prevState.filterByCategory !== this.state.filterByCategory ||
            prevState.newNoteAvailable !== this.state.newNoteAvailable ||
            prevState.updatedStatus !== this.state.updatedStatus ||
            prevState.reassignToAvailable !== this.state.reassignToAvailable ||
            prevState.workOrderCancelled !== this.state.workOrderCancelled
        ) {
            this.setState({loading: true})
            //Clean input if lenght is 0
            if(searchTermIn.length===0) {
                this.setState({
                    searchTerm: "",
                })
            }     
            const filterData = ({dataSearchArg, filterByInByAssetTypeArg=[], filterByInByStatusArg=[], filterByInByCategoryArg=[]}) => {
                if(filterByInByAssetTypeArg.length>0) {
                    dataSearchArg = dataSearchArg.filter(term => {
                        let notNull = term['asset']!==null?term['asset']['assetType']['description']:""
                        return notNull.toLowerCase().includes(filterByInByAssetTypeArg.toLowerCase())
                    })
                }
                if(filterByInByStatusArg.length>0) {
                    dataSearchArg = dataSearchArg.filter(term => {
                        let notNull = term['status']!==null?term['status']['description']:""
                        return notNull.toLowerCase().includes(filterByInByStatusArg.toLowerCase())
                    })
                }
                if(filterByInByCategoryArg.length>0) {
                    dataSearchArg = dataSearchArg.filter(term => {
                        let notNull = term['categoryType']!==null?term['categoryType']['categoryTypeName']:""
                        return notNull.toLowerCase().includes(filterByInByCategoryArg.toLowerCase())
                    })                         
                }
                return dataSearchArg;
            }
            let tmp
            let dataSearch
            let dataSearchTemp
            //Set/Search/Filter data for DataTable Component
            /*
            let incomingData = setSearchFilterHelper({
                tmpdata,
                searchTerm,
                searchTermIn,
                searchByIn,
                filterByInByAssetType,
                filterByInByStatus,
                filterByInByCategory,
                currentState,
                props
            })
            incomingData.then(res => {
                console.log(res)
                tmpdata = res
            })
            */
           //Change details data
            const handleChangePrevState = (dtlsID) => {
            const id = dtlsID
            handleId(id)
            }
            const handleId = async(dtlsID) => {
                if(this.state.firstLoading === false) {
                    token = await this.props.oauthFetchToken()
                    detailsdata = await this.props.fetchDetailsWOData(dtlsID, token)
                    notesdata = await this.props.fetchNotesWOData(dtlsID, token)
                    jobtitlesdata = await this.props.fetchJobTitlesWOData(dtlsID, token)
                    noteserviceprovidersdata = await this.props.fetchServiceProvidersWOData(dtlsID, token)
                    //reassignspdata = await this.props.fetchServiceProvidersReassignData()
                    //serviceProviders = await this.props.fetchServiceProviders(dtlsID, token);
                    // this.sortOrderNotesByDate()
                    attachmentsdata = await this.props.fetchAttachmentsWOData(dtlsID, token)
                    historydata = await this.props.fetchHistoryWOData(dtlsID, token)
                    warrantydata = await this.props.fetchWarrantyWOData(dtlsID, token)
                }
                this.setState({loadingDetails: false})
            }
            if(prevState.workOrderCancelled !== this.state.workOrderCancelled) {
                let cancel = await this.props.cancelWorkOrder()
                this.resetCancelWOForm();
                this.setState({loadingDetails: true}, handleChangePrevState(dtlsID))
                this.handleSnack(true, cancel.data !== undefined && !cancel.data.error ? 'Work Order Cancelled' : 'Error: Work Order could not be cancelled', cancel.data !== undefined && !cancel.data.error ? 'success' : 'error');
            }
            if(prevState.detailsId === this.state.detailsId) {

                switch (currentState) {
                    /**
                     * All "term" arrays elements should be modified in order
                     * to work with the new APIs
                     */
                    //Each case should be the CTA id
                    case "emergencyWO":
                        
                        tmp = await this.props.fetchEmergencyWOData()
                        dataSearch = tmp.data?tmp.data.work_orders:[]  
                        if(searchTermIn.length>3) {
                            if(searchByIn<=1) {
                                dataSearch = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                            } else {
                                let tmpl = await this.props.fetchSearchData();
                                dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                                dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                            }           
                        }
                        dataSearch = filterData({
                                                    dataSearchArg: dataSearch, 
                                                    filterByInByAssetTypeArg: filterByInByAssetType, 
                                                    filterByInByStatusArg: filterByInByStatus, 
                                                    filterByInByCategoryArg: filterByInByCategory
                                                });
                        tmpdata = {
                            data: {
                                work_orders: dataSearch
                            }
                        }
                        break; 
                    case "openWO":
                        
                        tmp = await this.props.fetchOpenWOData()
                        dataSearch = tmp.data?tmp.data.work_orders:[]
                        if(searchTermIn.length>3) {
                            if(searchByIn<=1) {
                                dataSearch = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                            } else {
                                let tmpl = await this.props.fetchSearchData();
                                dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                                dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                            }           
                        } 
                        dataSearch = filterData({
                            dataSearchArg: dataSearch, 
                            filterByInByAssetTypeArg: filterByInByAssetType, 
                            filterByInByStatusArg: filterByInByStatus, 
                            filterByInByCategoryArg: filterByInByCategory
                        });
                        tmpdata = {
                            data: {
                                work_orders: dataSearch
                            }
                        }
                        break;
                    case "pendingWO":
                    
                    tmp = await this.props.fetchPendingWOData()
                    dataSearch = tmp.data?tmp.data.work_orders:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({
                        dataSearchArg: dataSearch, 
                        filterByInByAssetTypeArg: filterByInByAssetType, 
                        filterByInByCategoryArg: filterByInByCategory
                    });
                    tmpdata = {
                        data: {
                            work_orders: dataSearch
                        }
                    }
                    break;                   
                    case "assignedWO":
                    
                    tmp = await this.props.fetchAssignedToMeWOData()
                    dataSearch = tmp.data?tmp.data.work_orders:[]  
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }           
                    }
                    dataSearch = filterData({
                        dataSearchArg: dataSearch, 
                        filterByInByAssetTypeArg: filterByInByAssetType, 
                        filterByInByStatusArg: filterByInByStatus, 
                        filterByInByCategoryArg: filterByInByCategory
                    });
                    tmpdata = {
                        data: {
                            work_orders: dataSearch
                        }
                    }
                    break;
                    default:
                    
                    tmp = await this.props.fetchUnassignedWOData()
                    dataSearch = tmp.data?tmp.data.work_orders:[] 
                    if(searchTermIn.length>3) {
                        if(searchByIn<=1) {
                            dataSearch = dataSearch.filter(term => term['workOrderId'].toString().includes(searchTerm))
                        } else {
                            let tmpl = await this.props.fetchSearchData();
                            dataSearchTemp = tmpl.data?tmpl.data.work_orders:[]
                            dataSearch = dataSearch.filter(term => JSON.stringify(dataSearchTemp).includes(JSON.stringify(term)));
                        }
                    } 
                    dataSearch = filterData({
                        dataSearchArg: dataSearch, 
                        filterByInByAssetTypeArg: filterByInByAssetType,  
                        filterByInByCategoryArg: filterByInByCategory
                    });
                    tmpdata = {
                        data: {
                            work_orders: dataSearch
                        }
                    }
                    break;                                                       
                }
            }

            // let currentIndex =  tmpdata.data.work_orders.findIndex(this.isCurrent);
            // if(currentIndex === -1) currentIndex = 0
            // this.array_move(tmpdata.data.work_orders, currentIndex, 0)
            this.sortWOByCreatedDate(tmpdata.data.work_orders) 

            const prevSteDtls = prevState.detailsId
            const currentSteDtls = this.state.detailsId
            const tmpDtls = tmpdata.data!==undefined?
                                (tmpdata.data.work_orders!==null?
                                    (tmpdata.data.work_orders[0]!==undefined?
                                        tmpdata.data.work_orders[0]['workOrderId']:
                                        dtlsID):dtlsID):
                                        dtlsID
            tmpDataAmount = tmpdata.data.work_orders!==undefined?tmpdata.data.work_orders.length:0;
            //Choose if details preview it's based on the first response element or the selected by the user when clicks the row
            if( prevState.newNoteAvailable !== this.state.newNoteAvailable) {
                newNote = await this.props.createNoteWOData()
                const data = newNote.data;
                this.handleSnack(true, !data.error ? 'Note added' : 'Note no added', !data.error ? 'success' : 'error');
                this.resetNotesForm();
                this.setState({
                    newNote: data,
                    loadingDetails: true
                }, handleChangePrevState(dtlsID))
            }
            else if( prevSteDtls !== ''){
                if( prevSteDtls.toString() === currentSteDtls.toString() ) {
                    dtlsID = tmpDtls             
                    this.setState({
                        detailsId: dtlsID,
                    })
                    
                } else {
                    this.setState({
                        detailsId: dtlsID,
                        loadingDetails: true
                    }, handleChangePrevState(dtlsID)) 
                }
            }

            const prevUpdatedStatus = prevState.updatedStatus
            const currentUpdatedStatus = this.state.updatedStatus
            if( prevUpdatedStatus !== currentUpdatedStatus) {
                console.log("USERID", userId)
                workOrderUpdateResponse = await this.props.updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)
                if(workOrderUpdateResponse) {
                    this.setState({
                        //workOrderUpdateResponse: workOrderUpdateResponse,
                        loadingDetails: true
                    }, handleChangePrevState(dtlsID))
                } else {
                    alert("Server Error Occured");
                    this.setState({
                        updatedStatus: ''
                    });
                }
            }

            // console.log("dltsID", this.state.deta)
            //Normalize state to avoid missing data or state changes
            this.setState({
                detailsId: dtlsID,
                loading: false
            })
        }
    }
    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') return;
        snack.open = false;
    }

    handleSnack = (open = true, message, severity) => {
        snack.message = message
        snack.severity = severity
        snack.open = open;
    }

    render() {

        const globalState = {
            dynamicDetails: this.dynamicDetails,
            dynamicData: this.dynamicData,
            handleSearchTerm: this.handleSearchTerm,
            handleSearchBy: this.handleSearchBy,
            handleFilterByAssetType: this.handleFilterByAssetType,
            handleFilterByStatus: this.handleFilterByStatus,
            handleFilterByCategory: this.handleFilterByCategory,
            handleFilterClearAll: this.handleFilterClearAll,
            createNoteWOData: this.createNoteWOData,
            updateWOStatus: this.updateWOStatus,
            handleNoteInput: this.handleNoteInput,
            handleReassignToSelect: this.handleReassignToSelect,
            reassignToVal: this.state.reassignToVal,
            currentDtlsId: this.state.detailsId,
            noteDescription: this.state.noteDescription,
            filterByStateAssetType: this.state.filterByAssetType,
            filterByStateStatus: this.state.filterByStatus,
            filterByStateCategory: this.state.filterByCategory,                        
            searchByState: this.state.searchBy,
            searchTermState: this.state.searchTerm,
            jobTitlesSelectVal: this.state.jobTitlesSelectVal,
            noteJobTitlesIds: this.state.noteJobTitlesIds,
            serviceProvidersSelectVal: this.state.serviceProvidersSelectVal,
            noteServiceProvidersIds: this.state.noteServiceProvidersIds,
            cancelWONoteDescription: this.state.cancelWONoteDescription,
            cancelProceeds: this.state.cancelProceeds,
            reassignSPSelectVal: this.state.reassignSPSelectVal,
            handleJobTitlesSelect: this.handleJobTitlesSelect,
            handleOnDeleteChipJobTitle: this.handleOnDeleteChipJobTitle,
            handleServiceProvidersSelect: this.handleServiceProvidersSelect,
            handleOnDeleteChipServiceProvider: this.handleOnDeleteChipServiceProvider,
            resetNotesForm: this.resetNotesForm,
            handleCancelNoteInput: this.handleCancelNoteInput,
            handleCancelProceeds: this.handleCancelProceeds,
            cancelWorkOrder: this.cancelWorkOrder,
            resetCancelWOForm: this.resetCancelWOForm,
            handleReassignSPSelect: this.handleReassignSPSelect,
            resetReassingWOForm: this.resetReassingWOForm
        }
        return (
            <GlobalContext.Provider value={globalState}>
                <div className="work-orders-container">
                    <Alert severity="warning" variant="filled">
                        <Link href="/admin/WorkOrders" target="_blank" rel="noopener" color="inherit">
                            <i>Missing Something? Go to the Old Version</i>
                        </Link>
                    </Alert>
                    <Snackbar open={snack.open} autoHideDuration={5000} onClose={this.handleSnackClose}>
                        <Alert onClose={this.handleSnackClose} variant="filled" severity={snack.severity}>
                            {snack.message}
                        </Alert>
                    </Snackbar>
                    <Grid className="cta-section-component">
                        <CTASectionComponent 
                            ctadata={ctadata}
                            tmpdata={tmpdata}
                            targetdata={trgtID} 
                        />
                    </Grid>            
                    <Grid container className="content-section">
                        <Grid item xs={12} md={7} lg={7}>
                            <DataTableComponent
                                tmpdata={tmpdata}
                                loading={this.state.loading}
                                firstLoading={this.state.firstLoading}
                            />
                        </Grid>        
                        <Grid item xs={12} md={5} lg={5}>
                            <WorkOrderDetailsComponent
                                tmpDataAmount={tmpDataAmount}
                                loadingDetails={this.state.loadingDetails}
                                detailsdata={detailsdata}
                                history={historydata} 
                                attachments={attachmentsdata} 
                                notes={notesdata}
                                jobtitles={jobtitlesdata}
                                noteserviceproviders={noteserviceprovidersdata}
                                reassignserviceproviders={reassignspdata}
                                //serviceProviders={serviceProviders}
                                firstLoading={this.state.firstLoading}
                                warranty={warrantydata}
                            />
                        </Grid>  
                    </Grid>  
                </div>   
            </GlobalContext.Provider>                   
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    oauthFetchToken: () => dispatch(oauthFetchToken()),
    fetchCTAsData: () => dispatch(fetchCTAsData(token, userId)),   
    fetchSearchData: () => dispatch(fetchSearchData(searchTerm, searchBy, token, userId)),   
    fetchWarrantyWOData: () => dispatch(fetchWarrantyWOData(dtlsID, token)),   
    fetchPendingWOData: () => dispatch(fetchPendingWOData(token, userId)),
    fetchEmergencyWOData: () => dispatch(fetchEmergencyWOData(token, userId)),
    fetchOpenWOData: () => dispatch(fetchOpenWOData(token, userId)),
    fetchUsersInformation: () => dispatch(fetchUsersInformation(token)),
    fetchDetailsWOData: () => dispatch(fetchDetailsWOData(dtlsID, token)),
    updateWOStatus: () => dispatch(updateWOStatus(dtlsID, token, updatedStatus, reassignToVal, userId)),
    //fetchServiceProviders: () => dispatch(fetchServiceProviders(dtlsID, token, userId)),
    fetchAssignedToMeWOData: () => dispatch(fetchAssignedToMeWOData(token, userId)),
    fetchUnassignedWOData: () => dispatch(fetchUnassignedWOData(token, userId)),
    fetchHistoryWOData: () => dispatch(fetchHistoryWOData(dtlsID, token)),
    fetchNotesWOData: () => dispatch(fetchNotesWOData(dtlsID, token)),
    fetchJobTitlesWOData: () => dispatch(fetchJobTitlesWOData(dtlsID, token)),
    fetchServiceProvidersWOData: () => dispatch(fetchServiceProvidersWOData(dtlsID, token)),
    createNoteWOData: () => dispatch(createNoteWOData(noteDescription, dtlsID, token, userId, customerId, noteJobTitlesIds, noteServiceProvidersIds)),
    fetchAttachmentsWOData: ()=> dispatch(fetchAttachmentsWOData(dtlsID, token)),
    cancelWorkOrder: ()=> dispatch(cancelWorkOrder(dtlsID, token, cancelWONoteDescription, userId, customerId)),
    fetchServiceProvidersReassignData: ()=>dispatch(fetchServiceProvidersReassignData(dtlsID, userId, token))
})


const WorkOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(WorkOrdersBuilder)

export default WorkOrdersContainer;