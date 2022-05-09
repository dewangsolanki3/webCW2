import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profileActions.js'
import Spinner from '../common/Spinner.jsx'
import ProfileItem from './ProfileItem.jsx'

class Profiles extends React.Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  render() {
    const { profiles, loading } = this.props.profile
    let profileItems = ""

    if (profiles === null || loading) {
      profileItems = <Spinner />
    } 
    else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      } else {
        profileItems = <h3>There are no profiles...</h3>
      }
    }

    return (
      <div className="profiles" >
        <div className="container" >
          <div className="row" >
            <div className="col-md-12" >
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Search and connect with other developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const stateInProps = state => ({ profile: state.profile })

export default connect(stateInProps, { getProfiles })(Profiles)
