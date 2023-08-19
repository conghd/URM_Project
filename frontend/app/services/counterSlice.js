import {createSlice} from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increaseByOne: (state) => {
      state.value++;
    },
    decreaseByOne: (state) => {
      state.value--;
    },
  },
});

export const {increaseByOne, decreaseByOne} = counterSlice.actions;

export default counterSlice.reducer;
