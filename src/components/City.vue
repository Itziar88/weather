<template>
    <div class="hello">
        <div class="city">
            <p> {{ name }}</p>
            <p> {{ temp }}</p>
            <img
                class="imgState"
                :src="imgSvg"
                :alt="state"
            >
        </div>
    </div>
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
.city{
  margin: 10px;
  background-color: bisque;
}
.imgState{
  height: 25px;
  width: 25px;
}
</style>
