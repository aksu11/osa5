import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog, showBlogForm}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

//Styles -------------------------------------
  const addButton = {
    borderRadius: '5px',
    marginTop: '1vh',
    backgroundColor: 'rgb(91, 239, 98)'
  }

  const cancelButton = {
    borderRadius: '5px',
    marginTop: '1vh',
    marginLeft: '1vw',
    backgroundColor: 'rgb(249, 49, 49)'
  }
//--------------------------------------------

  const handleFieldChange = (event) => {
    if (event.target.name === 'title') setTitle(event.target.value)
    else if (event.target.name === 'author') setAuthor(event.target.value)
    else if (event.target.name === 'url') setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {title, author, url}
    setTitle('')
    setUrl('')
    setAuthor('')
    createBlog(newBlog)
  }

  return (
    <div style={{marginLeft:'50px'}}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <span>Title:</span><br></br>
        <input type='text' name='title' value={title} onChange={handleFieldChange}></input><br></br>
        <span>Author:</span><br></br>
        <input type='text' name='author' value={author} onChange={handleFieldChange}></input><br></br>
        <span>URL:</span><br></br>
        <input type='text' name='url' value={url} onChange={handleFieldChange}></input><br></br>
        <button style={addButton} type="submit">Add blog</button>
        <button style={cancelButton} onClick={showBlogForm}>Cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = { createBlog: PropTypes.func.isRequired, showBlogForm: PropTypes.func.isRequired }

export default BlogForm