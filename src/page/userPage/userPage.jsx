import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../../api/index'
import Loader from '../../components/ui/loader/loader'
import UserInfoCard from './userInfoCard'
import UserQualities from './userQualities'
import UserComplitedMeetings from './userComplitedMeetings'
import Comments from './comments'

const User = ({ userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  if (user) {
    console.log('userPage', user)
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
