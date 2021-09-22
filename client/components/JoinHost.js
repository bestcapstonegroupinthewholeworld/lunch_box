import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import { createParty } from '../store/party';

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
      left: '30px',
    },
  },
}));

/** COMPONENT **/
const JoinHost = ({ userId, createParty, party }) => {
  const classes = useStyles();
  //Setting room to join a specific room
  const [room, setRoom] = useState('');

  return (
    <Box m={6} p={6} className={classes.hostJoin}>
      <Grid container spacing={2}>
        <Grid container item xs={6} md={6}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={async () => {
              await createParty(userId);
            }}
          >
            Host
          </Button>
        </Grid>
        <Grid container item xs={6} md={6}>
          <TextField
            id="standard-basic"
            label="Enter Room Number"
            onChange={(event) => setRoom(event.target.value)}
          />
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component={Link}
            to={`/party/${room}`}
          >
            Join
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
    party: state.party,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createParty: (userId) => {
      dispatch(createParty(userId, history));
    },
  };
};

export default connect(mapState, mapDispatch)(JoinHost);
