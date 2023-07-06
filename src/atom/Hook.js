import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { LoginState, empNoSelector } from "./loginState";

export const useLoginRecoilValue = () => {
  return useRecoilValue(LoginState);
};

export const useLoginRecoilState = () => {
  return useRecoilState(LoginState);
};

export const useLoginStateGetEmpNo = () => {
  return useRecoilValue(empNoSelector);
};

export const useLogOutRecoil = () => {
  return useResetRecoilState(LoginState);
};
