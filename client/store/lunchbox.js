import axios from 'axios';

//ACTION TYPES
const FETCHED_CARDS = 'FETCHED_CARDS';
const ADDED_CARD = 'ADDED_CARD';

//ACTION CREATOR

const fetchedCards = (cards) => ({ type: FETCHED_CARDS, cards });

const addedCard = (card) => ({ type: ADDED_CARD, card });

//THUNK CREATOR

export const fetchCards = (lunchboxId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/lunchboxes/${lunchboxId}`);
    const cards = res.data;
    dispatch(fetchedCards(cards));
  };
};

export const addCard = (card) => {
  return async (dispatch) => {
    const res = await axios.post('/api/lunchboxes', card);
    const newCard = res.data;
    dispatch(addedCard(newCard));
  };
};

//Reducer

export default (state = [], action) => {
  switch (action.type) {
    case FETCHED_CARDS:
      return action.cards;
      break;

    case ADDED_CARD:
      return [...state, action.card];
      break;

    default:
      return state;
  }
};
