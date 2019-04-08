<template>
    <div>
        <h1>{{ title }}</h1>
        <b-input-group>
            <b-form-input
                v-model="inputCity"
                type="text"
                @keyup="handleSubmit"
            />
            <b-input-group-append>
                <b-button @click="handleSubmit">
                    Buscar
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import { debounce } from 'lodash'

export default {
    name: 'Header',
    props: {
        title: VueTypes.string.def(''),
    },
    data () {
        return {
            inputCity: '',
        }
    },
    methods: {
        handleSubmit: debounce(function submitDebounced () {
            this.$emit('onSearch', this.inputCity)
        }, 1000),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
