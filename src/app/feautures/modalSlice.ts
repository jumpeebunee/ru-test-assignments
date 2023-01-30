import { createSlice } from "@reduxjs/toolkit";

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
    closeFrom(state) {
      state.isOpenFrom = false;
    }
  }
})

export default modalSlice.reducer;