import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExchange } from "../../types/types";
import { RootState } from "../store";

interface ExchangeDataProps {
  exchanges: IExchange[],
  baseCurrency: string,
}

const CURENCY_EXCHANGE = 'rub';

const initialState: ExchangeDataProps = {
  exchanges: [],
  baseCurrency:  localStorage.getItem('currency') ? localStorage.getItem('currency') as string : CURENCY_EXCHANGE,
} 

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    addData(state, action: PayloadAction<IExchange[]>) {
      state.exchanges = action.payload;
    },
    changeCurrency(state, action:PayloadAction<string>) {
      state.baseCurrency = action.payload;
      localStorage.setItem('currency', action.payload);
    }
  }
})

export default exchangeSlice.reducer;
export const exchangeContent = (state:RootState) => state.exchange.exchanges;
export const baseCurrency = (state:RootState) => state.exchange.baseCurrency;
export const { addData, changeCurrency } = exchangeSlice.actions;