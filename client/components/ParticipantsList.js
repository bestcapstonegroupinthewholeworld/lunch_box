import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  participantsList: {
    position: 'relative'
  }
}));

/** COMPONENT **/
const ParticipantsList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.participantsList}>
      <h2> Invite up to 7 people </h2>
    </Box>
  )
}

export default ParticipantsList;