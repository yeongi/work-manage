import { useState, React } from "react";
import Login from "./page/Login";
import Main from "./page/Main";

function App() {
  const [isLoggedIn, setLogIn] = useState(false);

  const loginStateHandler = () => {
    setLogIn(!isLoggedIn);
  };

  return (
    <div className="App">
      {!isLoggedIn && <Login loginHandelr={loginStateHandler} />}
      {isLoggedIn && <Main />}
    </div>
  );
}

export default App;
