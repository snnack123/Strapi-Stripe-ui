const initialState = {
    jwt: "",
    user: {
        id: "",
        username: "",
        email: "",
        confirmed: false,
        blocked: false,
        stripeId: "",
    }
  };
  
  export function userReducer(state = initialState, action) {
    switch (action.type) {
      case "user/jwt":
        return { ...state, jwt: action.payload };
      case "user/user":
        return { ...state, user: action.payload };
      //logout user
      case "user/logout":
        return { ...state, jwt: "", user: {
            id: "",
            username: "",
            email: "",
            confirmed: false,
            blocked: false,
            stripeId: "",
        } };
      case "user/stripeId":
        return { ...state, user: {...state.user, stripeId: action.payload} };
      default:
        return state;
    }
  }