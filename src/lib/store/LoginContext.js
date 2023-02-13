import { createContext, useContext, useState } from "react";

const initState = {
  IS_LOGIN: false,
  EMP_NO: null,
  EMP_NAME: "",
  MH: 0,
  IS_ADMIN: false,
};

const LoginCtx = createContext({
  onLogin: () => {},
  onLogout: () => {},
  setMH: () => {},
  state: initState,
});

export const useLoginCtx = () => {
  return useContext(LoginCtx);
};

export const LoginProvider = ({ children }) => {
  const [loginState, setLogin] = useState(initState);

  const onLoginHandler = (loginInfo) => {
    setLogin(loginInfo);
  };

  const onLogoutHandler = () => {
    if (loginState.IS_ADMIN) {
      alert("로그아웃 됐습니다.");
      setLogin(initState);
      return;
    }
    if (loginState.MH < 8) {
      alert("금일 투입 시수를 다 채우지 않았습니다.");
      return;
    }
    if (loginState.MH >= 8) {
      alert("로그아웃 됐습니다.");
      setLogin(initState);
      return;
    }
  };

  const setTodayMHHandler = (MH) => {
    setLogin((prev) => {
      return { ...prev, MH: MH };
    });
  };

  return (
    <LoginCtx.Provider
      value={{
        onLogin: onLoginHandler,
        onLogout: onLogoutHandler,
        setMH: setTodayMHHandler,
        state: loginState,
      }}
    >
      {children}
    </LoginCtx.Provider>
  );
};
