import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import AddBlog from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [notification, setNotification] = useState({})
  const [blogFormVisible, setBlogFormVisible] = useState(false)

//Styles -------------------------------
  const button = {
    borderRadius: '5px',
    marginLeft: '1vw',
    marginBottom: '1vh',
    backgroundColor: 'rgb(90, 163, 252)'
  }

  const notificationSpace = {
    height: '4vh',
    marginBottom: '20px'
  }
//--------------------------------------

  useEffect(() => {

    const fetchData = async (loggedUserJSON) => {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const blogs = await blogService.getAll() 
      setBlogs(blogs)
    }

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) fetchData(loggedUserJSON)

  }, [])

  const saveUser = async (user) => {
    setUser(user)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    const blogs = await blogService.getAll() 
    setBlogs(blogs)
  }

  const createBlog = async (newBlog) => {
    newBlog.user = user
    const added = await blogService.create(newBlog)
    if(!added.hasOwnProperty('error')){
      setNotification({style: 'added', message: 
      'A new blog "' + added.title + '" added by ' + user.username})
      setBlogs(blogs.concat(added))
      showBlogForm()
      setTimeout(() => { setNotification({}) }, 4000);
    } else {
      setNotification({style: 'error', message: 'Fill all fields'})
      setTimeout(() => { setNotification({}) }, 4000);
    }
  }

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('loggedBlogUser')
  }

  const showBlogForm = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  const like = (id) => {
    const blog = blogs.find(b => b.id === id)
    blogService.update(blog)
    blog.likes++
    const newBlogs = blogs.map(b => b.id !== id ? b : blog)
    const blogsInLikeOrder = newBlogs.sort( (blog1, blog2) => {
      if (blog1.likes > blog2.likes) return -1;
      if (blog1.likes < blog2.likes) return 1;
      return 0
    })
    setBlogs(blogsInLikeOrder)
    setNotification({style: 'added', message: 'You liked "'+ blog.title + '"'})
    setTimeout(() => {setNotification({})}, 3000);
  }

  const remove = (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm("Delete "+ blog.title +" by "+ blog.author+"?")) {
      blogService.remove(id)
      setBlogs(blogs.filter( b => b.id !== id))
      setNotification({style: 'added', message: 'removed "'+ blog.title +'" by '+ blog.author})
      setTimeout(() => { setNotification({}) }, 4000)
    }
  }

  if(Object.keys(user).length === 0) {
    return <LoginForm saveUser={saveUser} />
  } else {
    return (
      <div style={{marginLeft:'20px'}}>
        <h2>Blogs</h2>
        <div style={notificationSpace}>
          <Message info={notification} />
        </div>
        <div>
          <b>{user.username}</b> has logged in 
          {!blogFormVisible? <button style={button} onClick={showBlogForm}>Create</button> : null}
          <button style={button} onClick={logout}>log out</button>
        </div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} like={like} remove={remove}/>)}
        {blogFormVisible ? <AddBlog createBlog={createBlog} showBlogForm={showBlogForm} /> : null}
      </div>
    )
  }
}

export default App