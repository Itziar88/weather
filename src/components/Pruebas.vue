<template>
    <div class="hello">
        <h1>API MetaWeather</h1>
        <input type="text">
        <button @click="search">
            Buscar
        </button>
        <ul>
            <li
                v-for="city in cities"
                :key="city.id"
            >
                {{ city }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Pruebas',
    data () {
        return {
            cities: [],
        }
    },
    methods: {
        async search () {
            try {
                const response = await axios.get('/location/search/?query=san')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
