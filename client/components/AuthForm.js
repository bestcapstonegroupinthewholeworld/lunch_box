import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

/**
 * COMPONENT
 */

 const useStyles = makeStyles((theme) => ({ 
  form: {
    position: 'relative'
  },
  formOuter: {
    justifyContent: 'center',
    display: 'flex'
  }

 }))

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;
  const classes = useStyles();
  

  return (
    <Box className={classes.formOuter}>
      <form onSubmit={handleSubmit} name={name} className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField id="standard-basic" label="username" name="username" />
          {/* <label htmlFor="username">
            <small>Username</small> */}
          {/* </label> */}
          {/* <input name="username" type="text" /> */}
        </div>
        <div>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
          {/* <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" /> */}
        </div>
        <div>
          <Button variant="outlined" type="submit">{displayName}</Button>
          {/* <button type="submit">{displayName}</button> */}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </Box>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
