import dayjs from "dayjs";

export const dayJsYM = (day) => {
  const month = day.month() + 1 > 9 ? day.month() + 1 : "0" + (day.month() + 1);
  const year = day.year();
  return [year, month].join("-");
};

export const dayJsYMD = (day) => {
  const month = day.month() + 1 > 9 ? day.month() + 1 : "0" + (day.month() + 1);
  const year = day.year();
  const date = day.date() > 9 ? day.date() : "0" + day.date();
  return [year, month, date].join("-");
};

export const dayJsMD = (day) => {
  const month = day.month() + 1 > 9 ? day.month() + 1 : "0" + (day.month() + 1);
  const date = day.date() > 9 ? day.date() : "0" + day.date();
  return [month, date].join("-");
};

export const twoDateDisable = (current) => {
  return !(
    dayjs().subtract(3, "day") < current && current < dayjs().add(2, "day")
  );
};

export const todayDayJs = () => {
  dayjs();
};
