import React from "react";
import { DatePicker } from "antd";
import { dayJsYM } from "../../lib/dayJs";

const SelectMonthEmp = ({ onSelectYmHandler }) => {
  const onChangeMonth = (value) => {
    const ym = dayJsYM(value);
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])$/);
    if (regex.test(ym)) onSelectYmHandler(ym);
  };

  return (
    <>
      <DatePicker picker="month" onChange={onChangeMonth} />
    </>
  );
};

export default SelectMonthEmp;
