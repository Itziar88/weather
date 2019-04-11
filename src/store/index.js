import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const initialState = {
    filters: {
        tempMin: null,
        tempMax: null,
        stateWeather: 'default',
    },
    loading: false,
    cities: [],
}

const transformCity = city => ({
    id: city.woeid,
    name: city.title,
    temp: city.consolidated_weather[0].the_temp,
    state: city.consolidated_weather[0].weather_state_name,
    stateAbbr: city.consolidated_weather[0].weather_state_abbr,
})

export default new Vuex.Store({
    state: { ...initialState },
    actions: {
        async search ({ commit }, searchTerm) {
            commit('cleanFilters')
            commit('cleanCities')
            commit('setLoading')
            const response = await axios.get(`/location/search/?query=${searchTerm}`)
            const getCitiesData = response.data.map(item => axios.get(`location/${item.woeid}`))
            const responseCities = await Promise.all(getCitiesData)
            const cities = responseCities.map(responseCity => transformCity(responseCity.data))
            commit('setCities', cities)
            commit('unsetLoading')
        },
    },
    getters: {
        filteredCities: state => state.cities.filter(city => (
            (!state.filters.tempMin || city.temp >= state.filters.tempMin) &&
                (!state.filters.tempMax || city.temp < state.filters.tempMax) &&
                (state.filters.stateWeather === 'default' || city.state === state.filters.stateWeather))),
        tempAvg: state => (state.cities.length > 0 ? (state.cities.reduce((acc, city) => acc + city.temp, 0) / state.cities.length).toFixed(2) : 'No hay media'),
    },
    mutations: {
        cleanCities: (state) => {
            state.cities = [...initialState.cities]
        },
        setCities: (state, cities) => {
            state.cities = [...cities]
        },
        cleanFilters: (state) => {
            state.filters = { ...initialState.filters }
        },
        updateFilter: (state, { key, value }) => {
            if (state.filters[key] !== undefined) {
                state.filters = { ...state.filters, [key]: value }
            }
        },
        setLoading: (state) => {
            state.loading = true
        },
        unsetLoading: (state) => {
            state.loading = false
        },
    },
})
