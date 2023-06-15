import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../lib/handler/AdminHandler";
import { dayJsYMD } from "utils/dayJs";
import dayjs from "dayjs";

export const useBlkWorkRecordList = (block_sq) => {
  const [workRecordList, setList] = useState([{}]);
  const [fileName, setFileName] = useState("");

  const getBlkWorkRecordList = useCallback(async () => {
    const list = await AdminHandler.getWorkRecordList(block_sq);
    setList(list);
    if (list.length > 0) {
      const { BLK_NO, HULL_NO, HULL_TYPE, SHIPYARD } = list[0];
      setFileName(
        `${SHIPYARD}${HULL_TYPE}${HULL_NO}${BLK_NO}${dayJsYMD(
          dayjs(new Date())
        )}`
      );
    }
  }, [block_sq]);

  const onChangeKeyword = ({ condition, keyword }) => {
    setList((prev) =>
      prev.filter((list) => (list[condition] + "").includes(keyword + ""))
    );
  };

  useEffect(() => {
    getBlkWorkRecordList(block_sq);
  }, [getBlkWorkRecordList, block_sq]);

  return { workRecordList, getBlkWorkRecordList, onChangeKeyword, fileName };
};
