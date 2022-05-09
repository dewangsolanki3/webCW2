import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx'
import { addPost } from '../../actions/postActions'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let { user } = this.props.auth

    let postData = {
      text: this.state.text,
      avatar: user.avatar,
      name: user.name
    }

    this.props.addPost(postData)
    this.setState({ text: '' })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let { errors } = this.state

    return (
      <div className="post-form mb-2">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Share your thoughts...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  value={this.state.text}
                  onChange={this.handleChange}
                  placeholder="Create a post"
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
    );
  }
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

let stateInProps = (state) => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(stateInProps, { addPost })(PostForm)
