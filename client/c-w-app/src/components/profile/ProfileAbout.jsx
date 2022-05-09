import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends React.Component {
  render() {
    let { profile } = this.props

    let firstName = profile.user.name.trim().split(' ')[0]

    let skills = profile.skills.map((skill, i) => (
      <div key={i} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ))

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} has no bio yet</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <br /> <hr />
            <h2 className="text-center text-info">Skills</h2>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
