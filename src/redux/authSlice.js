import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    role: "",
    accountID: "",
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
      state.role = "staff";
    },
    logout: (state) => {
      state.loggedIn = false;
      state.role = "";
    },
    adminLogin: (state) => {
      state.loggedIn = true;
      state.role = "admin";
    },
    setID: (state, action) => {
      state.accountID = action.payload;
    },
  },
});

export const { login, logout, adminLogin, setID } = authSlice.actions;
export default authSlice.reducer;
