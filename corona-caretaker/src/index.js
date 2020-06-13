import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import GoogleMapReact from "google-map-react";
import Radar from "radar-sdk-js";
import { Provider } from "react-redux";
import { store } from "./chat";
import App from "./App";
import "milligram";

function BotButton() {
  return (
    <div className="scroll-button">
      <button className="scroll-button"></button>
    </div>
  );
}

function Header() {
  return (
    <React.Fragment>
      <div className="header-container">
        <h1>Hi, my name is</h1>
        <h1>Corona Caretaker!</h1>
      </div>
    </React.Fragment>
  );
}

function About() {
  return (
    <React.Fragment>
      <div className="about-container">
        <h2>About</h2>
      </div>
    </React.Fragment>
  );
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map() {
  Radar.initialize("prj_live_pk_21349df7f94d8750e0d0c588abde594ed166c46d");
  let defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  Radar.trackOnce(function(err, result) {
    if (!err) {
      defaultProps.center.lat = result.coords.latitude;
      defaultProps.center.lng = result.coords.longitude;
      return (
        <React.Fragment>
          s
          <div style={{ height: "50vh", width: "50%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCYVBKK_e3qDxr5RJBALvR9B68AGjOsMYE"
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {databaseRequest.map(entry =>
                messageCounter++ % 2 === 0 ? (
                  <li style={{ color: "rgb(0, 171, 279)" }}>{entry.text}</li>
                ) : null
              )}
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
  });

  return (
    <React.Fragment>
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCYVBKK_e3qDxr5RJBALvR9B68AGjOsMYE" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BotButton />
    <About />
    <Provider store={store}>
      <App />
    </Provider>
    <Map />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
