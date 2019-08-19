import React, { Component } from 'react';
import GmapService from './GmapService';

import './Map.css';

class Map extends Component {
  


  componentDidMount() {
  	let gmap = new GmapService ();
  	let marker = gmap.addMarker (12.97, 77.59, 'hello');
  	gmap.map.addListener('dragend', () => {
  		this.props.setCenter(gmap.getCenter());
  	});


  	//console.log(marker);
  	marker.addListener('drag', () => console.log('marker drag'));
  	marker.addListener('dragend', () => console.log('marker dragend'));
  	//marker.setMap(null);
  	//console.log(marker);

  }

  render() {
  	
  	this.drawMarkers (this.props.markers);

    return (
      <div id='map'></div>
    );
  }

  drawMarkers = (markers) => {
  	
  }
}

export default Map;

