import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";
import { useEffect, useState } from "react";
import useModalState from "hooks/useModalState";
import useWorkList from "hooks/useWorkList";
import useGetBlkList from "hooks/useGetBlkList";
import empHandler from "lib/handler/EmpHander";
import { DForm, DCheckFormItem, DFormItem } from "component/common/form/DForm";
import { BoldDescription } from "component/common/description/Description";
import { twoDateDisable, todayDayJs } from "utils/dayJs";
import classes from "./Form.module.css";
import { filterListWithHullTypeShipYard } from "lib/Hull";

const format = "YYYY-MM-DD HH:mm:ss";

const AddWorkRecordForm = ({ refreshHandler, addWorkRecordInfo, emp_no }) => {
  const { hullList, hullArray, blockList, getBlkList } = useGetBlkList();
  const { workList, filteredWorkList, workListFiltered } = useWorkList();
  const [hull_sq, setHullSq] = useState(0);
  const [hullInfo, setHullInfo] = useState({ HULL_TYPE: 0, SHIPYARD: 0 });

  const [componentDisabled, setDisabled] = useState(true);

  const { ModalElement, openModalWithSetting } = useModalState("업무기록제출");

  useEffect(() => {
    setDisabled(false);
  }, []);

  const [form] = Form.useForm();

  const onChangedHullType = async (HULL_SQ) => {
    workListFiltered(HULL_SQ, workList);

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

    if (HULL_SQ === 1) {
      setHullSq(1);
      form.setFieldValue("HULL_SQ", "기타업무");
      form.setFieldValue("BLK_SQ", 1);
    }
  };

  const onChangedHullNo = async (HULL_SQ) => {
    setHullSq(HULL_SQ);
    await getBlkList(HULL_SQ);
    form.setFieldValue("BLK_SQ", undefined);
    form.setFieldValue("WORK_CODE", undefined);
    form.setFieldValue("INP_MH", undefined);
  };

  const onFinish = async ({
    BLK_SQ,
    DATE_TIME,
    HULL_SQ,
    INP_MH,
    WORK_CODE,
  }) => {
    setDisabled(true);
    const result = await empHandler.addWorkRecord({
      BLK_SQ,
      HULL_SQ: hull_sq,
      INP_MH: Math.floor(INP_MH * 10) / 10,
      WORK_CODE,
      DATE_TIME: DATE_TIME.format(),
      EMP_NO: emp_no,
    });

    addWorkRecordInfo(result.RECORD_ID);

    openModalWithSetting({
      message: "업무기록 제출을 완료하였습니다.",
      okHandler: () => {
        form.resetFields();
        refreshHandler();
        setDisabled(false);
      },
    });
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["form-wrapper"]}>
      <h3>업무 내역 추가 하기</h3>
      <ModalElement />
      <DForm formRef={form} disabled={componentDisabled} onFinish={onFinish}>
        <DCheckFormItem
          label="날짜를 선택해주세요"
          name="DATE_TIME"
          checkMessage="날짜를 선택해주세요"
        >
          <DatePicker
            placeholder="날짜를 선택해주세요"
            initialValues={todayDayJs}
            disabledDate={twoDateDisable}
            format={format}
          />
        </DCheckFormItem>
        <BoldDescription ment={"날짜는 금일 기준 2일까지 선택가능 합니다."} />

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
          label="HULL"
          name="HULL_SQ"
          checkMessage="선체를 선택해주세요!"
        >
          <Select
            style={{ width: 450 }}
            placeholder="선체 번호를 선택해 주세요."
            onChange={onChangedHullNo}
            options={filterListWithHullTypeShipYard(hullList, hullInfo)}
          ></Select>
        </DCheckFormItem>
        <BoldDescription ment="선체와 블럭이 필요없는 업무기록의 경우에는 기타 업무를 선택해주세요." />
        <DCheckFormItem
          label="BLOCK"
          name="BLK_SQ"
          checkMessage="블럭을 선택하세요!"
        >
          <Select
            style={{ width: 450 }}
            placeholder="블럭을 선택해 주세요."
            options={
              hull_sq === 1
                ? [
                    {
                      key: 1,
                      label: "기타 업무",
                      value: 1,
                    },
                  ]
                : blockList.map(
                    ({
                      BLK_NO,
                      BLK_SQ,
                      COMPLETE,
                      HULL_SQ,
                      NORM_MH,
                      RES_MH,
                    }) => {
                      return {
                        key: BLK_SQ,
                        label: `블럭 번호 : ${BLK_NO} / 실적 시수 : ${RES_MH} / 계획 시수 : ${NORM_MH}`,
                        value: BLK_SQ,
                      };
                    }
                  )
            }
          />
        </DCheckFormItem>
        <DCheckFormItem
          label="WORK"
          name="WORK_CODE"
          checkMessage="업무를 선택해 주세요!"
        >
          <Select
            style={{ width: 450 }}
            placeholder="업무를 선택해 주세요."
            options={filteredWorkList.map(
              ({ WORK_CODE, WORK_TYPE, WORK_DES }) => {
                return {
                  label: `업무 구분 : ${WORK_TYPE} / 
                  세부 사항 : ${WORK_DES}`,
                  value: WORK_CODE,
                };
              }
            )}
          />
        </DCheckFormItem>
        <BoldDescription
          ment={"업무를 추가적으로 입력하시려면 관리자님께 문의해주세요!"}
        />
        <DCheckFormItem
          label="투입 M/H"
          name="INP_MH"
          checkMessage="투입 시수를 입력해 주세요!"
        >
          <InputNumber placeholder="M/H" step={0.5} min={0} max={24} />
        </DCheckFormItem>
        <BoldDescription ment="투입시수는 0.5 M/H 단위로 입력가능하며 필수로 입력해야 합니다." />
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

export default AddWorkRecordForm;
