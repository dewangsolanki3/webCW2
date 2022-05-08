import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions.js'

class Experience extends React.Component {
  clickDelete(id) {
    this.props.deleteExperience(id)
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn-danger btn "
            onClick={this.clickDelete(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience details</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Role</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = { deleteExperience: PropTypes.func.isRequired }

export default connect(null, { deleteExperience })(withRouter(Experience))
