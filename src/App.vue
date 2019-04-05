<template>
    <b-container
        id="app"
    >
        <b-row alignH="center">
            <Header
                :title="title"
                class="header"
                @onSearch="handleSearch"
            />
        </b-row>
        <b-row>
            <b-col
                md="6"
                class="filteredCities"
            >
                <FilterCities3
                    ref="filters"
                    :cities="cities"
                    @onFilter="handleFilters"
                />
            </b-col>
            <b-col
                md="6"
                class="listedCities"
            >
                <CitiesList
                    :cities="filteredCities"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

import Header from './components/Header.vue'
import FilterCities3 from './components/FilterCities3.vue'
import CitiesList from './components/CitiesList.vue'

export default {
    name: 'App',
    components: {
        Header,
        FilterCities3,
        CitiesList,
    },
    data () {
        return {
            title: 'API MetaWeather',
            cities: [],
            filteredCities: [],
        }
    },
    methods: {
        async handleSearch (value) {
            this.$refs.filters.reset()
            try {
                const response = await axios.get(`/location/search/?query=${value}`)
                const getCitiesData = response.data.map(item => axios.get(`location/${item.woeid}`))
                const responseCities = await Promise.all(getCitiesData)
                this.cities = responseCities.map(responseCity => this.transformCity(responseCity.data))
            } catch (error) {
                console.error(error)
            }
            this.filteredCities = this.cities
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
        handleFilters (filters) {
            this.filteredCities = this.cities.filter(city => (
                (!filters.tempMin || city.temp >= filters.tempMin) &&
                (!filters.tempMax || city.temp < filters.tempMax) &&
                (filters.state === 'default' || city.state === filters.state)))
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
.header, .filteredCities, .listedCities {
    box-sizing: border-box;
    margin: 20px auto;

}
</style>
