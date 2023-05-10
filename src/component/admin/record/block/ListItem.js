import { useState } from "react";
import classes from "./ListItem.module.css";
import { v4 } from "uuid";
import { BlockPutForm } from "./BlockPutForm";

const ListItem = ({
  BLK_SQ,
  INP_MH,
  RECORD_NO,
  items,
  getBlkWorkRecordList,
}) => {
  const [putMode, setPutMode] = useState(false);

  const changeModeHandler = () => {
    setPutMode((prev) => !prev);
  };

  return (
    <>
      <div className={classes.wrapper} onClick={changeModeHandler}>
        {items.map((item) => {
          return (
            <div key={v4()} className={classes.item}>
              {item}
            </div>
          );
        })}
      </div>
      {putMode && (
        <BlockPutForm
          INP_MH={INP_MH}
          BLK_SQ={BLK_SQ}
          RECORD_NO={RECORD_NO}
          getBlkWorkRecordList={getBlkWorkRecordList}
          closeHandler={changeModeHandler}
        />
      )}
    </>
  );
};

export default ListItem;
