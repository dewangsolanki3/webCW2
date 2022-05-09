import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import isEmpty from '../../validation/is-empty'
import InputGroup from '../common/InputGroup.jsx'
import TextFieldGroup from '../common/TextFieldGroup.jsx'
import { createProfile, getCurrentProfile } from '../../actions/profileActions.js'
import SelectListGroup from '../common/SelectListGroup.jsx'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx'


class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      company: '',
      instagram: '',
      skills: '',
      twitter: '',
      website: '',
      youtube: '',
      handle: '',
      location: '',
      status: '',
      githubusername: '',
      facebook: '',
      bio: '',
      linkedin: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile) {
      let profile = nextProps.profile.profile

      let skillsCSV = profile.skills.join(',')

      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''


      this.setState({
        bio: profile.bio,
        handle: profile.handle,
        instagram: profile.instagram,
        website: profile.website,
        status: profile.status,
        linkedin: profile.linkedin,
        skills: skillsCSV,
        youtube: profile.youtube,
        company: profile.company,
        location: profile.location,
        githubusername: profile.githubusername,
        twitter: profile.twitter,
        facebook: profile.facebook
      })
    }
  }

  onSubmit(event) {
    event.preventDefault()

    let bio = {
      bio: this.state.bio,
      location: this.state.location,
      company: this.state.company,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      website: this.state.website,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      handle: this.state.handle,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
    }

    this.props.createProfile(bio, this.props.history)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs = ""

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            onChange={this.handleChange}
            value={this.state.twitter}
            placeholder="Twitter Profile URL"
            icon="fab fa-twitter"
            name="twitter"
            error={errors.twitter}
          />
        
          
          <InputGroup
            onChange={this.handleChange}
            value={this.state.linkedin}
            placeholder="Linkedin Profile URL"
            icon="fab fa-linkedin"
            name="linkedin"
            error={errors.linkedin}
          />


          <InputGroup
            onChange={this.handleChange}
            value={this.state.facebook}
            name="facebook"
            icon="fab fa-facebook"
            placeholder="Facebook Page URL"
            error={errors.facebook}
          />

          <InputGroup
            onChange={this.handleChange}
            placeholder="Instagram Page URL"
            value={this.state.instagram}
            name="instagram"
            icon="fab fa-instagram"
            error={errors.instagram}
          />


          <InputGroup
            onChange={this.handleChange}
            name="youtube"
            value={this.state.youtube}
            placeholder="YouTube Channel URL"
            icon="fab fa-youtube"
            error={errors.youtube}
          />

         
        </div>
      );
    }

    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  onChange={this.handleChange}
                  placeholder="* Handle Profile"
                  value={this.state.handle}
                  name="handle"
                  info="A special handle for your account (example - full name, nickname, company's name)"
                  error={errors.handle}
                />
                <SelectListGroup
                  value={this.state.status}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="Status"
                  name="status"
                  info="Your career status of where you are"
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Your work Company or your own"
                />
                <TextFieldGroup
                  value={this.state.website}
                  onChange={this.handleChange}
                  placeholder="Website"
                  name="website"
                  error={errors.website}
                  info="Add any personal website or Company's"
                />
                <TextFieldGroup
                  value={this.state.location}
                  onChange={this.handleChange}
                  placeholder="Location"
                  name="location"
                  error={errors.location}
                  info="Town / State (example - Guildford, Surrey)"
                />
                <TextFieldGroup
                  value={this.state.skills}
                  onChange={this.handleChange}
                  placeholder="* Skills"
                  name="skills"
                  error={errors.skills}
                  info="Add only comma separated texts (example - 
                    Java, HTML,JavaScript,Python"
                />
                <TextFieldGroup
                  value={this.state.githubusername}
                  onChange={this.handleChange}
                  placeholder="Github Username"
                  name="githubusername"
                  error={errors.githubusername}
                  info="Add your username to display your top gibhub repositories"
                />
                <TextAreaFieldGroup
                  value={this.state.bio}
                  onChange={this.handleChange}
                  name="bio"
                  placeholder="Short Bio"
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState( (prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    type="button"
                  >
                    Input Social Media urls
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const stateInProps = (state) => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(stateInProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
)
