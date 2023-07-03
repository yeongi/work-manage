import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../lib/handler/AdminHandler";

const useGetBlkList = () => {
  const [blk_sq, setBlkSq] = useState(0);
  const [hull_sq, setHullSq] = useState(0);
  const [blockList, setBlkList] = useState([]);
  const [hullList, setHullList] = useState([]);
  const [hullArray, setHullArray] = useState([]);

  const getHullList = useCallback(async () => {
    const serverHullList = await AdminHandler.getHullList();
    setHullList(serverHullList);

    const stateSetting = async (hList) => {
      const hash = {};

      if (hList.length) {
        hList.reverse();
        hList.pop();
        setHullList(hList.filter((list) => list.complete === 0));

        hList.forEach(({ HULL_TYPE, SHIPYARD, HULL_SQ }) => {
          const key = [HULL_TYPE, SHIPYARD].join(",");
          if (!(key in hash)) {
            hash[key] = HULL_SQ;
          }
        });

        const result = [];
        for (const hullStr in hash) {
          const [HULL_TYPE, SHIPYARD] = hullStr.split(",");
          result.push({
            HULL_TYPE,
            SHIPYARD,
            HULL_SQ: hash[hullStr],
          });
        }

        result.unshift({
          HULL_TYPE: "기타 업무",
          SHIPYARD: "기타 업무",
          HULL_SQ: 1,
        });

        setHullArray(result);
      }
    };

    stateSetting(serverHullList);
  }, []);

  const getBlkList = useCallback(async (hull) => {
    const blkList = await AdminHandler.getBlkList(hull);
    setBlkList(blkList);
  }, []);

  const onChangedBlk = async (blk) => {
    setBlkSq(blk);
  };

  const onChangedHull = async (hull) => {
    setHullSq(hull);
    await getBlkList(hull);
  };

  useEffect(() => {
    getHullList();
  }, [getHullList]);

  return {
    blk_sq,
    hull_sq,
    onChangedBlk,
    onChangedHull,
    hullList,
    hullArray,
    blockList,
    getHullList,
    getBlkList,
  };
};

export default useGetBlkList;
