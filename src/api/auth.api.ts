import { auth_request, auth_response } from '../interface/auth.interface';
import { setCookie } from './../utils/cookies';
import { api } from './base.api';

export const api_auth = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<auth_response, auth_request>({
            query: (credentials: any) => ({
                url: "register",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: auth_response, meta: any, arg: any) => {
                response.status = meta.response.status;
                return response;
            },
        }),
        login: builder.mutation<auth_response, auth_request>({
            query: (credentials: any) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: auth_response, meta: any, arg: any) => {
                if (response.data) {
                    setCookie('access_token', response.data?.token ?? '', 30);
                    setCookie('email', response.data?.user_data?.email ?? '', 30);
                    setCookie('name', response.data?.user_data?.name ?? '', 30);
                    setCookie('role', response.data?.user_data?.role ?? '', 30);
                    setCookie('avatar', response.data?.user_data?.image_path ?? '', 30);
                }
                return response;
            },
        }),
        forgot: builder.mutation<{ key: string }, string>({
            query: (email: string) => ({
                url: `forgot_password?email=${email}`,
            }),
        }),
        requestVerifyAccount: builder.mutation<{ key: string }, string>({
            query: (email: string) => ({
                url: `verify_account?email=${email}`,
            }),
        }),
        verifyAccount: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "verify_account",
                method: "POST",
                body: credentials,
            }),
        }),
        verifyAccount2fa: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "verify_2fa_login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: auth_response, meta: any, arg: any) => {
                setCookie('access_token', response.data?.token ?? '', 30);
                setCookie('email', response.data?.user_data?.email ?? '', 30);
                setCookie('name', response.data?.user_data?.name ?? '', 30);
                setCookie('role', response.data?.user_data?.role ?? '', 30);
                return response;
            },
        }),
        resetPassword: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "forgot_password",
                method: "POST",
                body: credentials,
            }),
        }),
        createPassword: builder.mutation<any, any>({
            query: (credentials: any) => ({
                url: "set_user_password",
                method: "POST",
                body: credentials,
            }),
        }),
    })
});

export const { useLoginMutation, useRegisterMutation, useForgotMutation, useRequestVerifyAccountMutation, useVerifyAccountMutation, useResetPasswordMutation, useVerifyAccount2faMutation, useCreatePasswordMutation } = api_auth;