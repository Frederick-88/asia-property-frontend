import { toast } from "react-toastify";

const initialState = {
  isLoadingData: false,

  listingsData: [],
  agentsData: [],
  usersData: [],
  inquiriesData: [],
};

const triggerNotification = (notifType, message) => {
  if (notifType === "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000,
    });
  } else {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000,
    });
  }
};

const AdminReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SET_IS_LOADING_DATA":
      return {
        ...state,
        isLoadingData: payload,
      };

    // ------
    // Listings
    // ------
    case "SET_LISTINGS":
      return {
        ...state,
        listingsData: payload,
        isLoadingData: false,
      };

    case "ADD_LISTINGS":
      triggerNotification("success", "Successfully created a new listing.");

      return {
        ...state,
        listingsData: [...state.listingsData, payload],
        isLoadingData: false,
      };

    case "UPDATE_LISTINGS":
      const updatedListingsData = state.listingsData.map((listing) => {
        if (listing._id === payload.id) return payload.newData;
        return listing;
      });
      triggerNotification("success", "Successfully updated listing.");

      return {
        ...state,
        listingsData: updatedListingsData,
        isLoadingData: false,
      };

    case "DELETE_LISTINGS":
      const deletedListingData = state.listingsData.filter((listing) => {
        if (listing._id === payload) return false;
        return true;
      });
      triggerNotification("success", "Successfully deleted listing.");

      return {
        ...state,
        listingsData: deletedListingData,
        isLoadingData: false,
      };

    // ------
    // Agents
    // ------
    case "SET_AGENTS":
      return {
        ...state,
        agentsData: payload,
        isLoadingData: false,
      };

    case "ADD_AGENTS":
      triggerNotification("success", "Successfully created a new agent.");

      return {
        ...state,
        agentsData: [...state.agentsData, payload],
        isLoadingData: false,
      };

    case "UPDATE_AGENTS":
      const updatedAgentsData = state.agentsData.map((agent) => {
        if (agent._id === payload.id) return payload.newData;
        return agent;
      });
      triggerNotification("success", "Successfully updated agent.");

      return {
        ...state,
        agentsData: updatedAgentsData,
        isLoadingData: false,
      };

    case "DELETE_AGENTS":
      const deletedAgentData = state.agentsData.filter((agent) => {
        if (agent._id === payload) return false;
        return true;
      });
      triggerNotification("success", "Successfully deleted agent.");

      return {
        ...state,
        agentsData: deletedAgentData,
        isLoadingData: false,
      };

    // -----
    // Users
    // -----
    case "SET_USERS":
      return {
        ...state,
        usersData: payload,
        isLoadingData: false,
      };

    case "ADD_USERS":
      triggerNotification("success", "Successfully created a new user.");

      return {
        ...state,
        usersData: [...state.usersData, payload],
        isLoadingData: false,
      };

    case "UPDATE_USERS":
      const updatedUsersData = state.usersData.map((user) => {
        if (user._id === payload.id) return payload.newData;
        return user;
      });
      triggerNotification("success", "Successfully updated user.");

      return {
        ...state,
        usersData: updatedUsersData,
        isLoadingData: false,
      };

    case "DELETE_USERS":
      const deletedUserData = state.usersData.filter((user) => {
        if (user._id === payload) return false;
        return true;
      });
      triggerNotification("success", "Successfully deleted user.");

      return {
        ...state,
        usersData: deletedUserData,
        isLoadingData: false,
      };

    // ---------
    // Inquiries
    // ---------

    case "SET_INQUIRIES":
      return {
        ...state,
        inquiriesData: payload,
        isLoadingData: false,
      };

    default:
      return state;
  }
};

export default AdminReducer;
