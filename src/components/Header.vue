<template>
    <div>
        <h1>{{ title }}</h1>
        <b-input-group>
            <b-form-input
                v-model="inputCity"
                type="text"
                @keyup.enter="handleSubmit"
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
        handleSubmit () {
            this.$emit('onSearch', this.inputCity)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
