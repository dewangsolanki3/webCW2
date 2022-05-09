import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import propTypes from "prop-types"
import Experience from './Experience.jsx';
import ProfileActions from './ProfileActions.jsx';
import Education from './Education.jsx';
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions.js"
import Spinner from '../common/Spinner.jsx'


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  clickDelete = (event) => {
    this.props.deleteAccount()
  }

  render() {
    let { profile, loading } = this.props.profile
    let { user } = this.props.auth

    let dashBoardContent = ""

    if(loading || profile === null ){
      dashBoardContent = <Spinner />
    } 
    else {
      if(Object.keys(profile).length > 0){
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{marginBottom: '55px'}} />
            <button onClick={this.clickDelete} className="btn btn-danger">Delete Profile</button>
          </div>

        )
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>No profile found, please provide information</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Account</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propType = {
  profile: propTypes.object.isRequired,
  getCurrentProfile: propTypes.func.isRequired,
  deleteAccount: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

let stateInProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(stateInProps, { getCurrentProfile, deleteAccount })(Dashboard)
