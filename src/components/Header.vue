<template>
    <header class="py-3">
      <div>
        <RouterLink to="/">
          <img :src="logo" alt="Vue logo" class="logo"/>
        </RouterLink>
       
      </div>
    </header>
</template>

<script>
import { ref } from 'vue';
import logo from '@/assets/logo-white.png';
import { RouterLink } from 'vue-router';

export default {
  name: 'Header',
  setup() {
    return {
      logo
    }
  },
  methods: {}
}
</script>

<style scoped>

header{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #25282e;
    height: 55px;
    background-color: #212329;
    color: white;
}
.logo {
  height: 30px;
  filter: hue-rotate(100deg) !important;
}
</style>