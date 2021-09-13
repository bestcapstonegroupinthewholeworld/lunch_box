import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  gameOptions: {
    position: 'relative',
  }
}));

/** COMPONENT **/
const GameOptions = () => {
  const classes = useStyles();

  return (
    <Box className={classes.gameOptions}>
      <h2>  Define Game Options </h2>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8} p={4}>
            Round Time:
        </Grid>
        <Grid item xs={6} md={4} p={4}>
            1:00
        </Grid>
        <Grid item xs={6} md={8} p={4}>
            # of Rounds:
        </Grid>
        <Grid item xs={6} md={4} p={4}>
            3:00
        </Grid>
        <Grid item xs={6} md={8} p={4}>
            Max # of words per player:
        </Grid>
        <Grid item xs={6} md={4} p={4}>
            10:00
        </Grid>
      </Grid>
    </Box>
  )
}

export default GameOptions;