import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { DForm, DCheckFormItem, DFormItem } from "component/common/form/DForm";
import classes from "../HullManage.module.css";
import AdminHandler from "lib/handler/AdminHandler";
import useModalState from "hooks/useModalState";
import { filterListWithHullTypeShipYard } from "lib/Hull";

const AddBlockForm = ({ hullArray, hullList, refreshHandler }) => {
  const [form] = Form.useForm();

  const { ModalElement, openModalWithSetting } = useModalState("추가");
  const [hullInfo, setHullInfo] = useState({ HULL_TYPE: 0, SHIPYARD: 0 });

  const onFinish = async (values) => {
    const result = await AdminHandler.addBlock(values);

    const blkInfoMsg = `
    블럭 번호 : ${values.BLK_NO}
    표준 시수 : ${values.NORM_MH}
    `;

    if (result) {
      openModalWithSetting({
        message: blkInfoMsg + result.message,
      });
    }

    refreshHandler();
    form.resetFields();
  };

  const onChangedHullType = async (HULL_SQ) => {
    const { HULL_TYPE, SHIPYARD } = hullArray.find(
      (hull) => hull.HULL_SQ === HULL_SQ
    );

    setHullInfo(() => {
      return { HULL_TYPE, SHIPYARD };
    });

    form.setFieldValue("HULL_SQ", undefined);
    form.setFieldValue("BLK_SQ", undefined);
    form.setFieldValue("WORK_CODE", undefined);
    form.setFieldValue("INP_MH", undefined);
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["block-input"]}>
      <ModalElement />
      <DForm formRef={form} onFinish={onFinish}>
        <DCheckFormItem
          label="HULL_TYPE"
          name="HULL_TYPE"
          checkMessage="조선소/ 선체종류를 선택해주세요!"
        >
          <Select
            style={{ width: 450 }}
            placeholder="조선소/ 선체종류를 선택해주세요!"
            onChange={onChangedHullType}
            options={hullArray.map(({ HULL_TYPE, SHIPYARD, HULL_SQ }) => {
              return {
                key: HULL_SQ,
                label: `선체 종류 : ${HULL_TYPE} / 조선소 : ${SHIPYARD}`,
                value: HULL_SQ,
              };
            })}
          ></Select>
        </DCheckFormItem>
        <DCheckFormItem
          label="선체 번호"
          name="HULL_SQ"
          checkMessage="선체를 선택해 주세요!"
        >
          <Select
            placeholder="선체를 선택해 주세요."
            options={filterListWithHullTypeShipYard(hullList, hullInfo)}
          ></Select>
        </DCheckFormItem>

        <DCheckFormItem
          label="블럭 번호"
          name="BLK_NO"
          checkMessage="블럭 번호를 입력해 주세요!"
        >
          <Input placeholder="BLOCK_NO" style={{ width: 400 }} />
        </DCheckFormItem>

        <DCheckFormItem
          label="표준 M/H"
          name="NORM_MH"
          checkMessage={"표준 시수를 입력해 주세요!"}
        >
          <InputNumber placeholder="M/H" />
        </DCheckFormItem>
        <DFormItem>
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
        </DFormItem>
      </DForm>
    </div>
  );
};

export default AddBlockForm;
