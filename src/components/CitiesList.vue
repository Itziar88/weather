<template>
    <div class="hello">
        <ul>
            <li
                v-for="city in cities"
                :key="city.id"
            >
                {{ city }}
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'CitiesList',
    props: ['cities'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
