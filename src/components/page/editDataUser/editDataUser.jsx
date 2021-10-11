import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api/index'
import { validator } from '../../../utils/validator'
import Loader from '../../ui/loader/loader'
import TextField from '../../common/form/textField'

const EditDataUser = ({ userId }) => {
  const [users, setUsers] = useState()
  const [data, setData] = useState({
    name: '',
    lastName: '',
    year: '',
    portfolio: ''
  })

  const [errors, setErrors] = useState({})

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Поле "Имя" обязательно для заполнения'
      }
    },
    lastName: {
      isRequired: {
        message: 'Поле "Фамилия" обязательно для заполнения'
      }
    },
    year: {
      isRequired: {
        message: 'Поле "Год рождения" обязателено для заполнения'
      },
      length: {
        message: 'Поле "Год рождения" не корректно',
        value: 4
      }
    },
    portfolio: {
      isRequired: {
        message: 'Поле "Портфолио" обязательно для заполнения'
      },
      isUrl: {
        message: 'Поле "Портфолио" должно быть ссылкой'
      }
    }
  }

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
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

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('editDataUser - e', e)
  }

  const renderFormUser = () => {
    const currentUser = users.find((user) => user._id === userId)
    console.log('editDatatUser currentUser', currentUser)

    return (
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <h1>Создать</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              ></TextField>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
              >
                Создать
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return <>{users ? <>{renderFormUser()}</> : <Loader />}</>
}

EditDataUser.propTypes = {
  userId: PropTypes.string.isRequired
}

export default EditDataUser
