const initialState = {
    editCard: false,
    createCard: false,
  };
  
  export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case "payment/editCard":
            return { ...state, editCard: action.payload };
        case "payment/createCard":
            return { ...state, createCard: action.payload };
        case "payment/reset":
            return initialState;
      default:
        return state;
    }
  }