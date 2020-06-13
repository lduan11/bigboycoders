import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./dialogflow.js";
import * as serviceWorker from "./serviceWorker";
import go from "./resources/images/go.png";
import GoogleMapReact from 'google-map-react';


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
      <div class = "container">
      <df-messenger expand = "True" class="messenger-box"
        intent="WELCOME"
        chat-title="Corona Caretaker"
        agent-id="6e033b91-4e7c-42e8-8e4a-e0b0a16879e4"
        language-code="en"
      ></df-messenger>
      </div>
    </React.Fragment>
  );
}
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Map() {
  let defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

    return (
        <React.Fragment>
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYVBKK_e3qDxr5RJBALvR9B68AGjOsMYE" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      </React.Fragment>
    );

}



ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BotButton />
    <DialogFlowIntegration />
    <Map />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
