<template>
  <div id="app">
    <RCHeader></RCHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import RCHeader from './components/RCHeader';
import Loader from './components/Loader';
import config from './../../shared/config';

export default {
  name: 'app',
  components: {
    RCHeader,
    Loader,
  },
  created() {
    axios.defaults.baseURL = config.URL_API;
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
