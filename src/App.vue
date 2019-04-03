<template>
    <div id="app">
        <Header
            :title="title"
            @onSearch="handleSearch"
        />
        <FilterCities
            :cities="cities"
        />
        <CitiesList
            :cities="cities"
        />
    </div>
</template>

<script>
import axios from 'axios'

import Header from './components/Header.vue'
import FilterCities from './components/FilterCities.vue'
import CitiesList from './components/CitiesList.vue'

export default {
    name: 'App',
    components: {
        Header,
        FilterCities,
        CitiesList,
    },
    data () {
        return {
            title: 'API MetaWeather',
            cities: [],
        }
    },
    methods: {
        async handleSearch (value) {
            try {
                const response = await axios.get(`/location/search/?query=${value}`)
                const getCitiesData = response.data.map(item => axios.get(`location/${item.woeid}`))
                const responseCities = await Promise.all(getCitiesData)
                this.cities = responseCities.map(responseCity => this.transformCity(responseCity.data))
            } catch (error) {
                console.error(error)
            }
        },
        transformCity (city) {
            return {
                id: city.woeid,
                name: city.title,
                temp: city.consolidated_weather[0].the_temp,
                state: city.consolidated_weather[0].weather_state_name,
                stateAbbr: city.consolidated_weather[0].weather_state_abbr,
            }
        },
    },
}
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
