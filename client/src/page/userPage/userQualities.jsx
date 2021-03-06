import React from 'react'
import PropTypes from 'prop-types'
import Qualities from '../../components/ui/qualities'

const UserQualities = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <p className="card-text">
          <Qualities qualitiesList={qualities} />
        </p>
      </div>
    </div>
  )
}

UserQualities.propTypes = {
  qualities: PropTypes.array.isRequired
}
export default UserQualities
