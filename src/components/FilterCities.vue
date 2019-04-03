<template>
    <div class="hello">
        <h2>FilterCities</h2>
        <form>
            <label>Temperatura mínima:</label>
            <input type="text">
            <label>Temperatura máxima:</label>
            <input type="text">
            <label>Estado del tiempo: </label>
            <select v-model="selected">
                <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.state"
                >
                    {{ city.state }}
                </option>
            </select>
            <p>Selected: {{ selected }}</p>
        </form>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { uniq } from 'lodash'

export default {
    name: 'FilterCities',
    props: {
        cities: VueTypes.arrayOf(VueTypes.shape({
            id: VueTypes.number.isRequired,
            name: VueTypes.string.isRequired,
            temp: VueTypes.number.def(0),
            state: VueTypes.string.def(''),
            stateAbbr: VueTypes.string.def(''),
        })).def([]),
    },
    data () {
        return {
            selected: '',
        }
    },
    computed: {
        stateOptions () {
            const uniqCities = uniq[this.cities]
            return uniqCities
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
