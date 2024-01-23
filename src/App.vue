<template>
  <HeaderVue />
  <RouterView />
</template>


<script>

import HeaderVue from './components/Header.vue';
import axios from 'axios';
import { useDataStore } from './stores/data';

export default {
  name: 'App',
  components: { HeaderVue },
  setup() {
    const dataStore = useDataStore();
    const { updateData } = dataStore;
    
    axios.get('https://admin.ruta.cesuct.cl/api/places.php')
    .then(response => {
      updateData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
    return{
      updateData
    }
  },
  mounted() {
    axios.get('https://admin.ruta.cesuct.cl/api/places.php')
    .then(response => {
      this.updateData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },
}

</script>


<style>
*{
  --color-1: #212329;
  --color-2: #25282e;
}
</style>
