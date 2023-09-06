import { createSlice } from "@reduxjs/toolkit";
import {getAuthUser} from "../../utils";

const initialState = {
    sidebar: false
}

const uiSlice = createSlice({
    initialState,
    name: "ui",
    reducers: {
        set_sidebar: (state, action) => {
            state.sidebar = action.payload;
            return state
        },
    }
})

export default uiSlice.reducer;

export const {
    set_sidebar
} = uiSlice.actions;
