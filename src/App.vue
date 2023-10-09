<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  
  <Header />

  <RouterView />
</template>

<style>
*{
  --color-1: #212329;
  --color-2: #25282e;
}
</style>
