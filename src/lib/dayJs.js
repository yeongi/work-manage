const dayJsYM = (day) => {
  const month = day.month() + 1 > 9 ? day.month() + 1 : "0" + (day.month() + 1);
  const year = day.year();
  return [year, month].join("-");
};

export default dayJsYM;
