import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../../common/avatar'

const Comment = ({
  comments,
  getNameUser,
  getTimeComment,
  handleDeleteComment
}) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-light card-body mb-3">
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
                          &nbsp;:&nbsp;
                          {getTimeComment(comment.created_at)}
                        </span>
                      </p>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="btn btn-sm text-primary d-flex align-items-center"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <p className="small mb-0">{comment.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  getNameUser: PropTypes.func.isRequired,
  getTimeComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired
}

export default Comment
