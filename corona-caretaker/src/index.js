import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./dialogflow.js";
import * as serviceWorker from "./serviceWorker";
import go from "./resources/images/go.png";

function Header() {
  return (
    <React.Fragment>
      <h1>Hi, my name is</h1>
      <h1>Corona Caretaker!</h1>
    </React.Fragment>
  );
}

function BotButton() {
  return <button className="scroll-button"></button>;
}

function DialogFlowIntegration() {
  return (
    <React.Fragment>
      <df-messenger class="messenger-box"
        intent="WELCOME"
        chat-title="MLH-Hackathon2"
        agent-id="6e033b91-4e7c-42e8-8e4a-e0b0a16879e4"
        language-code="en"
      ></df-messenger>
    </React.Fragment>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BotButton />
    <DialogFlowIntegration />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
