import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_HEROKU_BACKEND_URL;

export const getListing = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "listing",
    });

    try {
      const axiosCall = await axios({
        method: "get",
        url: `${baseURL}/real-estate/get`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_LISTING_DATA",
        payload: response.results,
      });

      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);

      toast.error("we're having some issues, can comeback later =)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    }
  };
};

export const getListingWithQueries = (data) => {
  const formattedParams = {};
  if (data.search_query) {
    formattedParams.search_query = data.search_query;
  }
  if (data.type) {
    formattedParams.type = data.type;
  }

  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "listing",
    });

    try {
      const axiosCall = await axios({
        method: "get",
        url: `${baseURL}/real-estate/search`,
        params: formattedParams,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_QUERY_LISTING_DATA",
        payload: {
          type: formattedParams.type ? formattedParams.type : "all",
          data: response.results,
        },
      });

      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });

      if (data.search_query) {
        dispatch({
          type: "SHOW_SEARCH_LISTING_NOTIFICATION",
        });
      }
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);

      toast.error("we're having some issues, can comeback later =)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    }
  };
};

export const getAgents = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "agent",
    });

    try {
      const axiosCall = await axios({
        method: "get",
        url: `${baseURL}/agents/get`,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_AGENTS_DATA",
        payload: response.results,
      });

      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);

      toast.error("we're having some issues, can comeback later =)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    }
  };
};

export const getWishlists = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "wishlist",
    });

    try {
      const axiosCall = await axios({
        method: "get",
        url: `${baseURL}/wishlist/get-by-user-id/${userId}`,
        // header of access-token
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_AGENTS_DATA",
        payload: response.results,
      });

      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);

      toast.error("we're having some issues, can comeback later =)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });
    }
  };
};
