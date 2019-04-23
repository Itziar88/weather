import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'

Vue.use(Vuex)

const initialState = {
    loading: false,
    cities: [],
    filters: {
        tempMin: null,
        tempMax: null,
        weatherState: 'default',
    },
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
            if (searchTerm !== undefined && searchTerm !== '') {
                commit('cleanFilters')
                commit('cleanCities')
                commit('setLoading')
                const response = await api.request('get', `https://www.metaweather.com/api/location/search/?query=${searchTerm}`)
                const getCitiesData = response.data.map(item => api.request('get', `https://www.metaweather.com/api/location/${item.woeid}`))
                const responseCities = await Promise.all(getCitiesData)
                const cities = responseCities.map(responseCity => transformCity(responseCity.data))
                commit('setCities', cities)
                commit('unsetLoading')
            } else {
                commit('cleanCities')
            }
        },
    },
    mutations: {
        setCities: (state, cities) => {
            state.cities = [...cities]
        },
        cleanCities: (state) => {
            state.cities = [...initialState.cities]
        },
        cleanFilters: (state) => {
            state.filters = { ...initialState.filters }
        },
        setLoading: (state) => {
            state.loading = true
        },
        unsetLoading: (state) => {
            state.loading = false
        },
        updateFilter: (state, { key, value }) => {
            if (state.filters[key] !== undefined) {
                state.filters = { ...state.filters, [key]: value }
            }
        },
    },

    getters: {
        filteredCities: state => state.cities.filter(city => (
            (!state.filters.tempMin || city.temp >= state.filters.tempMin) &&
            (!state.filters.tempMax || city.temp < state.filters.tempMax) &&
            (state.filters.weatherState === 'default' || city.state === state.filters.weatherState))),
        tempAverage: state => (state.cities.length > 0 ? (state.cities.reduce((acc, city) => acc + city.temp, 0) / state.cities.length).toFixed(2) : 'No hay media'),
    },
})
