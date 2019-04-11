<template>
    <b-container
        id="app"
    >
        <b-row alignH="center">
            <Header
                class="header"
                @onSearch="handleSearch"
            />
        </b-row>
        <b-row>
            <b-col
                md="6"
                class="filteredCities"
            >
                <FilterCities
                    ref="filters"
                    :cities="cities"
                    :disabledFormStatus="disabledFormStatus"
                    @onFilter="handleFilters"
                />
            </b-col>
            <b-col
                md="6"
                class="listedCities"
            >
                <CitiesList
                    :cities="filteredCities"
                    :loading="loading"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'

import { Header, FilterCities, CitiesList } from '@/components'

export default {
    name: 'App',
    components: {
        Header,
        FilterCities,
        CitiesList,
    },
    data () {
        return {
            cities: [],
            filteredCities: [],
            loading: false,
            disabledFormStatus: true,
        }
    },
    methods: {
        async handleSearch (value) {
            if (value === '') {
                this.cities = []
                this.filteredCities = []
                this.disabledFormStatus = true
            } else {
                try {
                    this.$refs.filters.reset()
                    this.loading = true
                    this.filteredCities = []
                    this.cities = []
                    this.disabledFormStatus = true
                    const response = await axios.get(`/location/search/?query=${value}`)
                    const getCitiesData = response.data.map(item => axios.get(`location/${item.woeid}`))
                    const responseCities = await Promise.all(getCitiesData)
                    this.cities = responseCities.map(responseCity => this.transformCity(responseCity.data))
                    if (this.cities.length !== 0) {
                        this.filteredCities = this.cities
                        this.disabledFormStatus = false
                    }
                    this.loading = false
                } catch (error) {
                    this.loading = false
                    this.disabledFormStatus = false
                    console.error(error)
                }
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
