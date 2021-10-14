import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({
  options,
  onChange,
  name,
  label,
  selected = []
}) => {
  // переформатируем options(все значения списка)
  // в нужное представление для MultiSelectField
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options
  // переформатируем selected(выбранные поля списка)
  // в нужное представление для MultiSelectField
  const selectedArray =
    selected.length !== 0 && selected[0]._id
      ? selected.map((item) => ({
          label: item.name,
          value: item._id
        }))
      : selected

  const handleChange = (value) => {
    const formatQualities = []
    value.map((qual) => {
      return Object.keys(options).map((q) => {
        if (options[q]._id === qual.value || options[q]._id === qual._id) {
          formatQualities.push(options[q])
        }
        return 0
      })
    })
    onChange({ name: name, value: formatQualities })
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
