const dayjs = require("dayjs");

const dayJsDDMMYYYY = (dayjsObj) => dayjsObj.format("DD/MM/YYYY");

const workRecordArr = () => {
  const arr = [];

  const today = dayjs(new Date());

  for (let i = 0; i < 7; i += 1) {
    arr.push({ WORK_DATE: dayJsDDMMYYYY(today.subtract(i, "day")) });
  }

  return arr;
};

module.exports = { workRecordArr, dayJsDDMMYYYY };
