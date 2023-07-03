import classes from "./Description.module.css";

export const BoldDescription = ({ ment }) => {
  return <p className={classes.description}>{ment}</p>;
};
