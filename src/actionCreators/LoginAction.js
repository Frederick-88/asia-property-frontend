import axios from "axios";
import { getWishlists } from "./UsersAction";
import jwt from "jwt-decode";

const apiURL = process.env.REACT_APP_API_URL;

/* Full Axios Object Parameters :
    axios({
        method: 'post',
        url: `${apiURL}/${version}/upload-file`,
        data: loginData,
        params: loginParams
        headers: {
        'Content-Type': 'multipart/form-data',
        'upload-metadata-additional': JSON.stringify({ is_logo: true }),
        'access-token': loginToken,
        },
    });
*/

export const doLogin = (data) => {
  const formattedData = {
    email: data.email,
    password: data.password,
  };

  return async (dispatch) => {
    try {
      const axiosCall = await axios({
        method: "post",
        url: `${apiURL}/users/login`,
        data: formattedData,
      });
      const response = axiosCall.data;
      const userId = jwt(response.token).id;

      dispatch({
        type: "SET_LOGIN_DATA",
        payload: response,
      });
      dispatch({
        type: "SET_IS_AUTH_MODAL_SHOW",
        payload: false,
      });
      dispatch(
        getWishlists({
          user_id: userId,
          token: response.token,
        })
      );
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch({
        type: "SET_LOGIN_FAIL_NOTIFICATION",
        payload: errorMessage,
      });
    }
  };
};

export const doRegister = (data) => {
  const formattedData = {
    email: data.email,
    password: data.password,
    username: data.username,
    phone_number: data.phone_number,
  };

  return async (dispatch) => {
    try {
      const axiosCall = await axios({
        method: "post",
        url: `${apiURL}/users/register`,
        data: formattedData,
      });
      const response = axiosCall.data;

      dispatch({
        type: "SET_REGISTER_SUCCESS_NOTIFICATION",
        payload: response.message,
      });
    } catch (error) {
      const errorMessage = error.response.data;
      dispatch({
        type: "SET_REGISTER_ERROR_NOTIFICATION",
        payload: errorMessage.message,
      });
    }
  };
};

export const doLogout = () => {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGOUT",
    });
  };
};

export const setIsAuthModalShow = (boolean) => {
  return (dispatch) => {
    dispatch({
      type: "SET_IS_AUTH_MODAL_SHOW",
      payload: boolean,
    });
  };
};

export const setUserRole = (item) => {
  return (dispatch) => {
    dispatch({
      type: "SET_USER_ROLE",
      payload: item,
    });
  };
};
