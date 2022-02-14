import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (payload) => {
    console.log('createComment', payload)
    const { data } = await httpService.post(commentEndpoint, payload)
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      // для того чтобы сервер отдал комментарии только для определенной страницы
      // передаем параметры в запрос (в итоге получится строка .../comment.json?orderBy="pageId"&equalTo=pageId)
      params: {
        orderBy: 'pageId',
        equalTo: `${pageId}`
      }
    })
    return data
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId)
    return data
  }
}

export default commentService
