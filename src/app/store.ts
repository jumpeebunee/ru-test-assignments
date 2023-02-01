import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "./feautures/modalSlice";
import exchangeReducer from "./feautures/exchangeSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    exchange: exchangeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
