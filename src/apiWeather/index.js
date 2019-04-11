// import axios

// create axios with base url weather..
// const api = new axios({options})

// export un objeto con dos valores que son dos funciones getCities getCity con lo parametros correspondientes
// export default {
//     getCities: (searchTerm) => api.get(`/location/search/?query=${searchTerm}`)
// }
import axios from 'axios'

axios.create({
    baseURL: 'https://www.metaweather.com/',
})

const api = new axios({

})

// función para buscar ciudades
// api.get(`api/location/search/?query=${searchTerm}`)

// función para buscar ciudad
// api.get(`api/location/${item.woeid}`)

// función para buscar la imagen del estado del tiempo
// api.get(`static/img/weather/${stateAbbr}.svg`)
