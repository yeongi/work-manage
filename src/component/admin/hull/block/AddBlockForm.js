import React from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import classes from "../HullManage.module.css";
import AdminHandler from "lib/handler/AdminHandler";
import useModalState from "lib/state/useMyModal";

const AddBlockForm = ({ hullList, refreshHandler }) => {
  const [form] = Form.useForm();

  const { MyModal, openModalFunc } = useModalState("추가");

  const onFinish = async (values) => {
    const result = await AdminHandler.addBlock(values);

    const blkInfoMsg = `
    블럭 번호 : ${values.BLK_NO}
    표준 시수 : ${values.NORM_MH}
    `;

    if (result) openModalFunc(blkInfoMsg + result.message);
    refreshHandler();
    form.resetFields();
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["block-input"]}>
      <MyModal />
      <Form
        form={form}
        name="basic"
        size="large"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="선체 번호"
          name="HULL_SQ"
          rules={[
            {
              required: true,
              message: "선체를 선택해 주세요!",
            },
          ]}
        >
          <Select style={{ width: 400 }} placeholder="선체를 선택해 주세요.">
            {hullList.length > 0 &&
              hullList.map((hull) => {
                return (
                  <Select.Option value={hull.HULL_SQ} key={hull.HULL_SQ}>
                    {`HULL_NO : ${hull.HULL_NO} / 
                  HULL_TYPE : ${hull.HULL_TYPE} / 
                  SHIPYARD : ${hull.SHIPYARD}`}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Form.Item
          label="블럭 번호"
          name="BLK_NO"
          rules={[
            {
              required: true,
              message: "블럭 번호를 입력해 주세요!",
            },
          ]}
        >
          <Input placeholder="BLOCK_NO" style={{ width: 400 }} />
        </Form.Item>

        <Form.Item
          label="표준 M/H"
          name="NORM_MH"
          rules={[
            {
              required: true,
              message: "표준 시수를 입력해 주세요!",
            },
          ]}
        >
          <InputNumber placeholder="M/H" />
        </Form.Item>
        <div style={{ float: "right" }}>
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
                등록하기
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddBlockForm;
