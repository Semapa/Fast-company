import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({ options, onChange, name, label, value }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options

  const valueArray = value.map((optionName) => ({
    label: optionName.name,
    value: optionName._id
  }))

  const handleChange = (value) => {
    onChange({ name: name, value })
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multy-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        value={valueArray}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
}

export default MultiSelectField
