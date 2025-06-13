import { atomFamily } from 'recoil';

export const showPasswordState = atomFamily<boolean, string>({
    key: 'showPassword',
    default: false
});

export const showConfirmationPasswordState = atomFamily<boolean, string>({
    key: 'showConfirmationPassword',
    default: false
});

export const showNewPasswordState = atomFamily<boolean, string>({
    key: 'showNewPassword',
    default: false
});

export const showConfirmationNewPasswordState = atomFamily<boolean, string>({
    key: 'showConfirmationNewPassword',
    default: false
});