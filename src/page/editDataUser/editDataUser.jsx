import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import api from '../../api/index'
import { useHistory, useParams } from 'react-router'
import { validator } from '../../utils/validator'
import Loader from '../../components/ui/loader/loader'
import TextField from '../../components/common/form/textField'
import SelectField from '../../components/common/form/selectField'
import RadioField from '../../components/common/form/radioField'
import MultiSelectField from '../../components/common/form/multiSelectField'

const EditDataUser = () => {
  const { userId } = useParams()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })

  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState({})
  const [errors, setErrors] = useState({})

  const getProfessionsById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof]
      if (profData._id === id) return profData
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      console.log('elem', elem.value)
      for (const qualy in qualities) {
        console.log('qualy', qualy)
        if (elem.value === qualities[qualy]._id) {
          qualitiesArray.push(qualities[qualy])
        }
      }
    }
    console.log(' getQualities', qualitiesArray)
    return qualitiesArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
    console.log(' handleSubmit data0', data)
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionsById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`))
    console.log(' handleSubmit data ', data)
  }

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ profession, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        profession: profession._id
      }))
    )
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен не корректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }

  useEffect(() => validate(), [data])
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleBack = () => {
    history.push(`/users/${userId}`)
  }

  // TODO с задержкой загружается поле профессия Почему???
  const renderFormUser = () => {
    return (
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={handleBack}>
          <i className="bi bi-caret-left"></i>Назад
        </button>
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <form onSubmit={handleSubmit} className="shadow p-4">
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
                defaultOption="Choise..."
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
                name="profession"
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
                defaultValue={data.qualities}
                options={qualities}
                onChange={handleChange}
                values
                name="qualities"
                label="Выберите ваши качества"
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

  return (
    <>
      {!isLoading && Object.keys(professions).length > 0 ? (
        <>{renderFormUser()}</>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default EditDataUser
