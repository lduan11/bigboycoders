import React from "react";
import ReactDOM from "react-dom";
import "milligram";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import GoogleMapReact from "google-map-react";
import Radar from "radar-sdk-js";
import { Provider } from "react-redux";
import { store } from "./chat";
import App from "./App";
import { compose, withProps, withHandlers, withState } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
/*global google*/
function Header() {
  return (
    <React.Fragment>
      <div className="header-container">
        <div className="inner-header-container">
          <h1>Hi, my name is</h1>
          <h1>Corona Caretaker!</h1>
        </div>
        <div className="button-container">
          <a href="#about" className="scroll-button" >About</a>
          <a href="#chat" className="scroll-button">Try me!</a>
        </div>
      </div>

    </React.Fragment>
  );
}

function About() {
  return (
    <React.Fragment>
      <div className="about-container" id="about">
        <h2>About</h2>
      </div>
    </React.Fragment>
  );
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;



let lat = 51.508530;
let long = -0.076132;
const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCj37HR3ebC1UHS50m3LqM1dTPQ5kzcHeU&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type : 'hospital'
                };
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        Radar.initialize("prj_live_pk_21349df7f94d8750e0d0c588abde594ed166c46d");
                        Radar.trackOnce(function(err, result) {
                            if (!err){
                                lat = result.coords.latitude;
                                long = result.coords.longitude;
                            }
                            console.log(err);
                        });
                        console.log(results);
                        updatePlaces(results);
                    }
                    console.log(status);
                })
            }
        }
    }),
)((props) => {
    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={8}
            defaultCenter={{ lat: lat, lng: long }}
        >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
        </GoogleMap>
    )
})




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
          <div style={{ height: "50vh", width: "50%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCYVBKK_e3qDxr5RJBALvR9B68AGjOsMYE"
              }}
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
    <About />
    <Provider store={store}>
      <App />
    </Provider>
    <MyMapComponent />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
