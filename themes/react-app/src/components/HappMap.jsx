import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBWVd4651hNv8mOn-RaHZdC166O82S-BbY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.defaultCenter}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.defaultCenter.lat, lng: props.defaultCenter.lng }} onClick={props.onMarkerClick} />}
  </GoogleMap>
);

class HappMap extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMarkerShown: true,
      zoom: props.defaultZoom,
      location: {
        lat: props.lat,
        lng: props.lng
      }
    };

  }

  componentDidMount() {

  }

  componentWillUpdate() {

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }


  render() {

    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        zoom={this.state.zoom}
        defaultCenter={this.state.location}
      />
    );
  }
}

export default HappMap;