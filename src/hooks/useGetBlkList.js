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
      const filteredHullArr = await hList.map(
        ({ HULL_TYPE, SHIPYARD, HULL_SQ }) => {
          return { HULL_TYPE, SHIPYARD, HULL_SQ };
        }
      );

      if (hList.length) {
        setHullArray(filteredHullArr);
        hList.reverse();
        hList.pop();
        setHullList(hList.filter((list) => list.complete === 0));
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
