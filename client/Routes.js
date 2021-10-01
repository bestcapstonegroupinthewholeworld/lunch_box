import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import JoinHost from "./components/JoinHost";
import RulesLunchBox from "./components/RulesLunchBox";
import Host from "./components/Host";
import PartyLobby from "./components/PartyLobby";
import VideoCall from "./components/VideoCall";
import CountdownClock from "./components/CountDown";
// import SocketIo from "./components/forSocketIo";
import { me } from "./store";
import MidRound from "./components/briansPlaceholderComponents/MidRound";
import { TimeProvider } from "./components/TimeContext";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <TimeProvider>
        <div>
          {isLoggedIn ? (
            <Switch>
              <Route path="/home" component={Home} />

              <Route path="/party/host/:partyId" component={Host} />
              <Route path="/party/join" component={PartyLobby} />
              <Route path="/party" exact component={JoinHost} />
              <Route path="/party/:partyId" exact component={PartyLobby} />

              <Route path="/countdown" exact component={CountdownClock} />

              <Route path="/chatroom" component={VideoCall} />

              {/* <Route path="/socket" component={SocketIo} /> */}

              <Route path="/rules/lunchbox" exact component={RulesLunchBox} />

              <Route
                path="/dummyround/:partyId/:clueGiverId"
                component={MidRound}
              />

              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          )}
        </div>
      </TimeProvider>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    party: state.party,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
