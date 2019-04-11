import Vue from 'vue'
import Vuex from 'vuex'

// import actions from '@/store/actions'
// import getters from '@/store/getters'
// import mutations from '@/store/mutations'

Vue.use(Vuex)
export default {
    store: new Vuex.Store({
        state: {
            filters: {
                tempMin: null,
                tempMax: null,
                stateWeather: '',
            },
            loading: false,
            cities: [],
        },
        actions: {

        },
        getters: {
            updateFilters: (state, payload) => {
                state.filters = payload
            },
        },
        mutations: {

        },
    }),
}
