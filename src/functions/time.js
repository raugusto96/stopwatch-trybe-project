export const validadeInputTime = (timeToValidade) => {
  const timePattern = /^([1-5][0-9]|[1-9])m\s([1-5][0-9]|[1-9])s$|^([1-5][0-9]|[1-9])(m|s)$/;

  return timeToValidade.match(timePattern);
};

export const convertTimeToMinutesAndSeconds = (time) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');

  return {
    minutes,
    seconds,
  };
};

export const convertCustomTimeToSeconds = (temporaryTime) => {
  temporaryTime = temporaryTime.split(/\s/);

  let seconds = 0;

  temporaryTime.forEach((unit) => {
    if (unit.includes('m')) {
      const temporaryMinutes = unit.replace('m', '');
      const minutesInSeconds = Math.floor(temporaryMinutes * 60);
      seconds += minutesInSeconds;
    } else {
      let temporarySeconds = unit.replace('s', '');
      temporarySeconds = temporarySeconds % 60;
      seconds += temporarySeconds;
    }
  })

  return seconds;
};
