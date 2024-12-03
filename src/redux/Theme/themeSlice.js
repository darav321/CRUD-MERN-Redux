import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme : "light"
}

export const themeSlice = createSlice({
    name : "themes",
    initialState : initialState,
    reducers : {
        themeToggle : (state) => {
            const prevTheme = state.theme;
            if(prevTheme === "light")
            {
                state.theme = "dark"
            }
            else state.theme = "light"
        }
    }
})

export const {themeToggle} = themeSlice.actions
export default themeSlice.reducer