import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./dialogflow.js";
import * as serviceWorker from "./serviceWorker";

function Header() {
  return (
    <React.Fragment>
      <h1>Hi, my name is</h1>
      <h1>Corona Caretaker!</h1>
    </React.Fragment>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
