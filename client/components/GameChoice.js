import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  partyLobby: {
    position: 'relative',
  }
}));

/** COMPONENT **/
const GameChoice = () => {
  const classes = useStyles();

  return (
    <Box className={classes.partyLobby}>
      <h2> Choose a Game </h2>
      <Box>
        LunchBox
      </Box>
    </Box>
  )
}

export default GameChoice;