import React from 'react'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions.js'
import TextFieldGroup from '../common/TextFieldGroup.jsx'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      errors: {},
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  }


  
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    let bio = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2 : this.state.password2
    }

    this.props.registerUser(bio, this.props.history)

  }

    render() {

      let { errors } = this.state;

        return (
            <div className="container register">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Register</h1>
                  <p className="lead text-center">Register for your new DevConnect</p>
                  <form onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} error={errors.name} />

                  <TextFieldGroup placeholder="Email Address" name="email" type="email" value={this.state.email} onChange={this.handleChange} error={errors.email} />

                  <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} error={errors.password} />

                  <TextFieldGroup placeholder="Confirm Password" name="password2" type="password" value={this.state.password2} onChange={this.handleChange} error={errors.password2} />

                  <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

Register.propTypes = {
  errors:propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  registerUser: propTypes.func.isRequired
}

let StateInProps = (state) => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(StateInProps, { registerUser })(withRouter(Register))