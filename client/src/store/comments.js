import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentsUpdated: (state, actions) => {
      state.entities.push(actions.payload)
      state.isLoading = false
    },
    commentRemoved: (state, actions) => {
      state.entities = state.entities.filter((e) => e._id !== actions.payload)
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceved,
  commentsRequestFiled,
  commentsUpdated,
  commentRemoved
} = actions

export const createComment = (payload) => async (dispatch) => {
  // dispatch(commentsRequested())
  try {
    const { content } = await commentService.createComment({ ...payload })
    dispatch(commentsRequested())
    dispatch(commentsUpdated(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

export const removeComment = (id) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(id)
    if (!content) {
      dispatch(commentsRequested())
      dispatch(commentRemoved(id))
    }
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceved(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

// Селекторы
export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
