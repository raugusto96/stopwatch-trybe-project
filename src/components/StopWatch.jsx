import React from 'react';
import '../css/stopwatch.css'
import * as timeFunctions from '../functions/time';
import { Link } from 'react-router-dom';

import {
  MdAlarmOff,
  MdAlarmOn,
  MdLocalCafe,
  MdLocationOn,
} from 'react-icons/md';
import {
  BiTimer,
  BiShuffle,
} from 'react-icons/bi';

export default class StopWatch extends React.Component {
  constructor() {
    super();

    this.initialState = {
      time: 0,
      temporaryTime: '',
      minutes: 0,
      seconds: 0,
      startCountdownDisabled: true,
      showTimer: false,
      countdownEnd: false,
    }

    this.state = this.initialState;

    this.countdownTimeout = null;
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.time !== this.state.time) {
      this.setMinutesAndSeconds();
      if (this.state.time > 0) this.startCountdown();
      else if (!this.state.countdownCanceled) {
        this.setState({ showTimer: false, countdownEnd: true });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.countdownTimeout);
  }

  handleInputTime = ({ target }) => {
    const isValid = timeFunctions.validadeInputTime(target.value);
    this.setState({
      startCountdownDisabled: !isValid,
      temporaryTime: target.value,
    });
  }

  setMinutesAndSeconds = () => {
    const { time } = this.state;
    const { convertTimeToMinutesAndSeconds } = timeFunctions;
    const { minutes, seconds } = convertTimeToMinutesAndSeconds(time);

    this.setState({ minutes, seconds });
  }

  customInterval = (event) => {
    event.preventDefault();
    const { convertCustomTimeToSeconds } = timeFunctions;
    let { temporaryTime } = this.state;

    const time = convertCustomTimeToSeconds(temporaryTime);

    this.setState({
      time,
      temporaryTime: '',
      startCountdownDisabled: true,
      showTimer: true,
    });
  }

  startCountdown = () => {
    const { time } = this.state;
    this.countdownTimeout = setTimeout(() => {
      this.setState({
        ...this.initialState,
        time: time -1,
        showTimer: true,
        countdownEnd: false,
      })
    }, 1000);
  }

  cancelCountdown = () => {
    clearTimeout(this.countdownTimeout);
    this.setState({ time: 0, showTimer: false, countdownCanceled: true });
  }

  goBack = () => {
    this.setState({ showTimer: false, countdownEnd: true });
  }

  setFastTimer = () => {
    this.setState({
      temporaryTime: '3m',
    })
  }

  setCoffeeTimer = () => {
    this.setState({
      temporaryTime: '5m',
    })
  }

  setGeoGuessrTimer = () => {
    this.setState({
      temporaryTime: '10m',
    })
  }

  setRandomTimer = () => {
    const min = 1;
    const max = 60;
    const timeInMinutes = Math.floor(Math.random() * (max - min + 1) + min);
    const timeInSeconds = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(timeInMinutes, timeInSeconds);
    this.setState({
      temporaryTime: `${timeInMinutes}m ${timeInSeconds}s`,
    })
  }

  render() {
    const { startCountdownDisabled, minutes, seconds, showTimer, temporaryTime } = this.state;
    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0');
    return(
      <div className="stopwatch-container">
        <header className="stopwatch-header">
          <span className="fixed-text">Work in Progress</span>
        </header>
        <div className="stopwatch-timer">
          <div className="minutes">
            {showTimer &&
              <>
                <span className="minuteLeft">{minutesLeft}</span>
                <span className="minuteRight">{minutesRight}</span>
              </>
            }
          </div>
          {showTimer && <span>:</span>}
          {showTimer 
            &&
            <>
              <div className="seconds">
                <span className="secondLeft">{secondsLeft}</span>
                <span className="secondRight">{secondsRight}</span>
              </div>
            </>
          }
        </div>
        { showTimer ? 
          (
            <button onClick={ this.cancelCountdown } className="cancelButton">
              <MdAlarmOff />
              Cancelar
            </button>
          ) : 
          (
            <>
              <form className="form-container" onSubmit={ this.customInterval }>
                <div className="customInterval">
                  <input
                    type="text"
                    onChange={ this.handleInputTime }
                    placeholder="Ex.: 3m 25s"
                    value={ temporaryTime }
                    />
                  <button
                    disabled={ startCountdownDisabled }
                    spellCheck={false}
                    >
                    {startCountdownDisabled ? <MdAlarmOff /> : <MdAlarmOn />}
                    Iniciar timer
                  </button>
                </div>
                <div className="options">
                  <button
                    onClick={ this.setFastTimer }
                  >
                    <BiTimer />
                    Vamos rápido
                  </button>
                  <button
                    onClick={ this.setCoffeeTimer }
                    >
                    <MdLocalCafe />
                    Tempo para um café
                  </button>
                  <button
                    onClick={ this.setGeoGuessrTimer }
                    >
                    <MdLocationOn />
                    GeoGuessr
                  </button>
                  <button
                    onClick={ this.setRandomTimer }
                    >
                    <BiShuffle />
                    Aleatório
                  </button>
                </div>
              </form>
            </>
          )
        };
    </div>
    )
  }
}
