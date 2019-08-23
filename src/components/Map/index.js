import React, { Component } from 'react';
import ErrorMap from '../ErrorMap';
import GmapService from '../../services/GmapService';

import './Map.css';

export default class Map extends Component {
  
   state = {
    error: false
   }

   drawnMarkers = [];

  componentDidMount() {
    if(GmapService.isMapNotAvalable()) {
      this.setState({
        error: true
      });
      return;
    }
  	this.mapTool = new GmapService(this.props.init);
  	this.mapTool.getMap().addListener('dragend', () => {
  	this.props.setCenter(this.mapTool.getCenter());
  	});
  }

  componentDidUpdate () {
    if(this.state.error)
      return;
    this.drawMarkers (this.props.markers);
    if(this.mapTool) this.mapTool.drawPolyline(this.props.markers);
  }

  render() {
    return this.state.error ? <ErrorMap /> : <div id='map'></div>;
  }

  drawMarkers = (markers) => {
      this.clearMap();
      markers.forEach(({title, lat, lng, id}) => {
       const marker = this.mapTool.addMarker(lat, lng, title);
       marker.id = id;
       marker.addListener('drag', () => this.mapTool.refreshPolyline(this.drawnMarkers));
       marker.addListener('dragend', () => this.markerDragend(marker));
       marker.addListener('click', () => this.mapTool.showAddress(marker));
       this.drawnMarkers.push(marker);
      });
  }

  clearMap = () => {
    this.drawnMarkers.forEach((marker) => {
        this.mapTool.delMarker (marker);
    });
      this.drawnMarkers = [];
  }

  markerDragend = (marker) => {
      const coord = this.mapTool.getCoordinats(marker);
      this.props.setMarkersCoordinats(marker.id, coord.lat, coord.lng);
  }
}


