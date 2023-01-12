import { Form, Select } from "antd";
import { useEffect } from "react";
import AdminHandler from "../../../lib/handler/AdminHandler";
import useGetBlkList from "../../../lib/state/useGetBlkList";

const SelectBlk = ({ onChangedBlk, selectHull }) => {
  //선체, 블럭, 업무 기록 선택

  const { hullList, blockList, getHullList, getBlkList } = useGetBlkList();

  const onChangedHull = async (hull) => {
    selectHull(hull);
    await getBlkList(hull);
  };

  useEffect(() => {
    getHullList();
  }, []);

  return (
    <div>
      <Form>
        <Form.Item>
          <Select
            style={{ width: 500 }}
            placeholder="선체를 선택해 주세요."
            onChange={onChangedHull}
          >
            {hullList.length > 0 &&
              hullList.map(({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD }) => {
                return (
                  <Select.Option value={HULL_SQ} key={HULL_SQ}>
                    {`
                  선체 번호 : ${HULL_NO} /선체 종류 : ${HULL_TYPE} / 조선소 : ${SHIPYARD}`}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            style={{ width: 500 }}
            placeholder="블럭을 선택해 주세요."
            onChange={onChangedBlk}
          >
            {blockList.length > 0 &&
              blockList.map(
                ({ BLK_NO, BLK_SQ, COMPLETE, HULL_SQ, NORM_MH, RES_MH }) => {
                  return (
                    <Select.Option value={BLK_SQ} key={BLK_SQ}>
                      {`블럭 번호 : ${BLK_NO} / 
                  실적 시수 : ${RES_MH} / 
                  계획 시수 : ${NORM_MH}`}
                    </Select.Option>
                  );
                }
              )}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SelectBlk;
