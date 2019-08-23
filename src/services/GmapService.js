export default class GmapService {
	
	constructor (props) {

		this.initialize(props);
	}

	_map = null;
	_poly = null;
  _geocoder = null;

	initialize = ({lat, lng, zoom}) => {
        this._map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: zoom,
          center: {lat, lng}
        });
   }

  static isMapNotAvalable() {
    return !window.google;
  } 

   getMap = () => {
    return this._map;
   }

   addMarker = (lat, lng, title) => {
   		return new window.google.maps.Marker({
          position: {lat, lng},
          title: title,
          map: this._map,
          draggable: true
        });
   }

   delMarker = (marker) => {
       marker.setMap(null);
   }

   getCenter = () => {
   	return {
   		lat: this._map.getCenter().lat(),
   		lng: this._map.getCenter().lng()
   	}
   }

   getCoordinats = (marker) => {
        return {
            lat: marker.internalPosition.lat(),
            lng: marker.internalPosition.lng()
        }
    }

   drawPolyline (markers) {
	    if(this._poly) this._poly.setMap(null);
        const pathCoords = markers.map((marker) => {
            return new window.google.maps.LatLng(marker.lat, marker.lng);
        });
        this._poly = new window.google.maps.Polyline({
            path: pathCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this._map
        });

    }

    refreshPolyline = (markers) => {
        if(this._poly) this._poly.setMap(null);
        const pathCoords = markers.map((marker) => {
            return new window.google.maps.LatLng(marker.internalPosition.lat(),marker.internalPosition.lng());
        });
        this._poly = new window.google.maps.Polyline({
            path: pathCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map: this._map
        });
    }

    showAddress (marker) {
      if(!this._geocoder) this._geocoder = new window.google.maps.Geocoder();
      let address = 'не установлен';
      this._geocoder.geocode({ 'location': {
                                    lat: marker.internalPosition.lat(),
                                    lng: marker.internalPosition.lng() 
                                  }
                      }, (results, status) => {
                        if (status == 'OK') {
                          this.infoWindow (results[0].formatted_address, marker);
                        } else {
                          alert('Адресс не установлен по причине: ' + status);
                        }
      });
      return address;
  }

    infoWindow (content, marker) {
;      const infowindow = new window.google.maps.InfoWindow;
      infowindow.setContent(content);
      infowindow.open(this._map, marker);
    }

}