import React from 'react'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/postActions.js'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx'
import { connect } from 'react-redux'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      text: ''
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit = (event) => {
    event.preventDefault()

    let { user } = this.props.auth
    let { postId } = this.props

    let newComment = {
      name: user.name,
      text: this.state.text
    }

    this.props.addComment(postId, newComment);
    this.setState({ text: '' })
  }
  

  render() {
    let { errors } = this.state

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Post your comment ...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  value={this.state.text}
                  placeholder="Reply"
                  onChange={this.handleChange}
                  name="text"
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const stateInProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(stateInProps, { addComment })(CommentForm)
