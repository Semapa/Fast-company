import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentsList, { AddCommentForm } from '../../components/common/comments'
import {
  loadCommentsList,
  getCommentsLoadingStatus,
  getComments,
  createComment,
  removeComment
} from '../../store/comments'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const currentUserId = useSelector(getCurrentUserId())
  const isLoading = useSelector(getCommentsLoadingStatus())
  // const { createComment, removeComment } = useComments()
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    dispatch(createComment(data, userId, currentUserId))
  }
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])
  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
