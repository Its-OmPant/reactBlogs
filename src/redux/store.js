import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Authentication/authSlice.js";
export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
