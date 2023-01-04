import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import InstantModal from "./InstantModal";
import MonthRecord from "./MonthRecord";
import { dayJsYM } from "../../../lib/dayJs";

const SelectMonth = (props) => {
  const [ym, setYM] = useState("");

  const onModalOpenHandler = (value) => {
    const day = dayjs(value);
    setYM(dayJsYM(day));
  };

  return (
    <>
      <DatePicker picker="month" onChange={onModalOpenHandler} />
      <InstantModal title={"월 별 업무 기록 내역"} YearMonth={ym}>
        <MonthRecord />
      </InstantModal>
    </>
  );
};

export default SelectMonth;
