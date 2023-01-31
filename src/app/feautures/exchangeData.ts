import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExchange } from "../../types/types";
import { RootState } from "../store";

interface ExchangeDataProps {
  exchanges: IExchange[],
}

const initialState: ExchangeDataProps = {
  exchanges: [],
}

const exchangeData = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    addData(state, action: PayloadAction<IExchange[]>) {
      state.exchanges = action.payload;
    }
  }
})

export default exchangeData.reducer;
export const exchangeContent = (state:RootState) => state.exchange.exchanges;
export const { addData } = exchangeData.actions;