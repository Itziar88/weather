<template>
    <div class="hello">
        <h1>{{ title }}</h1>
        <input type="text">
        <button @click="handleSubmit">
            Buscar
        </button>
    </div>
</template>

<script>

export default {
    name: 'Header',
    props: ['title'],
    data () {
        return {
        }
    },
    methods: {
        handleSubmit () {
            this.$emit('searchingCities')
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
