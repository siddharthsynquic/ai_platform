import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth-slice";
import { uiSlice } from "./slices/ui-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
