import { v4 } from "uuid";

const mappingHeader = (header) => {
  return <p key={v4()}>{header}</p>;
};

export default mappingHeader;
