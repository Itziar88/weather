<template>
    <div class="hello">
        <h1>{{ title }}</h1>
        <input
            v-model="inputCity"
            type="text"
            @keyup.enter="handleSubmit"
        >
        <button @click="handleSubmit">
            Buscar
        </button>
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
