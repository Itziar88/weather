<template>
    <div>
        <b-form-fieldset :disabled="disabled">
            <b-form-group
                labelColsMd="5"
                label="Temperatura mínima: "
                labelAlign="right"
                labelSize="lg"
            >
                <b-form-input
                    v-model="filters.tempMin"
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
                    v-model="filters.tempMax"
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
                    v-model="filters.weatherState"
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
import { uniq } from 'lodash'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'FilterCities',

    computed: {
        ...mapState ({
            loading: state => state.loading,
            cities: state => state.cities,
            filters: state => state.filters
        }),
        stateOptions () {
            const uniqCities = uniq(this.cities.map(city => city.state))
            return uniqCities
        },
        disabled () {
            if(this.loading === true || this.cities.length === 0){
                return true
            }
            return false
        },
        tempMin: {
            get() {
                return this.filters.tempMin
            },
            set (value) {
                this.updateFilter ({ key: 'tempMin', value })
            }
        },
        tempMax: {
            get() {
                return this.filters.tempMax
            },
            set (value) {
                this.updateFilter ({ key: 'tempMax', value })
            }
        },
        weatherState: {
            get() {
                return this.filters.weatherState
            },
            set (value) {
                this.updateFilter ({ key: 'weatherState', value })
            }
        }
    },
    methods: {
        ...mapMutations({
            updateFilter: 'updateFilter'
        })
    },
}
</script>
