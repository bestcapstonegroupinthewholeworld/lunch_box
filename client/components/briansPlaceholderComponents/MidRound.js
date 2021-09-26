import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPartyInfo } from '../../store/party';
import { useParams, useLocation } from 'react-router-dom';
import { pickACard, guessed } from '../../store/lunchbox';
import CountdownClock from '../CountDown';

const MidRound = ({
  party,
  user,
  lunchbox,
  getPartyInfo,

  pickACard,
  guessed,
}) => {
  const { partyId, clueGiverId } = useParams();
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getPartyInfo(partyId, user.id, pathname);
  }, []);

  const currentCard = lunchbox.filter((card) => card.status === 'current')[0];

  return (
    <div>
      <button
        onClick={() => {
          pickACard(lunchbox);
          setIsActive(true);
        }}
      >
        START ROUND
      </button>
      <div>
        {currentCard && <h1>{currentCard.name}</h1>}
        <div>
          <CountdownClock isActive={isActive} />
        </div>
      </div>
      <button onClick={() => guessed(currentCard, user, lunchbox)}>
        CHECK
      </button>
      <button>SKIP</button>
    </div>
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
  };
};
export default connect(mapState, mapDispatch)(MidRound);
