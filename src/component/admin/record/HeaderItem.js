import classes from "./HeaderItem.module.css";
import { v4 } from "uuid";

const HeaderItem = ({ items }) => {
  return (
    <div className={classes.wrapper}>
      {items.map((item) => {
        return (
          <div key={v4()} className={classes.item}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default HeaderItem;
