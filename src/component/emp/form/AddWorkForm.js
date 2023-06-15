import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import empHandler from "lib/handler/EmpHander";

const AddWorkForm = ({ workList, refreshHandler }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    const result = await empHandler.addWork(values);
    if (result) alert(result.message);
    refreshHandler();
    form.resetFields();
    return;
  };

  return (
    <div>
      <div>
        {/* 나중에 업무 삭제로 구현하기 */}
        {/* {workList.length > 0 &&
          workList.map(({ WORK_CODE, WORK_TYPE, WORK_DES }) => {
            return (
              <p key={WORK_CODE}>
                업무 구분 : {WORK_TYPE} | 업무 설명 :{WORK_DES}
              </p>
            );
          })} */}
      </div>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="WORK_TYPE"
          rules={[
            {
              required: true,
              message: "업무 종류를 입력하세요.",
            },
          ]}
        >
          <Input placeholder="업무 종류" />
        </Form.Item>
        <Form.Item
          name="WORK_DES"
          rules={[
            {
              required: true,
              message: "업무 상세 내용을 입력하세요.",
            },
          ]}
        >
          <Input placeholder="업무 상세 내용" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              추가하기
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWorkForm;
