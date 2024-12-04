import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJzaGF2c2t5IiwiYSI6ImNtNDRwcTBnMDBtcmQybHF4bmQ4ZmU5aGkifQ.IRUrgbtq7fiPTwO40MqgTQ'


export let mapbox = {}
mapbox.map = {};

mapbox.init = (data) => {
  let { center, zoom } = data;
  zoom = zoom || 7;

  if (!mapbox.boxZoom) {
    mapbox.map = new mapboxgl.Map({
      container: 'map_container', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [center[1], center[0]], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    })
  } else {
    mapbox.map.flyTo({
      center: [center[1], center[0]], // Replace with your desired coordinates
      zoom: zoom, // Optional: set a new zoom level
      speed: 1.2, // Optional: adjust speed of the animation (default is 1.2)
      curve: 1.42, // Optional: controls the "smoothness" of the animation (default is 1.42)
    })
  }
}
