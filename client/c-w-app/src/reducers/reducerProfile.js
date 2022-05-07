import { PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, GET_PROFILE } from "../actions/constants"

let inState = { loading: false, profiles: null, profile: null }

let reducerProfile = (state = inState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    default:
      return state
  }
}



export default reducerProfile
