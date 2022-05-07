import { GET_POST, GET_POSTS, ADD_POST, POST_LOADING, DELETE_POST } from '../actions/constants';

let inState = { loading: false, post: {}, posts: [] }

let reducerPost = (state = inState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    default:
      return state
  }
}


export default reducerPost
