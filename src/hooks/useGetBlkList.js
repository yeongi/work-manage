import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../lib/handler/AdminHandler";

const useGetBlkList = () => {
  const [blk_sq, setBlkSq] = useState(0);
  const [hull_sq, setHullSq] = useState(0);
  const [blockList, setBlkList] = useState([]);
  const [hullList, setHullList] = useState([]);

  const getHullList = useCallback(async () => {
    const serverHullList = await AdminHandler.getHullList();
    serverHullList.reverse();
    serverHullList.pop();
    setHullList(serverHullList.filter((list) => list.complete === 0));
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
    blockList,
    getHullList,
    getBlkList,
  };
};

export default useGetBlkList;
