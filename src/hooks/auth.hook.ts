import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getAccessToken, getEmail, getName, getRole } from './../slices/auth.slice';

export const useAuth = () => {
    const accessToken = useSelector(getAccessToken);
    const email = useSelector(getEmail);
    const name = useSelector(getName);
    const role = useSelector(getRole);
    let user_payload: {
        name: string;
        email: string;
        role: string;
    } = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'participant'
    };
    try {
        user_payload = {
            email: email!,
            name: name!,
            role: role!,
        }
    } catch (error) { }

    return useMemo(() => ({ accessToken, user_payload }), [accessToken, user_payload]);
};
