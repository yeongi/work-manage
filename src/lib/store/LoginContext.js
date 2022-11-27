import { createContext, useContext, useState } from "react";

const initState = {
  IS_LOGIN: false,
  EMP_NO: null,
  EMP_NAME: "",
  IS_ADMIN: false,
};

const LoginCtx = createContext({
  onLogin: () => {},
  onLogout: () => {},
  ...initState,
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

  return (
    <LoginCtx.Provider
      value={{
        onLogin: onLoginHandler,
        onLogout: onLogoutHandler,
        state: loginState,
      }}
    >
      {children}
    </LoginCtx.Provider>
  );
};
