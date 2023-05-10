import { Form, Select } from "antd";

const SelectBlk = ({ onChangedBlk, onChangedHull, hullList, blockList }) => {
  //선체, 블럭, 업무 기록 선택

  const [form] = Form.useForm();

  const onChangedHullInForm = async (hull) => {
    onChangedHull(hull);
    form.setFieldValue("blk", null);
  };

  return (
    <Form form={form}>
      <Form.Item>
        <Select
          style={{ width: 400 }}
          placeholder="선체를 선택해 주세요."
          onChange={onChangedHullInForm}
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
      <Form.Item name="blk">
        <Select
          style={{ width: 400 }}
          fieldNames="blk"
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
  );
};

export default SelectBlk;
