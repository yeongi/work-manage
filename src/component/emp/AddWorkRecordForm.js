import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import empHandler from "../../lib/handler/EmpHander";
import { useLoginCtx } from "../../lib/store/LoginContext";
import useGetBlkList from "../../lib/state/useGetBlkList";

const format = "YYYY-MM-DD HH:mm:ss";

const AddWorkRecordForm = ({ workList }) => {
  const loginCtx = useLoginCtx();
  const { hullList, blockList, getHullList, getBlkList } = useGetBlkList();

  const onChangedHull = async (hull) => {
    await getBlkList(hull);
  };

  useEffect(() => {
    getHullList();
  }, []);

  const [form] = Form.useForm();

  const onFinish = async ({
    BLK_SQ,
    DATE_TIME,
    HULL_SQ,
    INP_MH,
    OVERTIME_MH,
    WORK_CODE,
  }) => {
    const result = await empHandler.addWorkRecord({
      BLK_SQ,
      HULL_SQ,
      INP_MH,
      OVERTIME_MH:
        OVERTIME_MH === undefined || OVERTIME_MH === "" ? 0 : OVERTIME_MH,
      WORK_CODE,
      DATE_TIME: DATE_TIME.format(),
      EMP_NO: loginCtx.state.EMP_NO,
    });

    //to do: alert로 사용자에게 알리기

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
                  세부 사항 : ${WORK_DES}`}
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
          <InputNumber placeholder="M/H" step={0.5} />
        </Form.Item>

        <Form.Item
          label="야근 M/H : 야근 시수가 있다면 입력해 주세요."
          name="OVERTIME_MH"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Space>
            <InputNumber placeholder="M/H" step={0.5} />
          </Space>
        </Form.Item>

        <Form.Item
          label="날짜를 선택하지 않으면 당일로 지정됩니다."
          name="DATE_TIME"
        >
          <DatePicker
            placeholder="M/H"
            initialValues={dayjs()}
            format={format}
          />
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
