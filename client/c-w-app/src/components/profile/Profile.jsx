import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../../actions/profileActions.js'
import ProfileCreds from './ProfileCreds.jsx'
import ProfileGithub from './ProfileGithub.jsx'
import ProfileHeader from './ProfileHeader.jsx'
import ProfileAbout from './ProfileAbout.jsx'
import Spinner from '../common/Spinner.jsx'

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found')
    }
  }

  render() {
    let { profile, loading } = this.props.profile
    let profileContent = ""

    if (  loading || profile === null) {
      profileContent = <Spinner />;
    } 
    else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

const stateInProps = state => ({ profile: state.profile })

export default connect(stateInProps, { getProfileByHandle })(Profile)
