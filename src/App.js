import { useLoginCtx } from "./lib/store/LoginContext";
import Login from "./page/Login";
import Main from "./page/Main";

function App() {
  const loginCtx = useLoginCtx();
  return (
    <div className="App">
      {!loginCtx.state.IS_LOGIN && <Login />}
      {loginCtx.state.IS_LOGIN && <Main />}
    </div>
  );
}

export default App;
