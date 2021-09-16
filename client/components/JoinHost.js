import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';


/** STYLES **/

const useStyles = makeStyles((theme) => ({
  hostJoin: {
    '&::before': {
        content: '""',
        backgroundColor: '#141018',
        position: 'absolute',
        height: 'calc(100% - 60px)',
        width: 'calc(100% - 60px)',
        top: '30px',
        left: '30px'
  
    }
  }
}));

/** COMPONENT **/
const JoinHost = () => {
  const classes = useStyles();
  //Setting room to join a specific room
  const [room, setRoom]  = useState('');

  return (
    <Box m={6} p={6} className={classes.hostJoin} >
      <Grid container spacing={2}>
        <Grid container item xs={6} md={6}>
          <Button color='secondary' variant='contained' size='large' component={ Link } to="/party/host">
            Host
          </Button>
        </Grid>
        <Grid container item xs={6} md={6}>
          <TextField id="standard-basic" label="Enter Room Number" onChange={(event) => setRoom(event.target.value)} />
          <Button color='secondary' variant='contained' size='large' component={ Link } to={`/party/join?room=${room}`} >
            Join
          </Button>
        </Grid>    
      </Grid>    
    </Box> 
  )
}

export default JoinHost;