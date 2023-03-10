import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal";
import { paymentReducer } from "./payment";
import { settingsNavigationReducer } from "./settingsNavigation";
import { userReducer } from "./users";

export const store = configureStore({
  reducer: {
    user_store: userReducer,
    navigation_store: settingsNavigationReducer,
    payment_store: paymentReducer,
    modal_store: modalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});