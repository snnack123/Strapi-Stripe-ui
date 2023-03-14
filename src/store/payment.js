const initialState = {
    card: {
        last4: null,
        expMonth: null,
        expYear: null,
        brand: null,
    },
    activePlan: {
        name: null,
        type: null,
        expireDate: null,
    },
    availablePlans: [],
  };
  
  export function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case "payment/card":
            return { ...state, card: action.payload };
        case "payment/activePlan":
            return { ...state, activePlan: action.payload };
        case "payment/availablePlans":
            return { ...state, availablePlans: action.payload };
        case "payment/reset":
            return initialState;
      default:
        return state;
    }
  }