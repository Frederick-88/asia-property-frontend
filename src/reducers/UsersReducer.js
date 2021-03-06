import { toast } from "react-toastify";

const initialState = {
  isInitialLoad: false,
  isLoadingType: "", // listing, listing-detail, wishlist, agent
  listingData: [],
  forRentListingData: [],
  forSaleListingData: [],

  listingDetail: {},

  agentsData: [],
  wishlistsData: [],
  hasDidGetWishlist: false,
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

    case "SET_LISTING_DETAIL":
      return {
        ...state,
        listingDetail: payload,
      };

    case "SET_AGENTS_DATA":
      return {
        ...state,
        agentsData: payload,
      };

    case "SET_WISHLISTS_DATA":
      return {
        ...state,
        wishlistsData: payload,
        hasDidGetWishlist: true,
      };

    case "SET_IS_LOADER_TYPE":
      return {
        ...state,
        isLoadingType: payload,
      };

    case "SET_IS_INITIAL_LOAD":
      return {
        ...state,
        isInitialLoad: payload,
      };

    case "SHOW_TOGGLE_WISHLIST_NOTIFICATION":
      triggerNotification("success", payload);

      return state;

    case "SHOW_SEARCH_LISTING_NOTIFICATION":
      triggerNotification("success", "Here is your search results.");

      return state;

    default:
      return state;
  }
};

export default UsersReducer;
