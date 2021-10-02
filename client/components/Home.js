import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button'

import Circles from './FloatingCircles'


/** STYLES **/
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

 const useStyles = makeStyles((theme) => ({
  homeMain: {
    position: 'relative',
    zIndex: '1000'
  },
  homeInner: {
    alignItems: 'center',
    minHeight: '600px'
  },
  homeOuter: {
    '&::after': {
        content: '""',
        background: `url(${'/assets/landing-random-people-people.png'})`,
        height: '100%',
        width: '100%',
        backgroundSize: 'contain',
        top: '0',
        left: '-50px',
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'right'
      }
    }
}));

/** COMPONENT **/
export const Home = props => {
  const {username} = props;
  const classes = useStyles();
  
  return (
    <div className={classes.homeOuter}>
      <Circles wrappedComponentRef={ref => this.myRef = ref} />
        <Grid>
          <div className="circles"></div>
          <Box ml={6} pl={6} className={classes.homeMain} alignItems="center">
            <Grid container spacing={2} className={classes.homeInner}>
              <Grid item xs={6} md={7} p={4}>
                <Box mb={2}>
                  <h3>Hi there, <span className="accentYellow">{username.toUpperCase()}</span> </h3> 
                  <WhiteTextTypography variant="h2">
                      Let's play despite <br></br> the distance!
                  </WhiteTextTypography>
                </Box>      
                <WhiteTextTypography pt={2} pb={3} variant="h5">
                  Lunchbox! Try to outwit your friends. Our game presents an opportunijty to have fun, play and enjoy the time with your friend no matter where you are at! 
                </WhiteTextTypography>
                <Box mt={3}>
                  <Grid container spacing={2} mt={3} className={classes.buttons}>
                    <Button color='primary' variant='contained' size='large' component={ Link } to="/party">
                      Get Started! 
                    </Button>
                  </Grid>  
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
    </div>
  )
}

 const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
