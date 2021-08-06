export const validadeInputTime = (timeToValidade) => {
  const timePattern = /^([1-5][0-9]|[1-9])m\s([1-5][0-9]|[1-9])s$|^([1-5][0-9]|[1-9])(m|s)$/;

  return timeToValidade.match(timePattern);
};

