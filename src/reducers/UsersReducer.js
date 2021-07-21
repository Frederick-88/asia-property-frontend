import { toast } from "react-toastify";

const initialState = {
  isLoadingType: "", // listing, listing-detail, wishlist, agent
  listingData: [],
  forRentListingData: [],
  forSaleListingData: [],

  agentsData: [],
  wishlistsData: [],
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

const UsersReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "SET_LISTING_DATA":
      return {
        ...state,
        listingData: payload,
      };

    case "SET_QUERY_LISTING_DATA":
      if (payload.type === "all") {
        return {
          ...state,
          listingData: payload.data,
        };
      } else if (payload.type === "for-rent") {
        return {
          ...state,
          forRentListingData: payload.data,
        };
      } else {
        return {
          ...state,
          forSaleListingData: payload.data,
        };
      }

    case "SET_AGENTS_DATA":
      return {
        ...state,
        agentsData: payload,
      };

    case "SET_WISHLISTS_DATA":
      return {
        ...state,
        wishlistsData: payload,
      };

    case "SET_IS_LOADER_TYPE":
      return {
        ...state,
        isLoadingType: payload,
      };

    case "SHOW_SEARCH_LISTING_NOTIFICATION":
      triggerNotification("success", "Here is your search results.");

      return state;

    default:
      return state;
  }
};

export default UsersReducer;
