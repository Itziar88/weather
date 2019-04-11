<template>
    <b-container
        id="app"
    >
        <b-row alignH="center">
            <Header
                class="header"
            />
        </b-row>
        <b-row>
            <b-col
                md="6"
                class="filteredCities"
            >
                <FilterCities />
            </b-col>
            <b-col
                md="6"
                class="listedCities"
            >
                <CitiesList />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import { Header, FilterCities, CitiesList } from '@/components'

export default {
    name: 'App',
    components: {
        Header,
        FilterCities,
        CitiesList,
    },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header, .filteredCities, .listedCities {
    box-sizing: border-box;
    margin: 20px auto;

}
</style>
