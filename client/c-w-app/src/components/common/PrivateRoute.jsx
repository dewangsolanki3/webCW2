import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({component: Component, auth: auth, ...rest}) => (
    <Route 
        {...rest}
        render = {props => auth.isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
    }
    />
)

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}

let StateInProps = (state) => ({ auth: state.auth })

export default connect(StateInProps)(PrivateRoute)
