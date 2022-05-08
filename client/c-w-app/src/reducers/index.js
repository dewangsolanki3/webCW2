import { combineReducers } from 'redux'
import reducerError from './reducerError.js'
import reducerAuth from './reducerAuth.js'
import reducerPost from './reducerPost.js'
import reducerProfile from './reducerProfile.js'

export default combineReducers({
  errors: reducerError,
  profile: reducerProfile,
  post: reducerPost,
  auth: reducerAuth
})
