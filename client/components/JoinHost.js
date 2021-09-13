import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';

/** STYLES **/

const useStyles = makeStyles((theme) => ({

}));

/** COMPONENT **/
const JoinHost = () => {
  const classes = useStyles();

  return (
    <Box m={6} p={6} >
      <Grid container spacing={2}>
        <Grid container item xs={6} md={6}>
          <Button color='secondary' variant='contained' size='large' component={ Link } to="/party/host">
            Host
          </Button>
        </Grid>
        <Grid container item xs={6} md={6}>
          <Button color='secondary' variant='contained' size='large' component={ Link } to="/party/join">
            Join
          </Button>
        </Grid>    
      </Grid>    
    </Box> 
  )
}

export default JoinHost;