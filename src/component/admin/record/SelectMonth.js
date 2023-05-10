import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import InstantModal from "./month/InstantModal";
import MonthRecord from "./month/MonthRecord";
import { dayJsYM } from "lib/dayJs";

const SelectMonth = () => {
  const [ym, setYM] = useState("");

  const onModalOpenHandler = (value) => {
    const day = dayjs(value);
    setYM(dayJsYM(day));
  };

  return (
    <>
      <DatePicker picker="month" onChange={onModalOpenHandler} />
      <InstantModal title={"월 별 업무 기록 내역"} YearMonth={ym}>
        <MonthRecord ym={ym} />
      </InstantModal>
    </>
  );
};

export default SelectMonth;
