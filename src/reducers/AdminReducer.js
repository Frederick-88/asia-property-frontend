// import { toast } from "react-toastify";

const initialState = {
  isInitialLoad: false,

  listingsData: [],
  agentsData: [],
  usersData: [],
  inquiriesData: [],
};

// const triggerNotification = (notifType, message, isMultiple) => {
//   if (notifType === "error") {
//     toast.error(message, {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: isMultiple ? 10000 : 5000,
//     });
//   } else {
//     toast.success(message, {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: isMultiple ? 10000 : 5000,
//     });
//   }
// };

const AdminReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    // case "SET_ADMIN_SITE_PERSON_ROLE":
    //   return {
    //     ...state,
    //     adminSitePersonRole: payload,
    //   };

    default:
      return state;
  }
};

export default AdminReducer;
