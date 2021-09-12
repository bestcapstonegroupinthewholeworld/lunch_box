import React from 'react'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ButtonTiffany from '../materialUiStyles/ButtonTiffany';
import ButtonGreen from '../materialUiStyles/ButtonGreen';
import {Link} from 'react-router-dom'

/** STYLES **/
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

 const useStyles = makeStyles((theme) => ({
  homeMain: {
    position: 'relative',
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
      <Grid>
        <Box m={6} p={6} className={classes.homeMain} alignItems="center">
          <Grid container spacing={2} className={classes.homeInner}>
            <Grid item xs={6} md={7} p={4}>
              <Box mb={2}>
                <p> Hi there, {username} </p>
                <WhiteTextTypography variant="h2">
                    Let's play despite <br></br> the distance!
                </WhiteTextTypography>
              </Box>      
              <WhiteTextTypography pt={2} pb={3} variant="h5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </WhiteTextTypography>
              <Box mt={3}>
                <Grid container spacing={2} mt={3} className={classes.buttons} >
                  <Grid item md={3}>
                    <ButtonTiffany variant="contained" color="primary" disableRipple> 
                      {/* <Link to="/party" className={classes.linkNav}>Host a Party</Link> */}
                      Host a Party
                    </ButtonTiffany>
                  </Grid>
                  <Grid item md={9}>
                    <ButtonGreen variant="contained" color="primary" disableRipple> 
                      Join a Party
                      {/* <Link to="/party" className={classes.linkNav}>Join a Paty</Link> */}
                    </ButtonGreen>  
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
