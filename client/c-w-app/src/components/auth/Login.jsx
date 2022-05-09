import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { loginUser } from '../../actions/authActions.js'
import TextFieldGroup from '../common/TextFieldGroup.jsx'

class Login extends React.Component {

  constructor(){
    super();
    this.state = {
      errors : {},
      email: '',
      password: ''
    }
  }


  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
    
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const creds = {
      email: this.state.email,
      password: this.state.password
    }
    
    this.props.loginUser(creds)
  }

    render() {
      let { errors } = this.state


        return (
            <div className="container login"  style={{height:'70vh'}}>
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Register</h1>
                  <p className="lead text-center">Login to your DevConnect </p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup placeholder="Email Address" name="email" type="email" value={this.state.email} onChange={this.handleChange} error={errors.email} />
                    
                    <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handleChange} error={errors.password} />
                    
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
        )
    }
}

Login.propTypes ={
  errors: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired
}

const StateInProps = (state) => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(StateInProps, {loginUser})(Login)