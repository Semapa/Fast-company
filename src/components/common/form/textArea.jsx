import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ name, onChange, label, rowCount = '5', error, value }) => {
  console.log(name)
  const handleChange = ({ target }) => {
    console.log('target', target)
    onChange({ name: target.name, value: target.value })
  }

  const getAreaClasses = () => {
    return 'form-control mb-4' + (error ? ' is-invalid' : '')
  }
  return (
    <>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        {label}
      </label>
      <textarea
        onChange={handleChange}
        className={getAreaClasses()}
        id="exampleFormControlTextarea1"
        rows={rowCount}
        name={name}
        value={value}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

TextArea.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  rowCount: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string
}

export default TextArea
