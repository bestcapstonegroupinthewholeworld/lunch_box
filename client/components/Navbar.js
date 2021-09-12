import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'none',
    alignContent: 'flex-end',
    padding: '30px 30px 0 0',
    position: 'relative'
  },
  linkNav: {
    color: '#fff',
    '&::after': {
      display: 'block',
      content: "''",
      borderBottom: 'solid 3px #f2ba41',  
      transform: 'scaleX(0)',
      transition: 'transform 250ms ease-in-out'
    },
    '&:hover::after': {
      transform: 'scaleX(1)'
    }
  }
  
  
 
}));

export const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles();

  return (
    <div>
        {isLoggedIn ? (
            <AppBar position="static" className={classes.appBar}  elevation={0}>
              <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button color="inherit" className={classes.ButtonNav} >
                   {/* The navbar will show these links after you log in */}
                  <Link to="/home" className={classes.linkNav}>Home</Link>
                </Button>
                <Button onClick={handleClick} className={classes.ButtonNav}>
                  <Link to="#" className={classes.linkNav}>Logout</Link>
                </Button>
              </Box> 
            </AppBar>
        ) : (
          <AppBar position="static" className={classes.appBar} elevation={0} justify="flex-end">
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
              {/* The navbar will show these links before you log in */}
              <Button color="inherit" className={classes.ButtonNav}>
                <Link to="/login" className={classes.linkNav}>Login</Link>
              </Button>
              <Button color="inherit" className={classes.ButtonNav}>
                <Link to="/signup" className={classes.linkNav}>Sign Up</Link>
              </Button>
            </Box>
          </AppBar>
        )}
      
    </div>
  )
  
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
