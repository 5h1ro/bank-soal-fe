import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import axios from "axios";
import { setAccessToken } from "../slices/auth.slice";
import { RootState } from "../utils/redux-store.util";
import { getCookie, setCookie } from './../utils/cookies';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error) {
        if (result.error.status == 401) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
                    const refreshResult = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/refresh_token`, {
                        headers: {
                            "accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getCookie('refresh_token')}`
                        },
                    });
                    api.dispatch(setAccessToken({
                        accessToken: refreshResult.data?.token!,
                        refreshToken: refreshResult.data?.refresh_token!
                    }));
                    setCookie('access_token', refreshResult.data?.token!, 1 / 24);
                    setCookie('refresh_token', refreshResult.data?.refresh_token!, 1);
                    result = await baseQuery(args, api, extraOptions);
                } catch (error) {
                    // console.log(error);

                    // api.dispatch(logOut());
                } finally {
                    release();
                }
            } else {
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);
            }
        }
    }
    return result;
};

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    refetchOnMountOrArgChange: 1,
    tagTypes: ['Admin', 'Participant', 'Artikel', 'Slider', 'Contact', 'Homepage', 'ArtikelKategori', 'HasilTes', 'Pembayaran', 'ManajemenTes', 'TesKategori'],
    endpoints: (builder) => ({}),
});