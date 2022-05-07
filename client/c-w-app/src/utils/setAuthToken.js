import axios from 'axios'

let setAuthToken = (token) => {
    token ? axios.defaults.headers.common['Authorization'] = token : delete axios.defaults.headers.common['Authorization']
}

export default setAuthToken