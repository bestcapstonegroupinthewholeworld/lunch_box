import React from "react";
import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "../settings.js";

import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";

import Video from "./video";
import Control from "./control";

export default function VideoCall() {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [inCall, setInCall] = useState(false);

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks(); //audio and video tracks

  //only run effect when any of the given value in the array changes
  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType); //subscribe to the stream
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play(); //audio track is give, no need to subcribe
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          //make sure audioTrack is playing => check before action
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            //no need to unsubcribe when unpublish, just remove user from user state
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      const token = await config.token;
      try {
        //(appId, channelname, the token of the channel, the uid of the user)

        await client.join(config.appId, name, token, null);
      } catch (error) {}
      console.log(tracks[0], tracks[1], "========================");
      if (tracks) {
        try {
          await client.publish([tracks[0], tracks[1]]); // audio and video

          setStart(true); // stream ready to go
        } catch (error) {
          console.log("publish", error);
        }
      }
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div style={{ height: "100%" }}>
      {/* set inCall or not inCall condition ===================================== */}
      {inCall ? (
        <Grid container direction="column" style={{ height: "100%" }}>
          {/*control ======================================*/}
          <Grid item style={{ height: "10%" }}>
            {ready && tracks && (
              <Control
                tracks={tracks}
                setStart={setStart}
                setInCall={setInCall}
              />
            )}
          </Grid>
          {/* video ====================================*/}
          <Grid item style={{ height: "90%" }}>
            {start && tracks && <Video tracks={tracks} users={users} />}
          </Grid>
        </Grid>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setInCall(true);
          }}
        >
          Join call{" "}
        </Button>
      )}
    </div>
  );
}
