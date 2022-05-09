import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup.jsx'
import TextFieldGroup from '../common/TextFieldGroup.jsx'
import { addEducation } from '../../actions/profileActions.js'


class AddEducation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fieldofstudy: '',
      degree: '',
      school: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    let bio = {
      fieldofstudy: this.state.fieldofstudy,
      degree: this.state.degree,
      school: this.state.school,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addEducation(bio, this.props.history)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onCheck = (event) => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    })
  }

  render() {
    let { errors } = this.state

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="m-auto col-md-8 ">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="text-center lead ">
                Enter bootcamp, seminar, you attend in past
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  onChange={this.handleChange}
                  name="school"
                  value={this.state.school}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree "
                  onChange={this.handleChange}
                  name="degree"
                  error={errors.degree}
                  value={this.state.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  onChange={this.handleChange}
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
                />
                <h5>From Date</h5>
                <TextFieldGroup
                  name="from"
                  onChange={this.handleChange}
                  type="date"
                  error={errors.from}
                  value={this.state.from}
                />
                <h5>To Date</h5>
                <TextFieldGroup
                  name="to"
                  onChange={this.handleChange}
                  type="date"
                  value={this.state.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                  error={errors.to}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    onChange={this.onCheck}
                    name="current"
                    value={this.state.current}
                    className="form-check-input"
                    checked={this.state.current}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Currently Studying
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  info="Tell us about the program that you were in"
                  value={this.state.description}
                  onChange={this.handleChange}
                  name="description"
                  error={errors.description}
                />
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
)
