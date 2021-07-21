import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const cookies = new Cookies();
const getAdminToken = cookies.get("asia-property-admin-token");
const getUserToken = cookies.get("asia-property-user-token");

const initialState = {
  isAuthenticated: !!getAdminToken || !!getUserToken, // for initial state check if there is any token in cookie
  userData: getUserToken ? jwt(getUserToken) : "",
  adminData: getAdminToken ? jwt(getAdminToken) : "",
  adminToken: getAdminToken || "",
  userToken: getUserToken || "",
  isAuthModalShow: false,
};

const triggerNotification = (notifType, message, isMultiple) => {
  if (notifType === "error") {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: isMultiple ? 10000 : 5000,
    });
  } else {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: isMultiple ? 10000 : 5000,
    });
  }
};

const LoginReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SET_LOGIN_DATA":
      const cookieName =
        payload.role === "user"
          ? "asia-property-user-token"
          : "asia-property-admin-token";

      cookies.set(cookieName, payload.token, {
        path: "/",
        expires: new Date(Date.now() + 2592000), // 1 day
      });

      triggerNotification(
        "success",
        `You've successfully logged in as ${payload.role}.`
      );

      if (payload.role === "user") {
        return {
          ...state,
          isAuthenticated: true,
          userToken: payload.token,
          userData: jwt(payload.token),
        };
      } else {
        return {
          ...state,
          isAuthenticated: true,
          adminToken: payload.token,
          adminData: jwt(payload.token),
        };
      }

    case "SET_LOGIN_FAIL_NOTIFICATION":
      triggerNotification("error", payload.message);

      return {
        ...state,
        isAuthenticated: false,
      };

    case "SET_REGISTER_SUCCESS_NOTIFICATION":
      triggerNotification(
        "success",
        "You've successfully created a new account."
      );

      return state;

    case "SET_REGISTER_ERROR_NOTIFICATION":
      const isObjPayload = typeof payload === "object";

      if (!isObjPayload) {
        triggerNotification("error", payload);
      } else {
        if (payload.email) {
          triggerNotification("error", payload.email, "is-multiple");
        }
        if (payload.username) {
          triggerNotification("error", payload.username, "is-multiple");
        }
        if (payload.phone_number) {
          triggerNotification("error", payload.phone_number, "is-multiple");
        }
        if (payload.password) {
          triggerNotification("error", payload.password, "is-multiple");
        }
      }

      return state;

    case "SET_LOGOUT":
      cookies.remove("asia-property-user-token", { path: "/" });
      cookies.remove("asia-property-admin-token", { path: "/" });

      triggerNotification("success", "You've successfully logout.");

      return {
        ...state,
        isAuthenticated: false,
        userToken: "",
        adminToken: "",
        userData: {},
        adminData: {},
      };

    case "SET_IS_AUTH_MODAL_SHOW":
      return {
        ...state,
        isAuthModalShow: payload,
      };

    default:
      return state;
  }
};

export default LoginReducer;
