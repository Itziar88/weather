import axios from 'axios'

export default {
    request (method, url) {
        if (!method) {
            console.error('API function call requires method argument')
            return
        }
        if (!url) {
            console.error('API function call requires uri argument')
            return
        }
        axios({ method, url })
    },
}

// export default new axios.Create({
//     baseURL: 'https://www.metaweather.com/api',
//     searchTerm (searchTerm) {
//         return axios.get(`${this.baseURL}/location/search/?query=${searchTerm}`)
//     },
//     searchIdCity (item) {
//         return axios.get(`location/${item.woeid}`)
//     },

// })
