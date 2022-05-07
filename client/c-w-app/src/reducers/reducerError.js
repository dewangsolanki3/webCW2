import { GET_ERRORS } from '../actions/constants'

let inState = {}

let reducerError = (state = inState, action) => {
    switch(action.type){  
        case GET_ERRORS: 
        return action.payload
        default:
            return state
    }
}

export default reducerError