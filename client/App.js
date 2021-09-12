import React from 'react'
import { makeStyles } from '@material-ui/core/styles'




import Navbar from './components/Navbar'
import Routes from './Routes'
import { CssBaseline } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  app:{
    minHeight: "100vh",
    background: 'rgb(243,185,63)',
    background: 'linear-gradient(90deg, rgba(243,185,63,1) 0%, rgba(96,210,218,1) 100%)',
    '&::before': {
        content: '""',
        backgroundColor: '#141018',
        position: 'absolute',
        height: 'calc(100% - 60px)',
        width: 'calc(100% - 60px)',
        top: '30px',
        left: '30px'
    },
    // '&::after': {
    //   content: '""',
    //   background: `url(${'/assets/landing-random-people-people.png'})`,
    //   height: '100%',
    //   width: '100%',
    //   backgroundSize: 'contain',
    //   top: '0',
    //   left: '-50px',
    //   position: 'absolute',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPositionX: 'right'
    //  }
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Navbar />
      <Routes />
      <CssBaseline />
    </div>
  )
}

export default App
