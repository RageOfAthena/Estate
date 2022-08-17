import logo from "./logo.svg";
import "./App.css";
import Header from "./Sections/Header.js";
import Mainpage from "./Sections/Mainpage.js";
import { useState } from "react";
function App() {
  const [cred, oncred] = useState();
  function getcred(r) {
    oncred(r);
  }

  return (
    <div className="App">
      <Header credval={getcred} />
      {sessionStorage.getItem("user") && <Mainpage />}
    </div>
  );
}

export default App;
