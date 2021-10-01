import axios from 'axios';

export const SET_CLUEGIVER = 'SET_CLUEGIVER';

export const _setClueGiver = (cluegiver) => {
  return { type: SET_CLUEGIVER, cluegiver };
};

export const setClueGiver = (cluegiverId) => {
  return async (dispatch) => {
    //try a history.push to midround just to make sure at least that is working
    //then the answer might just be both socket the thunk AND redirect

    const res = await axios.get(`/api/parties/cluegiver/${cluegiverId}`);

    const cluegiver = await res.data;

    dispatch(_setClueGiver(cluegiver));
  };
};

//Reducer

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CLUEGIVER:
      return action.cluegiver;

    default:
      return state;
  }
};
