<template>
    <div>
        <h1>API MetaWeather</h1>
        <b-input-group>
            <b-form-input
                v-model="inputCity"
                type="text"
                @keyup="handleSubmit"
            />
            <b-input-group-append>
                <b-button
                    variant="info"
                    @click="handleSubmit"
                >
                    Buscar
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import {
    mapActions,
} from 'vuex'

export default {
    name: 'Header',
    data () {
        return {
            inputCity: '',
        }
    },
    methods: {
        ...mapActions({
            search: 'search',
        }),
        handleSubmit: debounce(function submitDebounced () {
            this.search(this.inputCity)
        }, 1000),
    },
}
</script>
