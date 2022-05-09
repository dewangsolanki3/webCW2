import React from "react"
import { Link } from "react-router-dom"
import propTypes from "prop-types"
import { connect } from "react-redux"
import { clearCurrentProfile } from "../../actions/profileActions.js"
import { logoutUser } from "../../actions/authActions.js"


class Navbar extends React.Component {
  clickLogout = (event) => {
    event.preventDefault()
    this.props.logoutUser()
    this.props.clearCurrentProfile()
  }

  render() {
    let { isAuthenticated, user } = this.props.auth

    let authLinks = (
      <ul className = "ml-auto navbar-nav ">
        <li className="nav-item">
          <Link to="/feed" className="nav-link">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={this.clickLogout}
            className="nav-link"
            to="#"
          >
            <img
              className="rounded-circle"
              title="you must have a Gravatar connected"
              src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300"
              alt={user.name}
              style={{ width: "35px", marginRight: "10px", height: "30px" }}
            />
            Logout
          </Link>
        </li>
      </ul>
    )

    let guestLinks = (
      <ul className="navbar-nav ml-auto">
       
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      
      </ul>
    )

    return (
      <>
        <nav style = {{ position: "relative", zIndex: 10 , width: "100%"}} className="mb-4 navbar navbar-dark bg-dark navbar-expand-sm">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevHub
            </Link>
            <button
              className="navbar-toggler"
              data-target="#mobile-nav"
              type="button"
              data-toggle="collapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </>
    )
  }
}

Navbar.propType = {
  auth: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired
}
const stateInProps = state => ({
  auth: state.auth
})

export default connect(stateInProps, { logoutUser, clearCurrentProfile })( Navbar )
