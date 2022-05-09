import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextAreaFieldGroup = ({
  value,
  name,
  placeholder,
  info,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames(' form-control-lg form-control', {
          'is-invalid': error
        })}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string
}

export default TextAreaFieldGroup
