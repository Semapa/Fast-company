import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import api from '../../api/index'
import { useHistory, useParams } from 'react-router'
import { validator } from '../../utils/validator'
import Loader from '../../components/ui/loader/loader'
import TextField from '../../components/common/form/textField'
import SelectField from '../../components/common/form/selectField'
import RadioField from '../../components/common/form/radioField'
import MultiSelectField from '../../components/common/form/multiSelectField'
import { useProfessions } from '../../hooks/useProfession'
import { useAuth } from '../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'

const EditDataUser = () => {
  const { userId } = useParams()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)

  const { currentUser, updateUser, isLoadingUser } = useAuth()
  const [errors, setErrors] = useState({})

  const qualities = useSelector(getQualities())
  const isLoadingQualities = useSelector(getQualitiesLoadingStatus())
  // Преобразуем качества в требуемый вид для MultiSelectField
  const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))

  const { professions, getProfession, isLoadingProfession } = useProfessions()
  // Преобразуем профессии в требуемый вид для Select
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }))

  const getCurrentQulitiesList = () => {
    return currentUser.qualities.map((currentQualitieId) => {
      return qualities.find((q) => q._id === currentQualitieId)
    })
  }

  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: '',
    qualities: []
  })

  useEffect(() => {
    if (currentUser) {
      setData((prevState) => ({
        ...prevState,
        name: currentUser.name,
        email: currentUser.email,
        profession: getProfession(currentUser.profession)._id,
        sex: currentUser.sex,
        qualities: getCurrentQulitiesList()
      }))
    }
  }, [])

  console.log('currentUser', currentUser)
  // console.log('professions', professions)
  // console.log('qualities', qualities)

  useEffect(() => {
    if (!isLoadingUser && !isLoadingQualities && !isLoadingProfession) {
      setIsLoading(false)
    }
    // console.log('data', data)
  }, [data])

  const getIdQualities = (qualitiesArray) => {
    console.log('qualitiesArray', qualitiesArray)

    return qualitiesArray.map((q) => {
      // Если не меняем качества, то они остаются в объекте {_id,color,name}
      if (q.name) {
        return q._id
      } else {
        // Если меняем качества, то они остаются в объекте {name,value} после трансформации для SelectField
        return q.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { name, email, profession, qualities } = data
    console.log(' newUser ', {
      ...currentUser,
      name,
      email,
      profession,
      qualities: getIdQualities(qualities)
    })
    updateUser({
      ...currentUser,
      name,
      email,
      profession,
      qualities: getIdQualities(qualities)
    })

    history.push(`/users/${currentUser._id}`)
    // api.users
    //   .update(userId, {
    //     ...data,
    //     profession: getProfessionsById(profession),
    //     qualities: getQualities(qualities)
    //   })
    //   .then((data) => history.push(`/users/${data._id}`))
    // console.log(' handleSubmit data ', data)
  }

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

  useEffect(() => !isLoading && validate(), [data])

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
                options={professionsList}
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
                options={qualitiesList}
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

  return <>{!isLoading ? <>{renderFormUser()}</> : <Loader />}</>
}

export default EditDataUser
