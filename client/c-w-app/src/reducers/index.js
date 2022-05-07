import { combineReducers } from 'redux'
import reducerProfile from './reducerProfile'
import reducerAuth from './reducerAuth'
import reducerPost from './reducerPost'
import reducerError from './reducerError'

export default combineReducers({
  profile: reducerProfile,
  auth: reducerAuth,
  post: reducerPost,
  errors: reducerError
})
