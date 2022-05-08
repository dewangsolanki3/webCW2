import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost, addLike, removeLike } from '../../actions/postActions.js'

class PostItem extends React.Component {
  clickDelete = (id) => {
    this.props.deletePost(id)
  }

  clickLike = (id) => {
    this.props.addLike(id);
  }

  clickUnlike = (id) => {
    this.props.removeLike(id);
  }

  searchUserLike = (likes) => {
    let { auth } = this.props;
    if (likes.filter( (like) => like.user === auth.user.id).length > 0) {
      return true
    } 
    else {
      return false
    }
  }

  render() {
    const { post, auth, showActions } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                src={post.avatar}
                className="d-none d-md-block rounded-circle "
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  className="btn-light mr-2 btn "
                  onClick={this.clickLike(post._id)}
                  type="button"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.searchUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.clickUnlike(post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.clickDelete(post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = { showActions: true }

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

let stateInProps = (state) => ({ auth: state.auth })

export default connect(stateInProps, { deletePost, addLike, removeLike })( PostItem )
