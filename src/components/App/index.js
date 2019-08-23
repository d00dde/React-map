import React, {Component} from 'react';
import './App.css'

import AddMarker from '../AddMarker';
import MarkerList from '../MarkerList';
import Map from '../Map';

export default class App extends Component {

  idCounter = 0;

  state = {
    markers: [],
    order: [],
    lat: 12.97,
    lng: 77.59,
    zoom: 16
  }

  createMarker = (title) => {
    return ({
      id: this.idCounter++,
      title: title,
      lat: this.state.lat,
      lng: this.state.lng
    });
  }



  setOrder = (order) => {
    if(this.equals(order, this.state.order))
      return;
    this.setState({
      order: order
    });
  }

  addMarker = (title) => {
    this.setState ((state) => {
      return ({
        markers: [...state.markers, this.createMarker(title)]
      });
    });
  }

  deleteMarker = (id) => {
    
    this.setState((state) => {

      const newMarkers = state.markers.filter((marker) =>{
        return marker.id !== id;
      });
      return { markers: newMarkers };
    });
  } 

  render () {
    return (
      <div className="container row">
        <div className="col-6 left-container">
          <AddMarker addMarker={this.addMarker}/>
          <MarkerList markers={this.state.markers}
                      delete={this.deleteMarker}
                      setOrder={this.setOrder}/>
        </div>
        <Map markers={this.orderMarkers(this.state.markers, this.state.order)}
             setCenter={this.setCenter}
             setMarkersCoordinats={this.setMarkersCoordinats}
             init={{
               lat: this.state.lat,
               lng: this.state.lng,
               zoom: this.state.zoom
             }}
        />
      </div>
    );
  }

  setCenter = ({lat, lng}) => {
    this.setState ({
      lat,
      lng
    });
  }

  setMarkersCoordinats = (id, lat, lng) => {
    this.setState ((state) => {
      return( {
        markers: state.markers.map((marker) => {
          if(marker.id === id)
           return { ...marker, lat, lng};
          return { ...marker};
        })
      });
    });
  }

  orderMarkers = (markers, order) => {
    return order.map((num) => {
      return markers.find((marker) => {
        return marker.id == num;
      });
    }).filter((item) => item);

  }

  equals = (arr1, arr2) => {
    if(arr1.length !== arr2.length)
      return false;
    for(let i = 0; i < arr1.length; i++){
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }

}

