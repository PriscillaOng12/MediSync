import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";

export default configureStore({
    reducer:{
        user: userReducer,
        ui: uiReducer,
    } 
})
