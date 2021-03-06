import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'

const UserInfoCard = ({ user }) => {
  const history = useHistory()
  const currentUser = useSelector(getCurrentUserData())
  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* Чтобы отображать кнопку настройки юзера только когда заходишь в свой профиль */}
        {currentUser._id === user._id && (
          <button
            onClick={handleClick}
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            alt=""
            height="150"
            className="img-responsive rounded-circle"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserInfoCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfoCard
