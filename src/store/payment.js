const initialState = {
    card: {
        last4: "",
        expMonth: "",
        expYear: "",
        brand: "",
    },
    activePlan: {
        name: "",
        type: "",
        expireDate: "",
    },
  };
  
  export function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case "payment/card":
            return { ...state, card: action.payload };
        case "payment/activePlan":
            return { ...state, activePlan: action.payload };
      default:
        return state;
    }
  }