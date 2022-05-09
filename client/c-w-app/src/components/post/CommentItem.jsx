import React from 'react'
import { deleteComment } from '../../actions/postActions.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class CommentItem extends React.Component {
  clickDelete = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  }

  render() {
    let { comment, postId, auth } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.clickDelete(postId, comment._id)}
                type="button"
                className="btn-danger mr-2 btn "
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

let stateInProps = (state) => ({ auth: state.auth })

export default connect(stateInProps, { deleteComment })(CommentItem)
