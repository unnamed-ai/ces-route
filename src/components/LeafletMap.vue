<template>
    <div id="mapContainer"></div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import "../../public/Tween.js";
  import "../../public/leaflet.curve.js";

  import { ref } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useDataStore } from '@/stores/data';

  export default {
    name: "LeafletMap",
    data() {
      const dataStore = useDataStore();
      const { data } = storeToRefs(dataStore);
      return {
        map: null,
        data
      };
    },
    methods: {
      goTo(slug){
        this.$router.push('/'+slug);
      },
      addMarker() {
       L.marker([this.lat, this.lng]).addTo(this.map);
      },
    },
    created(){
      this.$watch('$route.params.slug', (slug) => {
        let place = this.data.find((place) => place.slug === slug);
        this.map.panTo(new L.LatLng(place.lat, place.lng));
      });
    },
    mounted() {
      this.map = L.map("mapContainer").setView([-38.7404074,-72.6253507], 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      //use a mix of renderers
      var customPane = this.map.createPane("customPane");
      var canvasRenderer = L.canvas({ pane: "customPane" });
      customPane.style.zIndex = 399;

      for(let i=0; i < this.data.length; i++){
        let marker = new L.marker([this.data[i].lat, this.data[i].lng])        
        marker.addTo(this.map); 
        marker.on('click', () => {
          this.goTo(this.data[i].slug);
        });
      }
      
      
    },
    onBeforeUnmount() {
      if (this.map) {
        this.map.remove();
      }
    },
  };
  </script>
  
  <style scoped>
    #mapContainer {
      width: 100%;
      height: 100%;
    }
  </style>