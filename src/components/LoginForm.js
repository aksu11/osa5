import React, { useState } from 'react'
import Message from './Message'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const LoginForm = ({saveUser}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({})

//Styles ---------------------------------------
  const form = {
    marginLeft: '20px',
    marginTop: '1vh',
  }
  const button = {
    borderRadius: '5px',
    marginTop: '1vh',
    backgroundColor: 'rgb(91, 239, 98)'
  }
  const notificationSpace = {
    height: '5vh',
    marginBottom: '10px'
  }
//----------------------------------------------

  const handleFieldChange = (event) => {
    if (event.target.name === 'password') setPassword(event.target.value)
    else if (event.target.name === 'username') setUsername(event.target.value)
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password
      }) 
      setUsername('')
      setPassword('')
      saveUser(user)
    } catch (exception) {
      setNotification({style: 'error', message: 'Wrong username or password'})
      setTimeout(() => { setNotification({}) }, 4000)
    }
  }

  return (
    <div style={form}>
      <h2>Log in to application</h2>
      <div style={notificationSpace}>
        <Message info={notification} />
      </div>
      <form onSubmit={login}>
        <span>Käyttäjätunnus:</span><br></br>
        <input type="text" name='username' value={username} onChange={handleFieldChange}></input><br></br>
        <span>Salasana:</span><br></br>
        <input type="password" name='password' value={password} onChange={handleFieldChange}></input><br></br>
        <button style={button} type="submit">Kirjaudu</button>
      </form> 
    </div>
  )
}

LoginForm.propTypes = { saveUser: PropTypes.func.isRequired }

export default LoginForm