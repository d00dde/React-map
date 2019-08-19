export default class GmapService {
	
	constructor () {

		this.initialize();
	}

	map = null;

	
	initialize = (lat=12.97, lng=77.59, zoom=12) => {
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

   getCenter = () => {
   	return {
   		lat: this.map.getCenter().lat(),
   		lng: this.map.getCenter().lng()
   	}


   }
}