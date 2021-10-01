import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { getPartyInfo } from "../../store/party";
import { useParams, useLocation } from "react-router-dom";
import { pickACard, guessed, skip } from "../../store/lunchbox";


import CountdownClock from '../CountDown';
import VideoCall from '../VideoCall';
import Video from '../video'

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { RefreshSharp, SignalCellularNoSimOutlined } from '@material-ui/icons';
import { nextTurn } from '../../store/party';


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
}) => {
  const { partyId, clueGiverId } = useParams();

  const { pathname } = useLocation();
  //to hide the button when the Start Round button is clicked
  const [isActive, setIsActive] = useState(false);
  const classes = useStyles();

  console.log(party)

  useEffect(() => {
    getPartyInfo(partyId, user.id, pathname);
  }, []);

  let currentCard = lunchbox.filter((card) => card.status === "current")[0];
  if (!currentCard) {
    currentCard = lunchbox.filter((card) => card.status === "skipped")[0];
  }
  const handleToggle = () => {
    setIsActive(true);
  };
  //to access the ref from the Video compnent
  const childRef = useRef();
  
  //Function to capture and autoclick on Join button on page load
  useEffect(() => {
    const clickedButton = document.getElementById("buttonClicked");
    clickedButton.click();
  }, []);


  //Function to add team-on/team-two classes depending on a team
  let searchedId = "";
  const creatingAnId = setTimeout(() => {
    console.log(searchedId)
    if(party) {
      if(party.users){
        party.users.forEach(player => {
          searchedId = document.getElementById(`${player.username}`);
          if (searchedId.id === player.username) {
            if(player.teamId === 1) {
              searchedId.classList.add('team-one-baby');
            }
            else {
              searchedId.classList.add('team-two-baby');
            }
          }
        })
      }
    }
  },3000)

  return (
    <Box className={classes.playOuter} mr={6} ml={6}>
      <div className="video-call-left-right">
        <VideoCall ref={childRef} 
          className={classes.singleVideoSplit}
        />
      </div>
        <Grid className={classes.colCenter}>
          <Box className={classes.countDown}>
            <div style={{ textAlign: "center" }}>
              {currentCard && (
                <h1>
                  <span className="accentYellow center">
                    {currentCard.name}
                  </span>
                </h1>
              )}
              <div>
                <CountdownClock
                  isActive={isActive}
                  setIsActive={setIsActive}
                  currentCard={currentCard}
                />
              </div>
            </div>
            <div className="buttons">
              {!isActive ? (
                <Button
                  // color="primary"
                  // variant="contained"
                  // size="large"
                  onClick={() => {
                    pickACard(lunchbox);
                    handleToggle();
                  }}
                  // className={`${isActive ? "displayNone" : ""}`}
                >
                  <i className="material-icons-round">play_arrow</i>
                </Button>
              ) : (
                <button
                  // color="primary"
                  // variant="contained"
                  // size="large"
                  onClick={() => guessed(currentCard, user, lunchbox)}
                >
                  <i class="material-icons-round">done</i>
                </button>
              )}
            </div>
            {/* {setIsActive === true ? ( */}


            <button
              // color="primary"
              // variant="contained"
              // size="large"
              onClick={() => skip(currentCard, lunchbox)}
            >
              <i className="material-icons-round">skip_next</i>
            </button>

           
            <button onClick={() => nextTurn(partyId)}>NEXT TURN</button>
          </Box>
        </Grid>
    </Box>
  );
};

const mapState = ({ party, auth, lunchbox }) => {
  return {
    party: party || {},
    user: auth,
    lunchbox: lunchbox || [],
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
  };
};
export default connect(mapState, mapDispatch)(MidRound);




