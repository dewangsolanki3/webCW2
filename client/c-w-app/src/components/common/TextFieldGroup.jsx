import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

const TextFieldGroup = ({
    info,
    placeholder,
    name,
    value,
    type,
    onChange,
    error,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={type} onChange={onChange} className={classnames('form-control-lg form-control ', { 'is-invalid': error })} value={value} name={name} disabled={disabled} placeholder={placeholder}  />
            {info && <small className="text-muted form-text ">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}


TextFieldGroup.prototype = {
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    disabled: propTypes.string,
    type: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string
}

TextFieldGroup.defaultProps = { type: 'text' }

export default TextFieldGroup