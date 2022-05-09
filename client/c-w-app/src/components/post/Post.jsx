import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentFeed from './CommentFeed.jsx'
import { connect } from 'react-redux'
import PostItem from '../posts/PostItem.jsx'
import Spinner from '../common/Spinner.jsx'
import CommentForm from './CommentForm.jsx'
import { getPost } from '../../actions/postActions.js'

class Post extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    let { post, loading } = this.props.post
    let postContent = ""

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

let stateInProps = (state) => ({
  post: state.post
})

export default connect(stateInProps, { getPost })(Post)
