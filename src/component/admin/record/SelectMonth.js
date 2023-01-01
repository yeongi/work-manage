import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import InstantModal from "../../../lib/InstantModal";
import MonthRecord from "./MonthRecord";

const SelectMonth = (props) => {
  const [ym, setYM] = useState("");

  const onModalOpenHandler = (value) => {
    const day = dayjs(value);
    const month =
      day.month() + 1 > 9 ? day.month() + 1 : "0" + (day.month() + 1);
    const year = day.year();
    const yearMonth = [year, month].join("-");
    setYM(yearMonth);
  };

  return (
    <>
      <DatePicker picker="month" onChange={onModalOpenHandler} />
      <InstantModal title={"월 별 업무 기록 내역"} YearMonth={ym}>
        <MonthRecord />
      </InstantModal>
      ;
    </>
  );
};

export default SelectMonth;
