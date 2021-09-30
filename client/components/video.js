import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { AgoraVideoPlayer } from 'agora-rtc-react';
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from '../settings.js';

import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Control from './control';

const useStyles = makeStyles((theme) => ({
  videoContainerOuter: {
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexWrap: 'wrap',
  },
  singleVideoScreen: {
    position: 'relative',
    maxHeight: '220px',
    marginRight: '15px',
    maxWidth: '350px',
    minWidth: '200px',
  },
  videoHost: {
    position: 'relative',
    maxHeight: '220px',
    marginRight: '15px',
    maxWidth: '350px',
    minWidth: '200px',
  },
  singleVideoScreenInner: {},
}));

export const Video = (props) => {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);
  const [start, setStart] = useState(false);
  const [inCall, setInCall] = useState(false);
  const { ready } = useMicrophoneAndCameraTracks();
  const { userId } = props;

  const classes = useStyles();

  useEffect(() => {
    //users.length + 1 => including the host
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1))), 4);
  }, [users, tracks]); //only useEffect when either of the value in array changes

  let savedVideoId = 0;

  return (
    //AgoraVideoPlayer height takes from the parent height ? how to fix
    <Box>
      <Grid container className={classes.videoContainerOuter}>
        <Grid item xs={gridSpacing} className={classes.videoHost}>
          {/* host ===================== */}
          <div className="team-one">
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                borderRadius: '15px',
              }}
            />
          </div>
        </Grid>
        {/* generate a video for every sigle user  */}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              //your own cam has a different signature. Cam vs video. So host needs to add the video Ids as people join. Also as people join check if anyone doesn't have and then add I guess.
              //then for layout, you'll have to layout everyone and find the spot for "yourself" which will be diff for everyone. A bity tricky.
              //comp did update, users joining party, auto fire detect id thunk and add it. Only host does this.
              //host will remain without though. can give himself just host identifier? Job of second person to join to give host id?
              //id changes when moving to next component and rejoining call so these funcs will have to fire everytime. fuck

              return (
                <Grid
                  item
                  xs={gridSpacing}
                  className={classes.singleVideoScreen}
                  key={user.uid}
                >
                  {user.uid ? (savedVideoId = user.uid) : ''}
                  {console.log('LOOK right belowwwww')}
                  {console.log(savedVideoId)}
                  {console.log('LOOK right aboveeeeee')}
                  <div className="team-one">
                    <div className="savedVideoId">{savedVideoId}</div>
                    <AgoraVideoPlayer
                      key={user.uid}
                      videoTrack={user.videoTrack}
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                      }}
                      className={classes.singleVideoScreenInner}
                    />
                  </div>
                </Grid>
              );
            } else {
              return null;
            }
          })}
      </Grid>
    </Box>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.id,
    party: state.party,
  };
};

export default connect(mapState)(Video);
