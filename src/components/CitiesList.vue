<template>
    <div class="hello">
        <ul v-if="cities.length">
            <li
                v-for="city in cities"
                :key="city.id"
            >
                {{ city }}
            </li>
        </ul>
        <p v-else>
            No hay ciudades
        </p>
    </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'CitiesList',
    props: {
        cities: VueTypes.arrayOf(VueTypes.shape({
            id: VueTypes.number.isRequired,
            name: VueTypes.string.isRequired,
            temp: VueTypes.number.def(0),
            state: VueTypes.string.def(''),
            stateAbbr: VueTypes.string.def(''),
        })).def([]),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
