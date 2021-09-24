import axios from 'axios';
import { fetchCards } from './lunchbox';

//ACTION TYPES
const CREATED_PARTY = 'CREATED_PARTY';
const GOT_PARTY_INFO = 'GOT_PARTY_INFO';
import { ADDED_CARD } from './lunchbox';

//ACTION CREATOR

const createdParty = (party) => ({ type: CREATED_PARTY, party });
const gotPartyInfo = (party) => ({ type: GOT_PARTY_INFO, party });

//THUNK CREATOR

export const createParty = (hostId, history) => {
  return async (dispatch) => {
    const res = await axios.post('/api/parties/host', { hostId });
    const party = res.data;
    dispatch(createdParty(party));
    history.push(`/party/host/${party.id}`);
  };
};

export const getPartyInfo = (partyId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/parties/${partyId}`);
    const party = await res.data;
    dispatch(fetchCards(party.game.lunchbox.id));
    dispatch(gotPartyInfo(party));
  };
};

export const makeRandomTeams = (partyId, history) => {
  return async (dispatch) => {
    //should probably return teams and add to state somehow
    await axios.post(`/api/parties/teams/${partyId}`);
    const clueGiverId = 'ineedtoderivethisid';
    history.push(`/dummyround/${partyId}/${clueGiverId}`);
  };
};

//Reducer

export default (state = [], action) => {
  switch (action.type) {
    case CREATED_PARTY:
      return action.party;

    case GOT_PARTY_INFO:
      return action.party;

    case ADDED_CARD:
      const newParty = state;
      console.log('newParrtty', newParty);
      console.log(action.card);
      newParty.game.lunchbox.cards.push(action.card);
      return newParty;

    default:
      return state;
  }
};
