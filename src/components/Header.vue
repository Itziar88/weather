<template>
  <div class="hello">
    <h1>API MetaWeather</h1>
    <input type="text">
    <button @click="buscarAPI">Buscar</button>
    <ul>
      <li v-for="city in cities" :key="city"> {{ city }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Header',
  data(){
    return {
      cities: []
    }
  },
  methods:{
    buscarAPI(){
      axios.get('location/search/?query=san')
            .then((response) => {
              response.data.map(item => {
                axios.get('location/' + item.woeid)
                      .then((response) => {
                        console.log(response.data)
                      })
              })
              this.cities = response.data
            });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
