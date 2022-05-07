import  { SET_CURRENT_USER } from '../actions/constants'
import isEmpty from '../validation/is-empty'

const initialState = { user: {}, isAuth: false }

export default (state= initialState, action) => {
    switch(action.type){  
        case SET_CURRENT_USER:
            return { 
                ...state,
                user: action.payload,
                isAuth: !isEmpty(action.payload)
            }
        default:
            return state
    }
}