import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import BlkForm from "./BlkForm";

const BlkList = ({ HULL_SQ }) => {
  const [blkList, setBlkList] = useState([]);

  const listFetch = async () => {
    const result = await AdminHandler.getBlkList(HULL_SQ);

    if (result !== undefined) setBlkList(result);
  };

  useEffect(async () => {
    listFetch();
  }, [HULL_SQ]);

  return (
    <>
      <h1>블럭리스트</h1>
      <hr />
      <div>
        {blkList.length > 0 &&
          blkList.map((blkinfo) => {
            return <BlkForm key={blkinfo.BLK_SQ} blkInfo={blkinfo} />;
          })}
      </div>
    </>
  );
};

export default BlkList;
