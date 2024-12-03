import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./Theme/themeSlice.js"
import usersApi from "./features/userApi.js"
import userReducer from "./features/userSlice.js"

export const store = configureStore({
    
    reducer: {
        themes : themeReducer,
        users : userReducer,
        [usersApi.reducerPath] : usersApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
})