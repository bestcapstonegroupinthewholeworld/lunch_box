import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { createParty } from '../store/party';

/** STYLES **/

const useStyles = makeStyles((theme) => ({}));

/** COMPONENT **/
const JoinHost = ({ userId, createParty, party }) => {
  const classes = useStyles();

  return (
    <Box m={6} p={6}>
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
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component={Link}
            to="/party/join"
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
    party: state,
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
