<template>
  <div id="app">
    <Header />
    <Pruebas />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Pruebas from './components/Pruebas.vue';

export default {
  name: 'app',
  components: {
    Header,
    Pruebas
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
