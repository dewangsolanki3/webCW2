import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx';

class AddExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      company: '',
      title: '',
      description: '',
      location: '',
      current: false,
      errors: {},
      disabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  onSubmit = (event) => {
    event.preventDefault()

    const workBio = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addExperience(workBio, this.props.history)
  }


  onCheck = (event) => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="text-center lead ">
                Enter any prior or current work experience 
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                />
                <h5>From Date</h5>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleChange}
                  error={errors.from}
                />
                <h5>To Date</h5>
                <TextFieldGroup
                  type="date"
                  name="to"
                  onChange={this.handleChange}
                  value={this.state.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                  error={errors.to}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    id="current"
                    name="current"
                    className="form-check-input"
                    checked={this.state.current}
                    value={this.state.current}
                    onChange={this.onCheck}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Job Description"
                  error={errors.description}
                  value={this.state.description}
                  info="Elaborate on your job role"
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

let StateInProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(StateInProps, { addExperience })(
  withRouter(AddExperience)
)
