import { useEffect, useState } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import AddBlockForm from "./AddBlockForm";
import AddHullForm from "./AddHullForm";
import classes from "./HullManage.module.css";

const HullManage = () => {
  const [hullList, setHullList] = useState([]);

  const getList = async () => {
    const list = await AdminHandler.getHullList();
    setHullList(list);
    return;
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={classes["manage-wrapper"]}>
      <div className={classes["hull-item"]}>
        <section className={classes["hull-wrapper"]}>
          <h1>선체 추가</h1>
          <AddHullForm refreshHandler={getList} />
        </section>
        <section className={classes["block-wrapper"]}>
          <h1>블럭 추가</h1>
          <AddBlockForm hullList={hullList} />
        </section>
        <section className={classes["delete-wrapper"]}>
          <h1>선체 / 블럭 삭제</h1>
        </section>
      </div>
    </div>
  );
};

export default HullManage;