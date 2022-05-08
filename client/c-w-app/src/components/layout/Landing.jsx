import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Landing extends React.Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/dashboard')
        }
    }

      
    render() {
        return (
            <div className="landing" >
                <div className="dark-overlay landing-inner text-light" >
                    <div className="container" >
                        <div className="row">
                            <div className="col-md-12 text-center" style = {{marginTop : "80px"}}>
                                <h1 className="display-3 mb-4">Get Connect
                                </h1>
                                <p className="lead"> Share posts, Connect with other Developers, View their work and much more ...</p>
                                <Link to="/login" className="btn btn-lg btn-light mr-2">Login</Link>
                                <Link to="/register" className="btn btn-lg btn-info">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Landing.propTypes = {
    auth: propTypes.object.isRequired
}
  
const stateInProps = state => ({
    auth: state.auth
})
  
export default connect(stateInProps)(Landing)
