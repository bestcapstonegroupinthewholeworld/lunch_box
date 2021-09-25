import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPartyInfo } from '../../store/party';
import { useParams, useLocation } from 'react-router-dom';

const MidRound = ({ party, user, lunchbox, getPartyInfo }) => {
  const { partyId, clueGiverId } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    getPartyInfo(partyId, user.id, pathname);
  }, []);

  return (
    <div>
      <button>START ROUND</button>
      <button>CHECK</button>
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
  };
};
export default connect(mapState, mapDispatch)(MidRound);
