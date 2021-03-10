//User information
//To test in local
//export const apiUsers = "http://localhost:8180/admin/Users/getCurrentUser"

//Production URL
export const apiUsers = "/admin/Users/getCurrentUser"

//Enviroment Variables
const PROD = "https://api.ecotrak.com/v1/workorders/user/"
const _PROD = "https://api.ecotrak.com/v1/workorders/"

const STAGE = "https://api.ecotrak.com/stagev1/workorders/user/"
const _STAGE = "https://api.ecotrak.com/stagev1/workorders/"


//CTA Data
export const apiCTA = STAGE

//Emercency WorkOrders
export const apiEmergencyWO = STAGE

//Opened WorkOrders
export const apiOpenWO = STAGE

//Pending WorkOrders
export const apiPendingWO = STAGE

//Details WorkOrders
export const apiDetailsWO = _STAGE

//Assigned To Me WorkOrders
export const apiAssignedToMeWO = STAGE

//Unassigned WorkOrders
export const apiUnassignedWO = STAGE

//History WorkOrders
export const apiHistoryWO = _STAGE

//History WorkOrders
export const apiNotesWO = _STAGE

//Attachments WorkOrders
export const apiAttachmentsWO = _STAGE

//Search
export const apiSearch = STAGE

//Warranty
export const apiWarranty = _STAGE

//JobTitle WorkOrders
export const apiJobTitlesWO = _STAGE

//ServiceProviders WorkOrders
export const apiServiceProvidersWO = _STAGE

//Cancel WorkOrders
export const apiCancelWO = _STAGE

//Reassign WorkOrders
export const apiServiceProvidersReassign = _STAGE
