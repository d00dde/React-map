import React, {Component} from 'react';
import './App.css'

import AddMarker from '../AddMarker';
import MarkerList from '../MarkerList';
import Map from '../Map';

export default class App extends Component {

  idCounter = 0;

  createMarker = (title) => {
    return ({
      id: this.idCounter++,
      title: title
    });
  }

  state = {
    markers: [this.createMarker('one'),
              this.createMarker('two'),
              this.createMarker('three'),
              this.createMarker('four'),
              this.createMarker('five')
            ],
    order: []
  }

  setOrder = (order) => {
    if(this.equals(order, this.state.order))
      return;
    console.log('set order: ', order)
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
        <div className="col-6">
          <AddMarker addMarker={this.addMarker}/>
          <MarkerList markers={this.state.markers}
                      delete={this.deleteMarker}
                      setOrder={this.setOrder}/>
        </div>
        <Map />
      </div>
    );
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

