import React from 'react'
import PropTypes from 'prop-types'
import Loader from '../../components/ui/loader/loader'
import UserInfoCard from './userInfoCard'
import UserQualities from './userQualities'
import UserComplitedMeetings from './userComplitedMeetings'
import Comments from './comments'
import { useSelector } from 'react-redux'
import { getUserById } from '../../store/users'

const User = ({ userId }) => {
  const user = useSelector(getUserById(userId))

  if (user) {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserInfoCard user={user} />
              <UserQualities qualities={user.qualities} />
              <UserComplitedMeetings
                completedMeetings={user.completedMeetings}
              />
            </div>

            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <Loader />
  }
}
User.propTypes = {
  userId: PropTypes.string.isRequired
}

export default User
