import { createSlice } from "@reduxjs/toolkit";
import { api_auth } from "../api/auth.api";
import { getCookie, removeCookie } from "../utils/cookies";
import { RootState } from "../utils/redux-store.util";

type AuthState = {
    accessToken: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
};

const authSlice = createSlice({
    name: "auth",
    initialState: { accessToken: getCookie('access_token'), name: getCookie('name'), email: getCookie('email'), role: getCookie('role') } as AuthState,
    reducers: {
        setAccessToken: (state, action) => {
            const { accessToken, name, email, role } = action.payload;

            state.accessToken = accessToken;
            state.name = name;
            state.email = email;
            state.role = role;
        },
        logOut: (state) => {
            removeCookie('access_token');
            removeCookie('name');
            removeCookie('email');
            removeCookie('role');

            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api_auth.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.accessToken = payload.data?.message ?? '';
                state.name = payload.data?.message ?? '';
                state.email = payload.data?.message ?? '';
                state.role = payload.data?.message ?? '';
            }
        );
    },
});

export const { setAccessToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getAccessToken = (state: RootState) => state.auth.accessToken;
export const getName = (state: RootState) => state.auth.name;
export const getEmail = (state: RootState) => state.auth.email;
export const getRole = (state: RootState) => state.auth.role;
