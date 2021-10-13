import React, { useEffect } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  selected = []
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options

  const selectedArray =
    selected.length !== 0 && selected[0]._id
      ? selected.map((item) => ({
          label: item.name,
          value: item._id
        }))
      : selected

  useEffect(() => {
    console.log('selected', selected)
    console.log('selectedArray', selectedArray)
  }, [])

  const handleChange = (value) => {
    console.log('handleChange', value)
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
        value={selectedArray}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default MultiSelectField
