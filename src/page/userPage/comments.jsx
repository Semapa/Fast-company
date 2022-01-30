import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentsList, { AddCommentForm } from '../../components/common/comments'
import { useComments } from '../../hooks/useComments'
import {
  loadCommentsList,
  getCommentsLoadingStatus,
  getComments
} from '../../store/comments'
import { useParams } from 'react-router-dom'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const isLoading = useSelector(getCommentsLoadingStatus())
  const { createComment, removeComment } = useComments()
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    createComment(data)
    // api.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]))
  }
  const handleRemoveComment = (id) => {
    removeComment(id)
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
