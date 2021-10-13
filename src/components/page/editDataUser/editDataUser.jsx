import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api/index'
import { validator } from '../../../utils/validator'
import Loader from '../../ui/loader/loader'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const EditDataUser = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState({})
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: '',
    qualities: []
  })

  const [errors, setErrors] = useState({})

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Поле "Имя" обязательно для заполнения'
      }
    },
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен не корректно'
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно вберите вашу профессию'
      }
    }
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
    api.users.getById(userId).then((data) => {
      setData((prevState) => ({
        ...prevState,
        name: data.name,
        email: data.email,
        profession: data.profession.name,
        sex: data.sex,
        qualities: data.qualities
      }))
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('editDataUser - e', e)
    console.log('handleSubmit - data', data)
  }

  const renderFormUser = () => {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              ></TextField>
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectField
                label="Выбери свою профессию"
                defaultOption={data.profession}
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                selected={data.qualities}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <>{isLoading ? <Loader /> : <>{renderFormUser()}</>}</>
}

EditDataUser.propTypes = {
  userId: PropTypes.string.isRequired
}

export default EditDataUser
