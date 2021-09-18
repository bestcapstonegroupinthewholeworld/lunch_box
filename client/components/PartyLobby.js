import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import VideoCall from "../components/VideoCall";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

/** STYLES **/
const useStyles = makeStyles((theme) => ({
  partyLobbyOuter: {
    position: 'relative',
    height: 'calc(100vh - 100px)'
  },
  partyLobbyVideos: {
    height: 'calc((100vh - 100px)/2)',
    display: 'block',
    flexWrap: 'wrap',
    position: 'relative'
  },
  partyLobbyBottom: {

  }
}));

/** COMPONENT **/
const PartyLobby = () => {
  const classes = useStyles();
  const [word, setWord] = useState('');

  const onClick = () => {
    
  }

  return (
    <Box className={classes.partyLobbyOuter} ml={6} mr={6} pl={4} pr={4}>
      <Box textAlign='center'>
        <h1> Party Lobby </h1>
      </Box>
      <Box className={classes.partyLobbyVideos}>
        <VideoCall />
      </Box>
      <Box className={classes.partyLobbyBottom}>
        <Grid container spacing={2}>
          <Grid container item xs={6} md={6}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"             
              label="Enter a Word"
              onChange={(event) => setWord(event.target.value)}
            />
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={onClick}
            >
              Add a Word
            </Button>
          </Grid>
          <Grid container item xs={6} md={6}>
           
          </Grid>

          
        </Grid>
      </Box>
    </Box>
  )
}

export default PartyLobby;