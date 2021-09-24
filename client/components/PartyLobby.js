import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import SVGFile from './PartyLobbySvg'
import VideoCall from '../components/VideoCall';

import { fetchCards, addCard } from '../store/lunchbox';
import { makeRandomTeams } from '../store/party';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { fetchCards, addCard } from '../store/lunchbox';
import { makeRandomTeams, getPartyInfo } from '../store/party';
import { useParams } from 'react-router-dom';


/** STYLES **/
const useStyles = makeStyles((theme) => ({
  partyLobbyOuter: {
    position: 'relative',
    height: 'calc(100vh - 130px)',
  },
  partyLobbyVideos: {
    height: 'calc((100vh - 130px)/2)',
    display: 'block',
    flexWrap: 'wrap',
    position: 'relative',
    marginLeft: '3em'
  },
  partyLobbyBottom: {
    marginLeft: '3em'
  },
}));

/** COMPONENT **/
const PartyLobby = ({
  user,
  game,
  fetchCards,
  party,
  userCards,
  addCard,
  makeRandomTeams,
  getPartyInfo,
}) => {
  const classes = useStyles();
  const [word, setWord] = useState('');

  let params = useParams();

  useEffect(() => {
    getPartyInfo(params.partyId);
  }, []);

  console.log('PARTAYYYYY', party);

  const addToBox = () => {
    addCard({
      name: word,
      createdBy: user.id * 1,
      lunchboxId: party.game.lunchbox.id,
    });
    setWord('');
  };

  const createTeams = () => {
    makeRandomTeams(party.party.id);
  };

  return (
    <Box className={classes.partyLobbyOuter} ml={6} mr={6} pl={4} pr={4}>
      <div className="svgFile">
        <SVGFile />
      </div>

      <Box textAlign="center">
        <h1> Party Lobby </h1>
      </Box>
      <Box className={classes.partyLobbyVideos}>
        <div className="partyLobbyVideoSection">
          <VideoCall />
        </div>
      </Box>
      <Box className={classes.partyLobbyBottom}>
        <Grid container spacing={2}>
          <Grid container item xs={6} md={6}>
          { 
            userCards.length !== 10 
              ? 
                <div className="enterTheWord">
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="filled"
                    label="Enter a Word"
                    value={word}
                    onChange={(event) => setWord(event.target.value)}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={!word || game.cardsPerPlayer - userCards.length === 0}
                    onClick={addToBox}
                  >
                  Add a Word
                  </Button>
                  <h4 className="italicBlue"> Add items to your LunchBox. <span className="accentYellow">{(game.cardsPerPlayer ? game.cardsPerPlayer : 10) - (userCards.length ? userCards.length : 0)}</span> words left!</h4>
                </div>
              :
                <h3> All words have been added! </h3>
          }
          </Grid>
         <Box>
          <Button
             color="secondary"
             variant="contained"
             size="large"
             onClick={createTeams}
           >
             Create Teams
          </Button>
         </Box>  
        </Grid>
      </Box>
    </Box>
  );
};

const mapState = ({ party, auth }) => {
  return {
    party: party || {},
    game: party.game || {},
    user: auth,
    userCards: party.game
      ? party.game.lunchbox.cards.filter((card) => card.createdBy === auth.id)
      : [],
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCards: (lunchboxId) => {
      dispatch(fetchCards(lunchboxId));
    },
    addCard: (card) => {
      dispatch(addCard(card));
    },
    makeRandomTeams: (partyId) => {
      dispatch(makeRandomTeams(partyId, history));
    },
    getPartyInfo: (partyId) => {
      dispatch(getPartyInfo(partyId));
    },
  };
};

export default connect(mapState, mapDispatch)(PartyLobby);
