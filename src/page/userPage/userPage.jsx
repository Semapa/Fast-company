import React from 'react'
import { useUser } from '../../hooks/useUsers'
import PropTypes from 'prop-types'
import Loader from '../../components/ui/loader/loader'
import UserInfoCard from './userInfoCard'
import UserQualities from './userQualities'
import UserComplitedMeetings from './userComplitedMeetings'
import Comments from './comments'

const User = ({ userId }) => {
  const { getUserById } = useUser()

  const user = getUserById(userId)
  console.log('userPage user', user)

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
