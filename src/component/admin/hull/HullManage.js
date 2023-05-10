import AddBlockForm from "./block/AddBlockForm";
import HullList from "./hullList/HullList";
import AddHullForm from "./hull/AddHullForm";
import classes from "./HullManage.module.css";
import { useAdminHullList } from "../../../lib/state/useAdminHullList";

const HullManage = () => {
  const { hullList, getHullList } = useAdminHullList();

  return (
    <div className={classes["manage-wrapper"]}>
      <div className={classes["hull-item"]}>
        <section className={classes["hull-wrapper"]}>
          <h1>선체 추가</h1>
          <AddHullForm refreshHandler={getHullList} />
        </section>
        <section className={classes["block-wrapper"]}>
          <h1>블럭 추가</h1>
          <AddBlockForm hullList={hullList} refreshHandler={getHullList} />
        </section>
        <section className={classes["list-wrapper"]}>
          <HullList hullList={hullList} refreshHandler={getHullList} />
        </section>
      </div>
    </div>
  );
};

export default HullManage;
