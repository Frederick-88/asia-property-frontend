import axios from "axios";
import { toast } from "react-toastify";

const apiURL = process.env.REACT_APP_API_URL;

const showErrorNotification = () => {
  toast.error(
    "We're having some issues at the moment, can revisit again later =)",
    {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000,
    }
  );
};

// --------
// Listings
// --------
export const getListings = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "GET",
        url: `${apiURL}/real-estate/get`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_LISTINGS",
        payload: response.results,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const createListing = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "POST",
        url: `${apiURL}/real-estate/create`,
        headers: { "access-token": data.token },
        data: data.listingData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "ADD_LISTINGS",
        payload: response.results,
      });
      // reset inquiries since if listings data are updated, inquiries should receive the updates too
      dispatch({
        type: "SET_INQUIRIES",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const updateListing = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "PUT",
        url: `${apiURL}/real-estate/update?id=${data.listingId}`,
        headers: { "access-token": data.token },
        data: data.listingData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_LISTINGS",
        payload: {
          id: response.results._id,
          newData: response.results,
        },
      });
      // reset inquiries since if listings data are updated, inquiries should receive the updates too
      dispatch({
        type: "SET_INQUIRIES",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const deleteListing = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      await axios({
        method: "DELETE",
        url: `${apiURL}/real-estate/delete?id=${data.listingId}`,
        headers: { "access-token": data.token },
      });

      dispatch({
        type: "DELETE_LISTINGS",
        payload: data.listingId,
      });
      // reset inquiries since if listings data are updated, inquiries should receive the updates too
      dispatch({
        type: "SET_INQUIRIES",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

// ------
// Agents
// ------
export const getAgents = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "GET",
        url: `${apiURL}/agents/get`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_AGENTS",
        payload: response.results,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const createAgent = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "POST",
        url: `${apiURL}/agents/create`,
        headers: { "access-token": data.token },
        data: data.agentData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "ADD_AGENTS",
        payload: response.results,
      });
      // reset listings since if agents data are updated, listings should receive the updates too
      dispatch({
        type: "SET_LISTINGS",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const updateAgent = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "PUT",
        url: `${apiURL}/agents/update?id=${data.agentId}`,
        headers: { "access-token": data.token },
        data: data.agentData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_AGENTS",
        payload: {
          id: response.results._id,
          newData: response.results,
        },
      });
      // reset listings since if agents data are updated, listings should receive the updates too
      dispatch({
        type: "SET_LISTINGS",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const deleteAgent = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      await axios({
        method: "DELETE",
        url: `${apiURL}/agents/delete?id=${data.agentId}`,
        headers: { "access-token": data.token },
      });

      dispatch({
        type: "DELETE_AGENTS",
        payload: data.agentId,
      });
      // reset listings since if agents data are updated, listings should receive the updates too
      dispatch({
        type: "SET_LISTINGS",
        payload: [],
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

// -----
// Users
// -----
export const getUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "GET",
        url: `${apiURL}/users/get`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_USERS",
        payload: response.results,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "POST",
        url: `${apiURL}/users/register`,
        headers: { "access-token": data.token },
        data: data.userData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "ADD_USERS",
        payload: response.results,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "PUT",
        url: `${apiURL}/users/update?id=${data.userId}`,
        headers: { "access-token": data.token },
        data: data.userData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_USERS",
        payload: {
          id: response.results._id,
          newData: response.results,
        },
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

export const deleteUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      await axios({
        method: "DELETE",
        url: `${apiURL}/users/delete?id=${data.userId}`,
        headers: { "access-token": data.token },
      });

      dispatch({
        type: "DELETE_USERS",
        payload: data.userId,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};

// ---------
// Inquiries
// ---------

export const getInquiries = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "GET",
        url: `${apiURL}/real-estate/get-inquiries`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_INQUIRIES",
        payload: response.results,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);
      showErrorNotification();

      dispatch({
        type: "SET_IS_LOADING_DATA",
        payload: false,
      });
    }
  };
};
