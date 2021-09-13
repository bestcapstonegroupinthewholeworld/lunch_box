import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  partyLobby: {
    position: 'relative',
    textAlign: 'center',
  }
}));

/** COMPONENT **/
const PartyLobby = () => {
  const classes = useStyles();

  return (
    <Box className={classes.partyLobby}>
      <h1> Party Lobby </h1>
    </Box>
  )
}

export default PartyLobby;