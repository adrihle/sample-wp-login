import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ParticleEffectButton from 'react-particle-effect-button'
//config for login
import Site from '../config/auth'
import axios from 'axios'

var emitter = require('../config/global_emitter')

const useStyles = makeStyles(theme => ({
  textfields: {
    marginTop: theme.spacing(1)
  }
}))

export default function Login(props) {
  const input = useRef()
  const classes = useStyles()
  const [values, setValues]=useState({
    name: '',
    password: '',
    hidde: false
  })

  const handleSubmit = async () => {
    const login = {
      username: values.name,
      password: values.password
    }
    await axios.post(`${Site.siteUrl}/wp-json/jwt-auth/v1/token`, login)
    .then( res => {
      console.log(res.data)
      props.history.push('/welcome')
      emitter.emit('changeNav')
    })
  }

  const handleChange = input => event => {
    setValues({ ...values, [input]: event.target.value })
  }

  return (

    <form className='shadow text-center container w-75 pt-3 bg-light mt-5 rounded'>
      <h6 className="">Login</h6>
      <TextField
        id="standard-name"
        label="Name"
        name='username'
        ref={input}
        value={values.name}
        onChange={handleChange('name')}
        type='text'
        // value={this.state.username}
        // onChange={this.handleOnChange}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name='password'
        value={values.password}
        onChange={handleChange('password')}
        className={classes.textfields}
      // value={this.state.password}
      // onChange={this.handleOnChange}
      />
      <ParticleEffectButton
        color='#121019'
        hidden={values.hidden}
      >
        <Button variant="contained" color="primary" className='mb-5 mt-5' onClick={handleSubmit}>
          Submit
        </Button>
      </ParticleEffectButton>
    </form>

  )
}
