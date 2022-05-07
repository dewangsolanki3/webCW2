import { combineReducers } from 'redux'
import reducerProfile from './reducerProfile.js'
import reducerAuth from './reducerAuth.js'
import reducerPost from './reducerPost.js'
import reducerError from './reducerError.js'

export default combineReducers({
  profile: reducerProfile,
  auth: reducerAuth,
  post: reducerPost,
  errors: reducerError
})
