const initialState = {
    updateEmail: false,
    showUpdatedEmail: false,
    updatePassword: false,
    showUpdatedPassword: false,
  };
  
  export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case "modal/updateEmail":
            return { ...state, updateEmail: action.payload };
        case "modal/updatePassword":
            return { ...state, updatePassword: action.payload };
        case "modal/showUpdatedEmail":
            return { ...state, showUpdatedEmail: action.payload };
        case "modal/showUpdatedPassword":
            return { ...state, showUpdatedPassword: action.payload };
        case "modal/reset":
            return initialState;
      default:
        return state;
    }
  }