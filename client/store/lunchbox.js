import axios from 'axios';

//ACTION TYPES
const FETCHED_CARDS = 'FETCHED_CARDS';
export const ADDED_CARD = 'ADDED_CARD';
const PICKED_CARD = 'PICKED_CARD';
const GUESSED_CARD = 'GUESSED_CARD';
const ROUND_FINISHED = 'ROUND_FINISHED';
const SKIPPED = 'SKIPPED';

//ACTION CREATOR

const fetchedCards = (cards) => ({ type: FETCHED_CARDS, cards });

const addedCard = (card) => ({ type: ADDED_CARD, card });

const pickedCard = (card) => ({ type: PICKED_CARD, card });

const guessedCard = (newBox) => ({ type: GUESSED_CARD, newBox });

const roundFinished = () => ({
  type: ROUND_FINISHED,
});
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

export const pickACard = (cards) => {
  return async (dispatch) => {
    let cardPool = cards.filter((card) => card.status === 'pending');
    if (!cardPool.length)
      cardPool = cards.filter((card) => card.status === 'skipped');

    if (!cardPool.length) {
      dispatch(roundFinished());
    } else {
      const currentCard = cardPool[Math.floor(Math.random() * cardPool.length)];
      const res = await axios.post(`/api/lunchboxes/pick/${currentCard.id}`);
      const newCurrent = await res.data;
      dispatch(pickedCard(newCurrent));
    }
  };
};

export const guessed = (card, user, lunchbox) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/lunchboxes/guess/${card.id}/${user.id}`);
    const updatedCard = await res.data;

    const newLunchbox = [...lunchbox].filter((_card) => _card.id !== card.id);
    newLunchbox.push(updatedCard);
    dispatch(guessedCard(newLunchbox));
    dispatch(pickACard(newLunchbox));
  };
};

export const skip = () => {};

//Reducer

export default (state = [], action) => {
  switch (action.type) {
    case FETCHED_CARDS:
      return action.cards;

    case ADDED_CARD:
      return [...state, action.card];
      break;

    case PICKED_CARD:
      const newCards = [...state].filter((card) => card.id !== action.card.id);

      return [...newCards, action.card];

    case GUESSED_CARD:
      return action.newBox;

    case ROUND_FINISHED:
      return state;

    default:
      return state;
  }
};
