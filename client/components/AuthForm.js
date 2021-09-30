import React from "react";
import { connect } from "react-redux";
import { authenticate, facebookLogin } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Circles from "./FloatingCircles"

/* NEWWWWW */

/**
 * COMPONENT
 */

const useStyles = makeStyles((theme) => ({
  form: {
    position: "relative",
  },
  formOuter: {
    justifyContent: "center",
    display: "flex",
    minHeight: "600px",
    alignItems: "center",
  },
}));

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, handleFacebookLogin, error } = props;
  const classes = useStyles();

  return (

    <Box className={classes.formOuter}>
      <form
        onSubmit={handleSubmit}
        name={name}
        className={classes.form}
        noValidate
        autoComplete="off"
        color="primary"
      >
        <div>
          <TextField id="standard-basic" label="Username" name="username" />
        </div>
        <div>
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
        </div>
        <Box>
          <Button variant="outlined" type="submit"  color="primary">
            {displayName}
          </Button>
        </Box>
        <div></div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <p>
        <Button
          className={classes.form}
          variant="outlined"
          onClick={handleFacebookLogin}
          text="Login with Facebook"
        >
          Login with facebook
        </Button>
      </p>
      <Circles />
    </Box>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
    handleFacebookLogin() {
      dispatch(facebookLogin());
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
