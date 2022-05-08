import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem.jsx'

class CommentFeed extends React.Component {
  render() {
    let { comments, postId } = this.props

    return comments.map(text => (
      <CommentItem comment={text} key={text._id} postId={postId} />
    ))
  }
}

CommentFeed.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
}

export default CommentFeed
