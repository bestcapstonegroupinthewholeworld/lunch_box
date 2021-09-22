import React from "react";
import { useState, useEffect } from "react";

import { AgoraVideoPlayer } from "agora-rtc-react";

import { Grid } from "@material-ui/core";
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  videoContainerOuter: {
    height: '100%',
    position: 'absolute',
    display: 'flex',
    flexWrap: 'wrap'
  },
  singleVideoScreen: {
    position: 'relative',
    maxHeight: '220px',
    marginRight: '15px',
    maxWidth: '350px',
    minWidth: '350px'
  },
  videoHost: {
    position: 'relative',
    maxHeight: '220px',
    marginRight: '15px',
    maxWidth: '350px',
    minWidth: '350px'
  },
  singleVideoScreenInner: {
    
  }
  
}));


export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);
  const classes = useStyles();

  useEffect(() => {
    //users.length + 1 => including the host
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1))), 4);
  }, [users, tracks]); //only useEffect when either of the value in array changes

  return (
    //AgoraVideoPlayer height takes from the parent height ? how to fix
    <Box>
      <Grid container className={classes.videoContainerOuter}>
      <Grid item xs={gridSpacing} className={classes.videoHost}>
        {/* host ===================== */}
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
          className={classes.singleVideoScreenHost}
        />
      </Grid>
      {/* generate a video for every sigle user  */}
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing} className={classes.singleVideoScreen}>
                <AgoraVideoPlayer
                  key={user.uid}
                  videoTrack={user.videoTrack}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute"
                  }}
                  className={classes.singleVideoScreenInner}
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </Box>
    
  );
}