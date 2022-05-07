import  { SET_CURRENT_USER } from '../actions/constants'
import isEmpty from '../validation/is-empty'

let inState = { user: {}, isAuth: false }

let reducerAuth = (state = inState, action) => {
    switch(action.type){  
        case SET_CURRENT_USER:
            return { 
                ...state,
                isAuth: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}


export default reducerAuth