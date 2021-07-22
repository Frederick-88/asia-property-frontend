import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_HEROKU_BACKEND_URL;

export const getListing = () => {
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
    if (data.isInitial) {
      dispatch({
        type: "SET_IS_INITIAL_LOAD",
        payload: false,
      });
    } else {
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "listing",
      });
    }

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

      if (data.isInitial) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
        });
      } else {
        dispatch({
          type: "SET_IS_LOADER_TYPE",
          payload: "",
        });
      }

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
      if (data.isInitial) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
        });
      } else {
        dispatch({
          type: "SET_IS_LOADER_TYPE",
          payload: "",
        });
      }
    }
  };
};

export const setListingDetail = (listingDetail) => {
  return (dispatch) => {
    dispatch({
      type: "SET_LISTING_DETAIL",
      payload: listingDetail,
    });
  };
};

export const getAgents = (data) => {
  return async (dispatch) => {
    if (data && data.isInitial) {
      dispatch({
        type: "SET_IS_INITIAL_LOAD",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "agent",
      });
    }

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

      if (data && data.isInitial) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
        });
      } else {
        dispatch({
          type: "SET_IS_LOADER_TYPE",
          payload: "",
        });
      }
    } catch (error) {
      const errorMessage = error.response.data;
      console.error(errorMessage);

      toast.error("we're having some issues, can comeback later =)", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      if (data.isInitial) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
        });
      } else {
        dispatch({
          type: "SET_IS_LOADER_TYPE",
          payload: "",
        });
      }
    }
  };
};

export const getWishlists = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "wishlist",
    });

    if (data.isReget) {
      dispatch({
        type: "SET_IS_INITIAL_LOAD",
        payload: true,
      });
    }

    try {
      const axiosCall = await axios({
        method: "get",
        url: `${baseURL}/wishlist/get-by-user-id/${data.user_id}`,
        headers: { "access-token": data.token },
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_WISHLISTS_DATA",
        payload: response.results.wishlists || [],
      });

      dispatch({
        type: "SET_IS_LOADER_TYPE",
        payload: "",
      });

      if (data.isReget) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
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

      if (data.isReget) {
        dispatch({
          type: "SET_IS_INITIAL_LOAD",
          payload: false,
        });
      }
    }
  };
};

export const toggleWishlistListing = (data) => {
  const formattedData = {
    user_id: data.user_id,
    real_estate_id: data.real_estate_id,
  };
  const isRemoveFromWishlist = data.is_wishlisted;

  return async (dispatch) => {
    dispatch({
      type: "SET_IS_LOADER_TYPE",
      payload: "listing",
    });

    try {
      const axiosObj = {
        headers: { "access-token": data.userToken },
      };
      if (isRemoveFromWishlist) {
        axiosObj.url = `${baseURL}/wishlist/delete`;
        axiosObj.method = "delete";
        axiosObj.params = formattedData;
      } else {
        axiosObj.url = `${baseURL}/wishlist/create`;
        axiosObj.method = "post";
        axiosObj.data = formattedData;
      }

      const axiosCall = await axios(axiosObj);
      const response = axiosCall.data;

      dispatch({
        type: "SHOW_TOGGLE_WISHLIST_NOTIFICATION",
        payload: response.message,
      });

      dispatch(
        getWishlists({
          isReget: true,
          user_id: data.user_id,
          token: data.userToken,
        })
      );

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

export const resetWishlistData = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_WISHLISTS_DATA",
      payload: [],
    });
  };
};
