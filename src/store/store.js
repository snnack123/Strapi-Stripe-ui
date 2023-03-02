import { configureStore } from "@reduxjs/toolkit";
import { settingsNavigationReducer } from "./settingsNavigation";
import { userReducer } from "./users";

export const store = configureStore({
  reducer: {
    user_store: userReducer,
    navigation_store: settingsNavigationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});