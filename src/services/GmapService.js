export default class GmapService {
	
	constructor (props) {

		this.initialize(props);
	}

	map = null;
	poly = null;

	initialize = ({lat, lng, zoom}) => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: zoom,
          center: {lat, lng}
        });
   }

   addMarker = (lat, lng, title) => {
   		return new window.google.maps.Marker({
          position: {lat, lng},
          title: title,
          map: this.map,
          draggable: true
        });
   }

   delMarker = (marker) => {
       marker.setMap(null);
   }

   getCenter = () => {
   	return {
   		lat: this.map.getCenter().lat(),
   		lng: this.map.getCenter().lng()
   	}
   }

   getCoordinats = (marker) => {
        return {
            lat: marker.internalPosition.lat(),
            lng: marker.internalPosition.lng()
        }
    }

   drawPolyline (markers) {
	    if(this.poly) this.poly.setMap(null);
        const pathCoords = markers.map((marker) => {
            return new window.google.maps.LatLng(marker.lat, marker.lng);
        });
        this.poly = new window.google.maps.Polyline({
            path: pathCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this.map
        });

    }

    refreshPolyline = (markers) => {
        if(this.poly) this.poly.setMap(null);
        const pathCoords = markers.map((marker) => {
            return new window.google.maps.LatLng(marker.internalPosition.lat(),marker.internalPosition.lng());
        });
        this.poly = new window.google.maps.Polyline({
            path: pathCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this.map
        });
    }



}