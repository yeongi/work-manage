import { useLoginCtx } from "./store/LoginContext";
import Login from "./page/Login";
import Main from "./page/Main";
import { GlobalStyle } from "lib/GlobalStyle";

function App() {
  const loginCtx = useLoginCtx();
  return (
    <div className="App">
      <GlobalStyle />
      {!loginCtx.state.IS_LOGIN && <Login />}
      {loginCtx.state.IS_LOGIN && <Main />}
    </div>
  );
}

export default App;
