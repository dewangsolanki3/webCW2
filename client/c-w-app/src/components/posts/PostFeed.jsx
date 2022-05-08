import React from 'react'
import PostItem from './PostItem.jsx'
import PropTypes from 'prop-types'

class PostFeed extends React.Component {
  
  render() {
    let { posts } = this.props

    return posts.map(post => <PostItem post={post} key={post._id}/>)
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed
