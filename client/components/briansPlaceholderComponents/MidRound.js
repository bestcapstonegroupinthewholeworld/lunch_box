import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { io } from "socket.io-client";

import { getPartyInfo } from "../../store/party";
import { useParams, useLocation } from "react-router-dom";
import { pickACard, guessed, skip } from "../../store/lunchbox";
import auth, { me } from "../../store/auth";
import CountdownClock from "../CountDown";
import VideoCall from "../VideoCall";
import Video from "../video";
import { useTime, useTimeUpdate } from "../TimeContext";
import { TimeProvider } from "../TimeContext";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {
  RefreshSharp,
  SettingsInputAntennaSharp,
  SignalCellularNoSimOutlined,
} from "@material-ui/icons";
import { nextTurn, roundOver } from "../../store/party";
import { setClueGiver } from "../../store/cluegiver";

const socket = io("/");

//if team a - left aligned  classes: leftA
//if team b -  right alligned classes: rightB

const useStyles = makeStyles((theme) => ({
  countDown: {
    position: "relative",
    height: "calc(100vh - 200px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gameScreen: {
    position: "relative",
    right: "0",
    height: "calc(100vh - 200px)",
  },
  colLeft: {
    position: "relative",
  },
  colCenter: {
    position: "relative",
    justifyContent: "center",
  },
  colRight: {
    position: "relative",
  },
}));

const MidRound = ({
  party,
  user,
  lunchbox,
  getPartyInfo,
  skip,
  pickACard,
  guessed,
  nextTurn,
  cluegiver,
  setClueGiver,
  match,
  setAuth,
  roundOver,
}) => {
  const { partyId, clueGiverId } = useParams();
  const { pathname } = useLocation();
  //to hide the button when the Start Round button is clicked
  const [isActive, setIsActive] = useState(false);
  //to only have the next round button to show when clock strikes 0
  const [count, setCount] = useState(Number(useTime()));

  const [min, setMin] = useState(Math.floor((count + 1) / 60));

  const [sec, setSec] = useState((count + 1) % 60);

  const classes = useStyles();

  console.log(party);
  useEffect(() => {
    getPartyInfo(partyId, user.id, pathname);
    setAuth();
  }, []);

  useEffect(() => {
    setClueGiver(clueGiverId);
  }, []);

  let currentCard = lunchbox.filter((card) => card.status === "current")[0];
  if (!currentCard) {
    currentCard = lunchbox.filter((card) => card.status === "skipped")[0];
  }

  socket.on("countDownStart", (isActive) => {
    console.log("inside socket ~~~~~~~~~~~~~~~~~~~", isActive);
    setIsActive(isActive);
  });

  const handleToggle = () => {
    setIsActive(true);
  };

  // const timeReset = (setIsActive, setCount, setMin, setSec) => {
  //   // console.log(setIsActive, setCount, setMin, setSec);
  //   setIsActive(false);
  //   setCount(Number(useTime()));
  //   setMin(Math.floor((count + 1) / 60));
  //   setSec((count + 1) % 60);
  // };
  //to access the ref from the Video compnent
  const childRef = useRef();

  const app = document.getElementById("app");

  //Function to capture and autoclick on Join button on page load
  useEffect(() => {
    const clickedButton = document.getElementById("buttonClicked");
    clickedButton.click();
  }, []);

  //Function to add team-on/team-two classes depending on a team
  let searchedId = "";
  const creatingAnId = setTimeout(() => {
    const curPath = window.location.pathname.split("/");
    const clueGiverId = curPath.pop();
    console.log(party.users);
    console.log(clueGiverId);
    if (party) {
      if (party.users) {
        party.users.forEach((player) => {
          searchedId = document.getElementById(`${player.username}`);
          if (player.id === Number(clueGiverId)) {
            searchedId.classList.add("clue-giver");
          }
          if (searchedId.id === player.username) {
            //clueGiverId === player.id ? searchedId.classList.add('clue-giver') : "";
            if (player.teamId === party.teams[0].id) {
              searchedId.classList.add("team-one-baby");
            } else {
              searchedId.classList.add("team-two-baby");
            }
          }
        });
      }
    }
  }, 3000);

  // console.log(user);
  return (
    <TimeProvider>
      <Box className={classes.playOuter} mr={6} ml={6}>
        <div className="video-call-left-right">
          {/* <div className="column-left">

          </div>
          <div className="column-right">

          </div> */}

          <VideoCall ref={childRef} className={classes.singleVideoSplit} />
        </div>
        <Grid className={classes.colCenter}>
          <Box className={classes.countDown}>
            <div style={{ textAlign: "center" }}>
              {currentCard && user.id === cluegiver.id ? (
                <h1>
                  <span className="accentYellow center">
                    {currentCard.name}
                  </span>
                </h1>
              ) : null}
              <div>
                <CountdownClock
                  isActive={isActive}
                  setCount={setCount}
                  count={count}
                  setIsActive={setIsActive}
                  currentCard={currentCard}
                  min={min}
                  setMin={setMin}
                  sec={sec}
                  setSec={setSec}
                />
              </div>
            </div>
            {user.id === cluegiver.id ? (
              <div className="buttons">
                {!isActive ? (
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => {
                      socket.emit("countDownStart", true);
                      pickACard(lunchbox);
                      handleToggle();
                    }}
                    className={`${isActive ? "displayNone" : ""}`}
                  >
                    <i className="material-icons-round">play_arrow</i>
                  </Button>
                ) : (
                  <button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => guessed(currentCard, user, lunchbox)}
                  >
                    <i class="material-icons-round">done</i>
                  </button>
                )}

                <button
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={() => skip(currentCard, lunchbox)}
                >
                  <i className="material-icons-round">skip_next</i>
                </button>
              </div>
            ) : null}
          </Box>
          <Grid container item xs={6} md={4} className={classes.colRight}>
            <Box className={classes.gameScreen}>
              {/* <VideoCall ref={childRef}/> */}
              {user.host === partyId ? (
                <div>
                  <button
                    onClick={() => {
                      roundOver(partyId);
                    }}
                  >
                    END OF ROUND
                  </button>

                  {count <= 0 ? (
                    <button
                      onClick={() => {
                        nextTurn(partyId);
                        // timeReset();
                        setIsActive(false);
                        setCount(Number(useTime()));
                        setMin(Math.floor((count + 1) / 60));
                        setSec((count + 1) % 60);
                      }}
                    >
                      {" "}
                      NEXT TURN{" "}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </TimeProvider>
  );
};

const mapState = ({ party, auth, lunchbox, cluegiver }) => {
  return {
    party: party || {},
    user: auth,

    lunchbox: lunchbox || [],
    cluegiver: cluegiver || {},
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getPartyInfo: (partyId, userId, path) => {
      dispatch(getPartyInfo(partyId, userId, path, history));
    },
    pickACard: (cards) => {
      dispatch(pickACard(cards));
    },
    guessed: (card, userId, lunchbox) => {
      dispatch(guessed(card, userId, lunchbox));
    },
    skip: (card, lunchbox) => {
      dispatch(skip(card, lunchbox));
    },
    nextTurn: (partyId) => {
      dispatch(nextTurn(partyId, history));
    },

    setClueGiver: (clueGiverId) => {
      dispatch(setClueGiver(clueGiverId));
    },
    setAuth: () => {
      dispatch(me());
    },
    roundOver: (partyId) => {
      console.log("thunkin");
      dispatch(roundOver(partyId, history));
    },
  };
};
export default connect(mapState, mapDispatch)(MidRound);
