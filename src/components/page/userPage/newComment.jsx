import React from 'react'
import PropTypes from 'prop-types'
import SelectField from '../../common/form/selectField'
import TextArea from '../../common/form/textArea'

function NewComment({ users, data, errors, isValid, onChange, onClick }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <SelectField
              defaultOption="Выберете пользователя"
              options={users}
              onChange={onChange}
              value={data.newCommentUser}
              name="newCommentUser"
              error={errors.newCommentUser}
            />
          </div>
          <div className="mb-4">
            <TextArea
              name="newCommentMessage"
              onChange={onChange}
              label="Сообщение"
              rowCount="3"
              value={data.newCommentMessage}
              error={errors.newCommentMessage}
            />
            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={onClick}
                disabled={!isValid}
              >
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

NewComment.propTypes = {
  users: PropTypes.oneOf([PropTypes.object, PropTypes.array]).isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}
export default NewComment
