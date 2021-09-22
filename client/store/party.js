import axios from 'axios';

//ACTION TYPES
const CREATED_PARTY = 'CREATED_PARTY';

//ACTION CREATOR

const createdParty = (party) => ({ type: CREATED_PARTY, party });

//THUNK CREATOR

export const createParty = (hostId, history) => {
  return async (dispatch) => {
    const res = await axios.post('/api/parties/host', { hostId });
    const party = res.data;
    dispatch(createdParty(party));
    history.push(`/party/host/${party.party.id}`);
  };
};

export const makeRandomTeams = (partyId) => {
  return async (dispatch) => {
    //should probably return teams and add to state somehow
    await axios.post(`/api/parties/teams/${partyId}`);
  };
};

//Reducer

export default (state = [], action) => {
  switch (action.type) {
    case CREATED_PARTY:
      return action.party;
      break;

    default:
      return state;
  }
};
