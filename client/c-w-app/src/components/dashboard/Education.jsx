import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions.js'

class Education extends React.Component {
  clickDelete = (id) => {
    this.props.deleteEducation(id)
  }

  render() {
    let education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn-danger btn "
            onClick={ () => this.clickDelete(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
    return (
      <>
        <h3 className="mb-4">Education details</h3>
        <table className="table">
          <thead>
            <tr>
              <th>College</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </>
    )
  }
}

Education.propTypes = { deleteEducation: PropTypes.func.isRequired }

export default connect(null, { deleteEducation })(Education);
