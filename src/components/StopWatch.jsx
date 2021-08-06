import React from 'react';
import '../css/stopwatch.css'
import * as timeFunctions from '../functions/time';
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

    this.state = {
      time: 0,
      temporaryTime: '',
      minutes: 0,
      seconds: 0,
      startCountdownDisabled: true,
      showTimer: false,
      showButtons: true,
    };
  }

  handleInputTime = ({ target }) => {
    const isValid = timeFunctions.validadeInputTime(target.value);
    this.setState({
      startCountdownDisabled: !isValid,
    });
  }

  handleFastTimer = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      minutes: 3,
      showTimer: !prevState.showTimer,
    }))

  }

  handleBreakTimer = (event) => {
    event.preventDefault();
  }
  
  handleGeoGuessrTimer = (event) => {
    event.preventDefault();
  }
  
  handleRandomTimer = (event) => {
    event.preventDefault();
  }
  
  setStartCountdown = (event) => {
    event.preventDefault();
    this.setState({
      showButtons: false,
    })
  }

  render() {
    const { startCountdownDisabled, minutes, seconds, showTimer, showButtons } = this.state;
    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0');
    return(
      <div className="stopwatch-container">
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
        <>
        <form className="form-container">
          <div className="customInterval">
            <input
              type="text"
              onChange={ this.handleInputTime }
              placeholder="Ex.: 3m 25s"
              />
            <button
              disabled={ startCountdownDisabled }
              spellCheck={false}
              onClick={ this.setStartCountdown }
            >
              {startCountdownDisabled ? <MdAlarmOff /> : <MdAlarmOn />}
              Iniciar timer
            </button>
          </div>
          {showButtons ? 
            (  
            <div className="options">
              <button
                onClick={ this.handleFastTimer }
              >
                <BiTimer />
                Vamos rápido
              </button>
              <button
                onClick={ this.handleBreakTimer }
                >
                <MdLocalCafe />
                Tempo para um café
              </button>
              <button
                onClick={ this.handleGeoGuessrTimer }
                >
                <MdLocationOn />
                GeoGuessr
              </button>
              <button
                onClick={ this.handleRandomTimer }
              >
                <BiShuffle />
                Aleatório
              </button>
            </div>) : null
          }
          
        </form>
        </>
      </div>
    )
  }
}
