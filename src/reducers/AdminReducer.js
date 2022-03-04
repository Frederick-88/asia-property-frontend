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
    case "SET_LISTINGS_DATA":
      return {
        ...state,
        listingsData: payload,
        isLoadingData: false,
      };

    case "ADD_LISTINGS_DATA":
      triggerNotification("success", "Successfully created a new listing.");

      return {
        ...state,
        listingsData: [...state.listingsData, payload],
        isLoadingData: false,
      };

    case "UPDATE_LISTINGS_DATA":
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

    case "DELETE_LISTINGS_DATA":
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
    case "SET_AGENTS_DATA":
      return {
        ...state,
        agentsData: payload,
        isLoadingData: false,
      };

    case "ADD_AGENTS_DATA":
      triggerNotification("success", "Successfully created a new agent.");

      return {
        ...state,
        agentsData: [...state.agentsData, payload],
        isLoadingData: false,
      };

    case "UPDATE_AGENTS_DATA":
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

    case "DELETE_AGENTS_DATA":
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
    case "SET_USERS_DATA":
      return {
        ...state,
        usersData: payload,
        isLoadingData: false,
      };

    case "ADD_USERS_DATA":
      triggerNotification("success", "Successfully created a new user.");

      return {
        ...state,
        usersData: [...state.usersData, payload],
        isLoadingData: false,
      };

    case "UPDATE_USERS_DATA":
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

    case "DELETE_USERS_DATA":
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

    // ...

    default:
      return state;
  }
};

export default AdminReducer;
