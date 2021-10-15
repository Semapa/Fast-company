import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import api from '../../../api/index'
import Avatar from '../../common/avatar'
import SelectField from '../../common/form/selectField'
import TextArea from '../../common/form/textArea'
import Loader from '../../ui/loader/loader'
import Qualities from '../../ui/qualities'
import { validator } from '../../../utils/validator'

const User = () => {
  // деструкторизация входящих пропсов через хук
  const { userId } = useParams()
  const [users, setUsers] = useState()
  const [user, setUser] = useState()
  const [comments, setComments] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    newCommentUser: '',
    newCommentMessage: ''
  })

  const history = useHistory()

  const validatorConfig = {
    newCommentUser: {
      isRequired: {
        message: 'Поле "Выбор пользователя" обязательное'
      }
    },
    newCommentMessage: {
      isRequired: {
        message: 'Поле "Сообщение обязательное"'
      }
    }
  }

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data)
    })

    api.users.getById(userId).then((data) => {
      setUser(data)
    })

    api.users.fetchAll().then((data) => {
      setUsers(data)
      setIsLoading(false)
    })
  }, [])

  // useEffect(() => {
  //   console.log('data ', data)
  // }, [data])

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleEdit = (id) => {
    history.push(`/users/${id}/edit`)
  }

  const handleDeleteComment = (id) => {
    console.log('handleDeleteComment', id)
    api.comments.remove(id)
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data)
    })
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handlePublic = () => {
    const newComment = {
      pageId: userId,
      userId: data.newCommentUser,
      content: data.newCommentMessage
    }
    api.comments.add(newComment)
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(data)
    })
    setData((prevState) => ({
      ...prevState,
      newCommentUser: '',
      newCommentMessage: ''
    }))
  }

  const getNameUser = (id) => {
    return users.find((user) => user._id === id).name
  }
  const getTimeComment = (createTime) => {
    console.log('create comment time', createTime)
    return createTime
  }

  const renderUsers = () => {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  >
                    <i className="bi bi-gear"></i>
                  </button>
                  <div className="d-flex flex-column align-items-center text-center position-relative">
                    <Avatar classes="rounded-circle" width="150" height="150" />
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">
                        {user.profession.name}
                      </p>
                      <div className="text-muted">
                        <i
                          className="bi bi-caret-down-fill text-primary"
                          role="button"
                        ></i>
                        <i
                          className="bi bi-caret-up text-secondary"
                          role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Qualities</span>
                  </h5>
                  <p className="card-text">
                    <Qualities qualities={user.qualities} />
                  </p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card mb-3">
                  <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                      <span>Completed meetings</span>
                    </h5>
                    <h1 className="display-1">{user.completedMeetings}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card mb-2">
                <div className="card-body">
                  <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                      <SelectField
                        defaultOption="Выберете пользователя"
                        options={users}
                        onChange={handleChange}
                        value={data.newCommentUser}
                        name="newCommentUser"
                        error={errors.newCommentUser}
                      />
                    </div>
                    <div className="mb-4">
                      <TextArea
                        name="newCommentMessage"
                        onChange={handleChange}
                        label="Сообщение"
                        rowCount="3"
                        value={data.newCommentMessage}
                        error={errors.newCommentMessage}
                      />
                      <div className="text-end">
                        <button
                          className="btn btn-primary"
                          onClick={handlePublic}
                          disabled={!isValid}
                        >
                          Опубликовать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {comments.length !== 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-light card-body mb-3"
                      >
                        <div className="row">
                          <div className="col">
                            <div className="d-flex flex-start">
                              <Avatar classes="rounded-circle shadow-1-strong me-3" />
                              <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                      {getNameUser(comment.userId)}
                                      <span className="small">
                                        &nbsp;-&nbsp;
                                        {getTimeComment(comment.created_at)}
                                      </span>
                                    </p>
                                    <button
                                      onClick={() => {
                                        handleDeleteComment(comment._id)
                                      }}
                                      className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                      <i className="bi bi-x-lg"></i>
                                    </button>
                                  </div>
                                  <p className="small mb-0">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return <>{isLoading ? <Loader /> : <>{renderUsers()}</>}</>
}

export default User
