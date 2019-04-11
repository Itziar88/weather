<template>
    <b-container
        id="app"
    >
        <b-row alignH="center">
            <Header
                class="header"
                @onSearch="search"
            />
        </b-row>
        <b-row>
            <b-col
                md="6"
                class="filteredCities"
            >
                <FilterCities
                    ref="filters"
                    :cities="cities"
                    :disabledFormStatus="disabledFormStatus"
                    @onFilter="handleFilters"
                />
            </b-col>
            <b-col
                md="6"
                class="listedCities"
            >
                <CitiesList
                    :cities="filteredCities"
                    :loading="loading"
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import {
    mapState, mapGetters, mapActions, mapMutations,
} from 'vuex'

import { Header, FilterCities, CitiesList } from '@/components'

export default {
    name: 'App',
    components: {
        Header,
        FilterCities,
        CitiesList,
    },
    computed: {
        ...mapState({
            loading: state => state.loading,
        }),
        ...mapGetters({
            filteredCities: 'filteredCities',
        }),
    },
    methods: {
        ...mapActions({
            search: 'search',
        }),
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
