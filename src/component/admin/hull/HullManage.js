import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import AddBlockForm from "./AddBlockForm";
import HullList from "./HullList";
import AddHullForm from "./AddHullForm";
import classes from "./HullManage.module.css";

const HullManage = () => {
  const [hullList, setHullList] = useState([]);

  const getList = useCallback(async () => {
    const list = await AdminHandler.getHullList();
    const reverseList = [...list].reverse();
    reverseList.pop();
    setHullList(reverseList);
    return;
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div className={classes["manage-wrapper"]}>
      <div className={classes["hull-item"]}>
        <section className={classes["hull-wrapper"]}>
          <h1>선체 추가</h1>
          <AddHullForm refreshHandler={getList} />
        </section>
        <section className={classes["block-wrapper"]}>
          <h1>블럭 추가</h1>
          <AddBlockForm hullList={hullList} refreshHandler={getList} />
        </section>
        <section className={classes["list-wrapper"]}>
          <HullList hullList={hullList} refreshHandler={getList} />
        </section>
      </div>
    </div>
  );
};

export default HullManage;
