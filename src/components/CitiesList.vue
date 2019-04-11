<template>
    <div>
        <b-button
            v-if="loading"
            variant="info"
            disabled
        >
            <b-spinner
                small
                type="grow"
            />
            <span> Buscando...</span>
        </b-button>
        <template
            v-else-if="filteredCities.length"
        >
            <h5><strong>Temperatura media:</strong> {{ tempAvg }} ºC</h5>
            <City
                v-for="city in filteredCities"
                :key="city.id"
                :name="city.name"
                :temp="city.temp"
                :state="city.state"
                :stateAbbr="city.stateAbbr"
            />
        </template>
        <p v-else>
            No hay ciudades seleccionadas
        </p>
    </div>
</template>

<script>
import {
    mapGetters, mapState,
} from 'vuex'
import City from './City.vue'

export default {
    name: 'CitiesList',
    components: {
        City,
    },
    computed: {
        ...mapState({
            loading: state => state.loading,
        }),
        ...mapGetters({
            filteredCities: 'filteredCities',
            tempAvg: 'tempAvg',
        }),
    },
}
</script>
