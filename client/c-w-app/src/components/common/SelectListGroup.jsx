import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="form-group">
      <select
        onChange={onChange}
        className={classnames('form-control-lg form-control ', { 'is-invalid': error })}
        name={name}
        value={value}
      >
        {selectOptions}
      </select>
      {info && <small className="text-muted form-text ">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectListGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
}

export default SelectListGroup
