import Login from "./page/Login";
import Main from "./page/Main";
import { GlobalStyle } from "lib/GlobalStyle";
import { useLoginRecoilValue } from "atom/LoginHook";

function App() {
  const loginState = useLoginRecoilValue();
  return (
    <div className="App">
      <GlobalStyle />
      {!loginState.IS_LOGIN && <Login />}
      {loginState.IS_LOGIN && <Main />}
    </div>
  );
}

export default App;
