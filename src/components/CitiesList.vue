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
            v-else-if="cities.length"
        >
            <h5><strong>Temperatura media:</strong> {{ media }} ºC</h5>
            <City
                v-for="city in cities"
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
import VueTypes from 'vue-types'
import City from './City.vue'

export default {
    name: 'CitiesList',
    components: {
        City,
    },
    props: {
        cities: VueTypes.arrayOf(VueTypes.shape({
            id: VueTypes.number.isRequired,
            name: VueTypes.string.isRequired,
            temp: VueTypes.number.def(0),
            state: VueTypes.string.def(''),
            stateAbbr: VueTypes.string.def(''),
        })).def([]),
        loading: VueTypes.bool.def(false),
    },
    computed: {
        media () {
            return this.cities.length > 0 ? (this.cities.reduce((acc, city) => acc + city.temp, 0) / this.cities.length).toFixed(2) : 'No hay media'
        },
    },
}
</script>
