import axios from "axios";
import { toast } from "react-toastify";

const apiURL = "https://asia-property.herokuapp.com";

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
        type: "SET_LISTINGS_DATA",
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
        type: "ADD_LISTINGS_DATA",
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

export const updateListing = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "PUT",
        url: `${apiURL}/real-estate/update`,
        headers: { "access-token": data.token },
        data: data.listingData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_LISTINGS_DATA",
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
        type: "DELETE_LISTINGS_DATA",
        payload: data.listingId,
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
        type: "SET_AGENTS_DATA",
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
        type: "ADD_AGENTS_DATA",
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

export const updateAgent = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADING_DATA",
      payload: true,
    });

    try {
      const axiosCall = await axios({
        method: "PUT",
        url: `${apiURL}/agents/update`,
        headers: { "access-token": data.token },
        data: data.agentData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_AGENTS_DATA",
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
        type: "DELETE_AGENTS_DATA",
        payload: data.agentId,
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
        type: "SET_USERS_DATA",
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
        url: `${apiURL}/users/create`,
        headers: { "access-token": data.token },
        data: data.userData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "ADD_USERS_DATA",
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
        url: `${apiURL}/users/update`,
        headers: { "access-token": data.token },
        data: data.userData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "UPDATE_USERS_DATA",
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
        type: "DELETE_USERS_DATA",
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

// ...
