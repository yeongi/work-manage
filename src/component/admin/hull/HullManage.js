import AddBlockForm from "./AddBlockForm";
import AddHullForm from "./AddHullForm";
import classes from "./HullManage.module.css";

const HullManage = () => {
  return (
    <div className={classes["hull-wrapper"]}>
      <div className={classes["hull-item"]}>
        <section className={classes["input-wrapper"]}>
          <h1>선체 추가</h1>
          <AddHullForm />
          <hr />
          <h1>블럭 추가</h1>
          <AddBlockForm />s
        </section>
        <section>
          <h1>선체 / 블럭 삭제</h1>
        </section>
      </div>
    </div>
  );
};

export default HullManage;
