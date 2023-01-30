import classes from "./ListItem.module.css";
import { v4 } from "uuid";

const ListItem = ({ items }) => {
  console.log(items);
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

export default ListItem;
