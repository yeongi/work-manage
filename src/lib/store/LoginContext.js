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
    setLogin(initState);
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
