import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import moviesReducer from "./movieSlice";

const appStore = configureStore({
    reducer: {
        user: usersReducer,
        movies: moviesReducer
    },
})
export type RootState = ReturnType<typeof appStore.getState>; // ✅ Define RootState type
export type AppDispatch = typeof appStore.dispatch; // ✅ Define AppDispatch type

export default appStore