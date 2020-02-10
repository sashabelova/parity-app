import React, { Component } from 'react';
import { connect } from 'react-redux';
import fanLogo from '../../assets/img/fan-icon.png';
import autoLogo from '../../assets/img/automode-icon.png';

class Thermostat extends Component {
  state = {
    current: 17,
    disabled: true,
    fanActive: false,
    autoActive: false,
    coolActive: false,
    heatActive: false
  };

  onTurnClick = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onUpClick = () => {
    this.setState({ current: this.state.current + 1 });
  };
  onLowClick = () => {
    this.setState({ current: this.state.current - 1 });
  };

  onFanClick = () => {
    this.setState({ fanActive: !this.state.fanActive });
  };

  onAutoClick = () => {
    this.setState({ autoActive: !this.state.autoActive, coolActive: false, heatActive: false });
  };

  onCoolClick = () => {
    if (this.state.coolActive === true) {
      this.setState({ coolActive: false });
    } else {
      // random number to increase temperature
      let random = Math.floor(Math.random() * 20);
      this.setState({ coolActive: true, autoActive: false });
      setTimeout(() => {
        this.setState(state => ({
          current: state.current - random
        }));
      }, 1500);
    }
    if (this.state.heatActive === true) {
      this.setState({ heatActive: false });
    }
  };

  onHeatClick = () => {
    if (this.state.heatActive === true) {
      this.setState({ heatActive: false });
    } else {
      // random number to decrease temperature
      let random = Math.floor(Math.random() * 20);
      this.setState({ heatActive: true, autoActive: false });
      setTimeout(() => {
        this.setState(state => ({
          current: state.current + random
        }));
      }, 1500);
    }
    if (this.state.coolActive === true) {
      this.setState({ coolActive: false });
    }

    this.setState({ heatActive: !this.state.heatActive });
    if (this.state.coolActive === true) {
      this.setState({ coolActive: false });
    }
  };

  render() {
    return (
      <div className="therm-wrapper">
        <button onClick={this.onTurnClick}>Turn {this.state.disabled ? 'ON' : 'OFF'}</button>

        <div className="therm-container">
          <button
            className="themp-controller up"
            aria-label="increase temperature"
            disabled={this.state.disabled}
            onClick={this.onUpClick}
          />
          <div>{this.state.current}</div>
          <button
            className="themp-controller"
            aria-label="decrease temperature"
            disabled={this.state.disabled}
            onClick={this.onLowClick}
          />
          <div className="therm-btn-block">
            {this.state.fanActive ? <img alt="fan logo" src={fanLogo} /> : ''}
            <button disabled={this.state.disabled} onClick={this.onFanClick}>
              Fan {this.state.fanActive ? 'OFF' : 'ON'}
            </button>
          </div>

          <div className="therm-btn-block">
            {this.state.autoActive ? <img alt="auto mode logo" src={autoLogo} /> : ''}
            <button disabled={this.state.disabled} onClick={this.onAutoClick}>
              Auto {this.state.autoActive ? 'OFF' : 'ON'}
            </button>
          </div>

          <div>
            <button
              aria-label="cool mode"
              className={'cool ' + (this.state.coolActive ? 'active' : '')}
              disabled={this.state.disabled}
              onClick={this.onCoolClick}
            />
            <button
              aria-label="heat mode"
              className={'heat ' + (this.state.heatActive ? 'active' : '')}
              disabled={this.state.disabled}
              onClick={this.onHeatClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // articles: state.articlesReducer.articles,
    // temp: state.tempReducer.temp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //onGetArticles: url => dispatch(actions.getTemperatures())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thermostat);
