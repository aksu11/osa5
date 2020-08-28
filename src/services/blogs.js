import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogsInLikeOrder = response.data.sort( (blog1, blog2) => {
    if (blog1.likes > blog2.likes) return -1;
    if (blog1.likes < blog2.likes) return 1;
    return 0
  })
  return blogsInLikeOrder
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = { headers: { 'Authorization': token } }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, remove }