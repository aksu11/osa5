import React, { useState } from 'react'

const Blog = ({ blog, like, remove }) => {

  const [visibility, setVisibility] = useState(false)

// Styles ---------------------------------------------------------------
  const blogStyle = {
    padding: '5px',
    border: 'solid 1px',
    marginBottom: '3px',
    marginLeft: '3px',
    width: '75vw'
  }
  const buttonStyle = {
    backgroundColor: visibility ? 'rgb(90, 163, 252)' : 'rgb(91, 239, 98)',
    marginLeft: '5px',
    borderRadius: '5px'
  }
  const removeButton = {
    backgroundColor: 'rgb(91, 239, 98)',
    borderRadius: '5px',
    marginTop: '5px'
  }
// ----------------------------------------------------------------------

  if(!visibility) return (
    <div style={blogStyle}>
      {blog.title}<button style={buttonStyle} onClick={() => setVisibility(!visibility)}>show</button>
    </div>
  )
  return (
    <div style={blogStyle}>
      <div>{blog.title}<button style={buttonStyle} onClick={() => setVisibility(!visibility)}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes: {blog.likes} <button style={buttonStyle} onClick={() => like(blog.id)}>like</button></div>
      <div>{blog.user.username}</div>
      <button style={removeButton} onClick={() => remove(blog.id)}>Remove</button>
    </div>
  )

}

export default Blog
