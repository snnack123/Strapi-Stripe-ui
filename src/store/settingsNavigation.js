import { subNavigation, mainNavigation } from "../utils/constants";

const initialState = {
    mainNavigationOptions: mainNavigation,
    subNavigationOptions: subNavigation
  };
  
  export function settingsNavigationReducer(state = initialState, action) {
    switch (action.type) {
      case "subNavigation/active":
        //find which navigation item is active
        const activeNavigation = state.subNavigationOptions.map((item) => {
          if (item.current) {
            if(item.href.includes(action.payload)) {
              return item;
            } else {
              return { ...item, current: false };
            }
          }

          if(item.href.includes(action.payload)) {
            return { ...item, current: true };
          }

          return item;
        });

        return {
          ...state,
          subNavigationOptions: activeNavigation
        };
      case "mainNavigation/active":
        //find which navigation item is active
        const activeMainNavigation = state.mainNavigationOptions.map((item) => {
          if (item.current) {
            if(item.href.includes(action.payload)) {
              return item;
            } else {
              return { ...item, current: false };
            }
          }

          if(item.href.includes(action.payload)) {
            return { ...item, current: true };
          }

          return item;
        });

        return {
          ...state,
          mainNavigationOptions: activeMainNavigation
        };
      case "settingsNavigation/reset":
        return initialState;
      default:
        return state;
    }
  }