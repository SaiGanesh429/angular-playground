import { Component, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  markers: any[] = [];
  map: any;
  map_data = {
    coordinatesArray: [
      { lat: 45.1, lng: 15.2, name: 'Croatia' },
      { lat: 20.593684, lng: 78.96288, name: 'India' },
      { lat: 55.378051, lng: -3.435973, name: 'United Kingdom' },
      { lat: 51.165691, lng: 10.451526, name: 'Germany' },
      { lat: 56.130366, lng: -106.346771, name: 'Canada' },
      { lat: 50.503887, lng: 4.469936, name: 'Belgium' },
      { lat: 60.472024, lng: 8.468946, name: 'Norway' },
      { lat: 61.52401, lng: 105.318756, name: 'Russia' },
    ],
    clusterStyles: [
      {
        textColor: 'red',
        url: 'assets/markers/cluster.jpg',
        width: 20,
        height: 20
      }
    ],
    mapOptions: {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 4
    },
    mapProperties: {
      zoom: 3,
      center: { lat: 35.18944607417433, lng: -10.34824857468652 },
      mapTypeControl: false,
      zoomControl: true,
      mapTypeId: 'roadmap',
      scrollwheel: true,
      disableDoubleClickZoom: false
    }
  }


  @ViewChild('map', { static: true }) mapElement: any;
  loader = new Loader({
    apiKey: "",
    version: "weekly",
    libraries: ["places"]
  });
  

  constructor() {
    this.loader.load().then((google) => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.map_data.mapProperties);
      this.createMarkers();
    })
      .catch(e => {
      });
  }


  createMarkers() {
    this.map_data.coordinatesArray.map(marker => {
      const newMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng }
      });
      this.markers.push(newMarker)
    });
    this.createCluster();
  }



  createCluster() {
    var mcOptions = { gridSize: 40, maxZoom: 16, zoomOnClick: false, minimumClusterSize: 2, styles: this.map_data.clusterStyles };
    const markerCluster = new MarkerClusterer(this.map, this.markers, mcOptions);
    google.maps.event.addListener(markerCluster, 'clusterclick', (cluster: any) => {
      this.map.setZoom(this.map.getZoom() + 1);
    });
  }

}
