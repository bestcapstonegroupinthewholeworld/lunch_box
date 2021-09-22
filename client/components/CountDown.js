import React from "react";

export default class CountdownClock extends React.Component {
  state = {
    isActive: false,
    secondsElapsed: 1800000 / 1000,
  };

  getMinutes() {
    return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(
      -2
    );
  }

  getSeconds() {
    return ("0" + Math.floor(this.state.secondsElapsed % 60)).slice(-2);
  }

  startTime = () => {
    this.setState({ isActive: true });

    this.countdown = setInterval(() => {
      this.setState(({ secondsElapsed }) => ({
        secondsElapsed: secondsElapsed - 1,
      }));
    }, 1000);
  };

  resetTime = () => {
    clearInterval(this.countdown);
    this.setState({
      secondsElapsed: 1800000 / 1000,
      isActive: false,
    });
  };

  pauseTime = () => {
    clearInterval(this.countdown);
    this.setState({ isActive: false });
  };

  render() {
    return (
      <div className="countDown_container">
        <div className="text">
          <span className="countDownMin">{this.getMinutes()}</span>
          <span className="countDownColon">:</span>
          <span className="countDownSec">{this.getSeconds()}</span>
        </div>

        <div className="text-reflect">
          <span className="countDownMin">{this.getMinutes()}</span>
          <span className="countDownColon">:</span>
          <span className="countDownSec">{this.getSeconds()}</span>
        </div>
        {/* ========================== pause button ============================  */}
        <div className="countDownFrame">
          <button className="countDownBtn" onClick={this.pauseTime}>
            <i className="material-icons-round">pause</i>
          </button>
          {/* ========================== play button ============================  */}
          <button
            className="countDownBtn"
            onClick={this.state.isActive ? this.pauseTime : this.startTime}
          >
            <i className="material-icons-round">play_arrow</i>
          </button>
          {/* ========================== reset button ============================  */}
          <button className="countDownBtn" onClick={this.resetTime}>
            <i className="material-icons-round">replay</i>
          </button>
        </div>
      </div>
    );
  }
}
