import React from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    //users.length + 1 => including the host
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1))), 4);
  }, [users, tracks]); //only useEffect when either of the value in array changes

  return (
    //AgoraVideoPlayer height takes from the parent height ? how to fix
    <Grid container style={{ height: "100%", position: "static" }}>
      <Grid item xs={gridSpacing}>
        {/* host ===================== */}
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            top: "-1px",
          }}
        />
      </Grid>
      {/* generate a video for every sigle user  */}
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                  key={user.uid}
                  videoTrack={user.videoTrack}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    top: "-1px",
                  }}
                />
              </Grid>
            );
          } else {
            return null;
          }
        })}
    </Grid>
  );
}
