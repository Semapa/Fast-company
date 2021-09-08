import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = ({ user, onDelete, onToggleBookMark }) => {
  return (
    <tr>
      <td scope="row">{user.name}</td>
      <td>
        {user.qualities.map((q) => (
          <Qualitie key={q._id} {...q} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <BookMark
          id={user._id}
          status={user.bookMark}
          onToggleBookMark={onToggleBookMark}
        />
      </td>
      <td>
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}

export default User
