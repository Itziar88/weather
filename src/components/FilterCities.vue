<template>
    <div>
        <!-- <b-form-fieldset :disabled="disabledFormStatus"> -->
        <b-form-fieldset :disabled="disabled">
            <b-form-group
                labelColsMd="5"
                label="Temperatura mínima: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-input
                    v-model="tempMin"
                    type="text"
                />
            </b-form-group>
            <b-form-group
                labelColsMd="5"
                label="Temperatura máxima: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-input
                    v-model="tempMax"
                    type="text"
                />
            </b-form-group>
            <b-form-group
                labelColsMd="5"
                label="Estado del tiempo: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-select
                    v-model="stateWeather"
                >
                    <option
                        default
                        value="default"
                    >
                        Selecciona un tiempo
                    </option>
                    <option
                        v-for="uniqState in stateOptions"
                        :key="uniqState"
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
import {
    mapState, mapGetters, mapActions, mapMutations,
} from 'vuex'
import { uniq } from 'lodash'

export default {
    name: 'FilterCities',

    computed: {
        ...mapState({
            loading: state => state.loading,
            cities: state => state.cities,
            filters: state => state.filters,
        }),
        stateOptions () {
            const uniqCities = uniq(this.cities.map(city => city.state))
            return uniqCities
        },
        disabled () {
            if (this.loading === true || this.cities.length === 0) {
                return true
            }
            return false
        },
        tempMin: {
            get () {
                return this.filters.tempMin
            },
            set (value) {
                this.updateFilter({ key: 'tempMin', value })
            },
        },
        tempMax: {
            get () {
                return this.filters.tempMax
            },
            set (value) {
                this.updateFilter({ key: 'tempMax', value })
            },
        },
        stateWeather: {
            get () {
                return this.filters.stateWeather
            },
            set (value) {
                this.updateFilter({ key: 'stateWeather', value })
            },
        },
    },
    methods: {
        ...mapMutations({
            updateFilter: 'updateFilter',
        }),
    },
}
</script>
