import classes from "./HeaderItem.module.css";
import mappingHeader from "lib/MappingHeader";

const HeaderItem = ({ items }) => {
  return <div className={classes.wrapper}>{items.map(mappingHeader)}</div>;
};

export default HeaderItem;
