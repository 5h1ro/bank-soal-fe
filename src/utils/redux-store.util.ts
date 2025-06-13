import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/base.api";
import authReducer from "../slices/auth.slice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(api.middleware),
    devTools: import.meta.env.VITE_APP_LEVEL === 'development' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;