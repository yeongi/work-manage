import { atom, selector } from "recoil";

const initState = {
  IS_LOGIN: false,
  EMP_NO: null,
  EMP_NAME: "",
  MH: 0,
  IS_ADMIN: false,
};

export const LoginState = atom({
  key: "loginState",
  default: initState,
});

export const empNoSelector = selector({
  key: "loginStateEmpNo",
  get: ({ get }) => {
    const loginState = get(LoginState);
    return loginState.EMP_NO;
  },
});

export const empIsAdminSelector = selector({
  key: "loginStateIsAdmin",
  get: ({ get }) => {
    const loginState = get(LoginState);
    return loginState.IS_ADMIN;
  },
});
