import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profileActions';
import SelectListGroup from '../common/SelectListGroup.jsx';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx';
import InputGroup from '../common/InputGroup.jsx';
import TextFieldGroup from '../common/TextFieldGroup.jsx';


class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      company: '',
      website: '',
      instagram: '',
      location: '',
      status: '',
      githubusername: '',
      displaySocialInputs: false,
      skills: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: '',
      handle: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let bio = {
      bio: this.state.bio,
      company: this.state.company,
      githubusername: this.state.githubusername,
      location: this.state.location,
      linkedin: this.state.linkedin,
      handle: this.state.handle,
      skills: this.state.skills,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      website: this.state.website,
      facebook: this.state.facebook,
      status: this.state.status,
      instagram: this.state.instagram
    }

    this.props.createProfile(bio, this.props.history);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let { errors, displaySocialInputs } = this.state

    let socialInputs = ""

    if (displaySocialInputs) {
      socialInputs = (
        <div>
         
          <InputGroup
            onChange={this.handleChange}
            name="facebook"
            placeholder="Facebook URL"
            value={this.state.facebook}
            icon="fab fa-facebook"
            error={errors.facebook}
          />

          <InputGroup
            value={this.state.twitter}
            onChange={this.handleChange}
            name="twitter"
            placeholder="Twitter URL"
            icon="fab fa-twitter"
            error={errors.twitter}
          />

          <InputGroup
            value={this.state.youtube}
            onChange={this.handleChange}
            name="youtube"
            placeholder="YouTube URL"
            icon="fab fa-youtube"
            error={errors.youtube}
          />


          <InputGroup
            value={this.state.linkedin}
            onChange={this.handleChange}
            name="linkedin"
            icon="fab fa-linkedin"
            placeholder="Linkedin URL"
            error={errors.linkedin}
          />


          <InputGroup
            value={this.state.instagram}
            onChange={this.handleChange}
            placeholder="Instagram URL"
            icon="fa-instagram fab "
            name="instagram"
            error={errors.instagram}
          />
        </div>
      );
    }


    let options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's make your profile visible to other developers
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  onChange={this.handleChange}
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.handleChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
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
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const stateInProps = state => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(stateInProps, { createProfile })(
  withRouter(CreateProfile)
)
