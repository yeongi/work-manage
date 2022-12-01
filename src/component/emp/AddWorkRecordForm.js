import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { useEffect, useState } from "react";
import AdminHandler from "../../lib/handler/AdminHandler";

const AddWorkRecordForm = ({ workList }) => {
  const [blockList, setBlkList] = useState([]);
  const [hullList, setHullList] = useState([]);

  const getHullList = async () => {
    const serverHullList = await AdminHandler.getHullList();
    setHullList(serverHullList);
  };

  const getBlkList = async (hull_no) => {
    //to do : complete 된 블럭은 안가져 오기
    const blkList = await AdminHandler.getBlkList(hull_no);
    setBlkList(blkList);
  };

  const onChangedHull = async (hull) => {
    getBlkList(hull);
  };

  useEffect(() => {
    getHullList();
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // BLK_SQ
    // HULL_SQ
    // INP_MH
    // WORK_CODE

    console.log(values);
    form.resetFields();
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div>
      <h1>업무 내역</h1>

      <Form
        form={form}
        name="basic"
        size="large"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="HULL"
          name="HULL_SQ"
          rules={[
            {
              required: true,
              message: "선체를 골라주세요!",
            },
          ]}
        >
          <Select
            style={{ width: 500 }}
            placeholder="선체를 선택해 주세요."
            onChange={onChangedHull}
          >
            {hullList.map(({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD }) => {
              return (
                <Select.Option value={HULL_SQ} key={HULL_SQ}>
                  {`
                  선체 번호 : ${HULL_NO} /선체 종류 : ${HULL_TYPE} / 조선소 : ${SHIPYARD}`}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="BLOCK"
          name="BLK_SQ"
          rules={[
            {
              required: true,
              message: "블럭을 골라주세요!",
            },
          ]}
        >
          <Select style={{ width: 500 }} placeholder="블럭을 선택해 주세요.">
            {blockList.map(
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
        <Form.Item
          label="WORK"
          name="WORK_CODE"
          rules={[
            {
              required: true,
              message: "업무를 선택해 주세요!",
            },
          ]}
        >
          <Select style={{ width: 500 }} placeholder="업무를 선택해 주세요.">
            {workList.map(({ WORK_CODE, WORK_TYPE, WORK_DES }) => {
              return (
                <Select.Option value={WORK_CODE} key={WORK_CODE}>
                  {`업무 구분 : ${WORK_TYPE} / 
                  업무 설명 : ${WORK_DES}`}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="투입 M/H"
          name="INP_MH"
          rules={[
            {
              required: true,
              message: "투입 시수를 입력해 주세요!",
            },
          ]}
        >
          <InputNumber placeholder="M/H" />
        </Form.Item>

        <Form.Item
          label="야근 M/H"
          name="OVERTIME_MH"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Space>
            <InputNumber placeholder="M/H" />
            <label>야근 시수가 있다면 입력해 주세요.</label>
          </Space>
        </Form.Item>

        <div style={{ float: "left" }}>
          <Form.Item>
            <Space>
              <Button htmlType="button" onClick={resetHandler}>
                Reset
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                제출하기
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddWorkRecordForm;
