import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const SelectMonth = (props) => {
  const onModalOpenHandler = (value) => {
    const dayjsMonth = dayjs(value);
    //month are zero index
    console.log(dayjsMonth.year(), dayjsMonth.month() + 1);
  };

  return (
    <>
      <DatePicker picker="month" onChange={onModalOpenHandler} />
    </>
  );
};

export default SelectMonth;
