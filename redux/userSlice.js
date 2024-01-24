import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    userSuccess(state, action) {
      state.userId = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { userSuccess } = actions;
export default reducer;
