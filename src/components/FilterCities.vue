<template>
    <div>
        <b-form-fieldset :disabled="disabledFormStatus">
            <b-form-group
                labelColsMd="5"
                label="Temperatura mínima: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-input
                    v-model="filters.tempMin"
                    type="text"
                    @keyup="handleFilters"
                />
            </b-form-group>
            <b-form-group
                labelColsMd="5"
                label="Temperatura máxima: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-input
                    v-model="filters.tempMax"
                    type="text"
                    @keyup="handleFilters"
                />
            </b-form-group>
            <b-form-group
                labelColsMd="5"
                label="Estado del tiempo: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-select
                    v-model="filters.state"
                    @change="handleFilters"
                >
                    <option
                        default
                        value="default"
                    >
                        Selecciona un tiempo
                    </option>
                    <option
                        v-for="uniqState in stateOptions"
                        :key="uniqState.id"
                        :value="uniqState"
                    >
                        {{ uniqState }}
                    </option>
                </b-form-select>
            </b-form-group>
        </b-form-fieldset>
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
        disabledFormStatus: VueTypes.bool.def(true),
    },
    data () {
        return {
            filters: {
                state: 'default',
                tempMin: null,
                tempMax: null,
            },
        }
    },
    computed: {
        stateOptions () {
            const uniqCities = uniq(this.cities.map(city => city.state))
            return uniqCities
        },
    },
    methods: {
        handleFilters () {
            this.$emit('onFilter', this.filters)
        },
        reset () {
            this.filters = { state: 'default', tempMin: null, tempMax: null }
            return this.filters
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
