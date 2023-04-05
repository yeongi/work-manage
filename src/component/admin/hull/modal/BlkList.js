import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";

const BlkList = ({ HULL_SQ }) => {
  const [blkList, setBlkList] = useState([]);

  const listFetch = async () => {
    const result = await AdminHandler.getBlkList(HULL_SQ);

    setBlkList(result);
  };

  useEffect(() => {
    listFetch();
  }, [HULL_SQ]);

  return (
    <>
      <h1>블럭리스트</h1>
      <hr />
      {blkList.map(({ BLK_NO, BLK_SQ, HULL_SQ, NORM_MH, RES_MH }) => {
        return (
          <ol>
            <li>{BLK_NO}</li>
            <li>{BLK_SQ}</li>
            <li>{HULL_SQ}</li>
            <li>{NORM_MH}</li>
            <li>{RES_MH}</li>
          </ol>
        );
      })}
    </>
  );
};

export default BlkList;
