import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions.js'
import PostFeed from './PostFeed.jsx'
import PostForm from './PostForm.jsx'
import Spinner from '../common/Spinner.jsx'

class Posts extends React.Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    let { posts, loading } = this.props.post
    let postContent = ""

    if ( loading || posts === null ) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

let stateInProps = (state) => ({ post: state.post })

export default connect(stateInProps, { getPosts })(Posts)
