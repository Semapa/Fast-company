import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoint + payload._id,
      payload
    )
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      // для того чтобы сервер отдал комментарии только для определенной страницы
      // передаем параметры в запрос (в итоге получится строка .../comment.json?orderBy="pageId"&equalTo=pageId)
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  }
}

export default commentService
