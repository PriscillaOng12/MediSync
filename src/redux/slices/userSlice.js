import { createSlice } from "@reduxjs/toolkit";
import {getAuthUser} from "../../utils";

const initialState = getAuthUser();

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        login: (state, action) => action.payload,
        
        logout: (state, action) => {
            return false
        }
    }
})

export default userSlice.reducer;

export const {
    login,logout
} = userSlice.actions;
