import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import api from '../../../api/index'
import Loader from '../../ui/loader/loader'
import { validator } from '../../../utils/validator'
import UserInfoCard from './userInfoCard'
import UserQualities from './userQualities'
import UserComplitedMeetings from './userComplitedMeetings'
import NewComment from './newComment'
import Comment from './comment'
import { getTimeComment } from '../../../utils/getTimeComment'
import _ from 'lodash'

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

  function sortComments(data) {
    return _.orderBy(data, 'created_at', 'desc')
  }

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(sortComments(data))
    }, [])

    api.users.getById(userId).then((data) => {
      setUser(data)
    })

    api.users.fetchAll().then((data) => {
      setUsers(data)
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
  const handleEdit = (id) => {
    history.push(`/users/${id}/edit`)
  }

  const handleDeleteComment = (id) => {
    api.comments.remove(id)
    api.comments.fetchCommentsForUser(userId).then((data) => {
      setComments(sortComments(data))
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
      setComments(sortComments(data))
    })
    // очищаем форму
    setData((prevState) => ({
      ...prevState,
      newCommentUser: '',
      newCommentMessage: ''
    }))
  }

  const getNameUser = (id) => {
    return users.find((user) => user._id === id).name
  }

  const renderUsers = () => {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserInfoCard onClick={() => handleEdit(user._id)} user={user} />
              <UserQualities qualities={user.qualities} />
              <UserComplitedMeetings
                completedMeetings={user.completedMeetings}
              />
            </div>

            <div className="col-md-8">
              <NewComment
                users={users}
                data={data}
                errors={errors}
                isValid={isValid}
                handleChange={handleChange}
                handlePublic={handlePublic}
              />

              {comments.length !== 0 && (
                <div className="card mb-3">
                  <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    <Comment
                      comments={comments}
                      getNameUser={getNameUser}
                      getTimeComment={getTimeComment}
                      handleDeleteComment={handleDeleteComment}
                    />
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
