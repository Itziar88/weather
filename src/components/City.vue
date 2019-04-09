<template>
    <b-card
        class="City"
        :imgSrc="imgSvg"
        :imgAlt="state"
        imgBottom
        :title="name"
        :subTitle="temp.toFixed(2) + ' ºC'"
    />
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'City',
    props: {
        name: VueTypes.string.isRequired,
        temp: VueTypes.number.def(0),
        state: VueTypes.string.def(''),
        stateAbbr: VueTypes.string.def(''),
    },
    computed: {
        imgSvg () {
            return `https://www.metaweather.com/static/img/weather/${this.stateAbbr}.svg`
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.City {
    margin: 10px;
    padding: 0.5rem;
    img {
        width: 15%;
        margin: 0 auto 10px;
    }
}
</style>
