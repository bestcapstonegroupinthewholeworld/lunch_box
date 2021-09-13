import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import GameChoice from './GameChoice'
import GameOptions from './GameOptions.js'
import ParticipantsList from './ParticipantsList'

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  hostOuter: { 
    position: 'relative',
    h1: {
        textAlign: 'center'
      }
  },
  center: {
      textAlign: 'center'
  },
  boxDark: {
    backgroundColor: '#00000080',
    padding: '1em',
    borderRadius: '9px 33px',
    boxShadow: '2px 2px 2px black',
    marginBottom: '2em',
    padding: '1em 1em 2em 3em'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/** COMPONENT **/
export const Host = props => {
  const {username} = props;
  const classes = useStyles();

  return (
    <Box className={classes.hostOuter} color="text.primary" mr={6} ml={6}>
      <Box className={classes.center}>
         <h1> {username}, you are hosting a Party </h1>
      </Box> 
      <Box m={6}>
        <Grid container spacing={6}>
          <Grid item xs={6} md={6} p={4}>
              <div className={classes.boxDark}>
                  <GameChoice />
              </div>
              <div className={classes.boxDark}>
                  <GameOptions />
              </div>
          </Grid>
          <Grid item xs={6} md={6} p={4}>
            <div className={classes.boxDark}>
              <ParticipantsList />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>  
  )
}

const mapState = state => {
    return {
      username: state.auth.username
    }
  }
  
export default connect(mapState)(Host)