import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  isOpenFrom: false,
  isOpenTo: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openFrom(state) {
      state.isOpenFrom = true;
    },
    openTo(state) {
      state.isOpenTo = true;
    },
    closeFrom(state) {
      state.isOpenFrom = false;
    },
    closeTo(state) {
      state.isOpenTo = false;
    },
  }
})

export default modalSlice.reducer;
export const isOpenFromModal = (state:RootState) => state.modal.isOpenFrom;
export const isOpenToModal = (state:RootState) => state.modal.isOpenTo;
export const {openFrom, openTo, closeTo, closeFrom} = modalSlice.actions;