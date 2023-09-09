import AddBlockForm from "./block/AddBlockForm";
import HullList from "./hullList/HullList";
import AddHullForm from "./hull/AddHullForm";
import classes from "./HullManage.module.css";
import { useAdminHullList } from "../../../hooks/useAdminHullList";
import { Button } from "antd";
import { useState } from "react";

const HullManage = () => {
  const { hullArray, hullList, getHullList, filterHullTypeArr } =
    useAdminHullList();

  const [hullType, setHullType] = useState(undefined);

  return (
    <div className={classes["manage-wrapper"]}>
      <div className={classes["hull-item"]}>
        <section className={classes["hull-wrapper"]}>
          <h1>선체 추가</h1>

          <AddHullForm refreshHandler={getHullList} />
        </section>
        <section className={classes["block-wrapper"]}>
          <h1>블럭 추가</h1>
          <AddBlockForm
            hullArray={hullArray}
            hullList={hullList}
            refreshHandler={getHullList}
          />
        </section>
        <section className={classes["list-wrapper"]}>
          <h1>선체 리스트</h1>
          {filterHullTypeArr.map((hullType) => {
            return (
              <Button
                type="dashed"
                shape="circle"
                size="nomarl"
                onClick={() => {
                  setHullType(hullType);
                }}
              >
                {hullType}
              </Button>
            );
          })}
          <HullList
            hullList={
              hullType
                ? hullList.filter(
                    ({ HULL_TYPE }) => HULL_TYPE.split(" ")[1] === hullType
                  )
                : hullList
            }
            refreshHandler={getHullList}
          />
        </section>
      </div>
    </div>
  );
};

export default HullManage;
