import axios from 'axios';
import { fetchCards } from './lunchbox';

//ACTION TYPES
const CREATED_PARTY = 'CREATED_PARTY';
const GOT_PARTY_INFO = 'GOT_PARTY_INFO';
import { ADDED_CARD } from './lunchbox';
const JOINED_PARTY = 'JOINED_PARTY';

//ACTION CREATOR

const createdParty = (party) => ({ type: CREATED_PARTY, party });
const gotPartyInfo = (party) => ({ type: GOT_PARTY_INFO, party });
const joinedParty = (user) => ({ type: JOINED_PARTY, user });

//THUNK CREATOR

export const joinParty = (partyId, userId) => {
  return async (dispatch) => {
    console.log('JOIN PARTY', userId);
    await axios.post(`/api/parties/join/${partyId}`, { id: userId });
    const res = await User.findByPk(userId);
    const user = await res.data;
    dispatch(joinedParty(user));
  };
};

export const createParty = (hostId, history) => {
  return async (dispatch) => {
    const res = await axios.post('/api/parties/host', { hostId });
    const party = res.data;
    dispatch(createdParty(party));

    history.push(`/party/host/${party.id}`);
  };
};

export const getPartyInfo = (partyId, userId) => {
  return async (dispatch) => {
    console.log('GET PARTY INFO', userId);
    let res = await axios.get(`/api/parties/${partyId}`);
    const party = await res.data;
    dispatch(fetchCards(party.game.lunchbox.id));
    dispatch(gotPartyInfo(party));
    if (!party.users.find((player) => player.id === userId)) {
      dispatch(joinParty(partyId, userId));
    }
  };
};

export const makeRandomTeams = (partyId, history) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/parties/teams/${partyId}`);
    const clueGiver = await res.data;

    history.push(`/dummyround/${partyId}/${clueGiver.id}`);
  };
};

//Reducer

export default (state = [], action) => {
  switch (action.type) {
    case CREATED_PARTY:
      return action.party;

    case GOT_PARTY_INFO:
      return action.party;

    case JOINED_PARTY:
      const joinedParty = state;
      newParty.users.push(action.user);
      return joinedParty;

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
