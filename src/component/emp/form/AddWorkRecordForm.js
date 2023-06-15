import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import empHandler from "lib/handler/EmpHander";
import { useLoginCtx } from "store/LoginContext";
import useGetBlkList from "hooks/useGetBlkList";
import classes from "./Form.module.css";
import useModalState from "hooks/useMyModal";

const format = "YYYY-MM-DD HH:mm:ss";

const AddWorkRecordForm = ({ workList, refreshHandler, addWorkRecordInfo }) => {
  const loginCtx = useLoginCtx();
  const { hullList, blockList, getBlkList } = useGetBlkList();
  const [hull_no, setHullNo] = useState(0);
  const [filteredWorkList, setWorkList] = useState(workList);
  const [componentDisabled, setDisabled] = useState(true);

  const workListFitered = (hullsq) => {
    if (hullsq === 1) {
      const filteredList = workList.filter((work) => {
        return !(work.WORK_TYPE === "본작업" || work.WORK_TYPE === "개정작업");
      });
      setWorkList(filteredList);
    }
    if (hullsq !== 1) {
      const filteredList = workList.filter((work) => {
        return work.WORK_TYPE === "본작업" || work.WORK_TYPE === "개정작업";
      });
      setWorkList(filteredList);
    }
  };

  const { MyModal, openModalFunc } = useModalState("업무기록제출");

  useEffect(() => {
    setDisabled(false);
  }, []);

  const [form] = Form.useForm();

  const onChangedHull = async (hull) => {
    setHullNo(hull);
    workListFitered(hull);
    await getBlkList(hull);
    form.setFieldValue("BLK_SQ", undefined);
    form.setFieldValue("WORK_CODE", undefined);
    form.setFieldValue("INP_MH", undefined);
  };

  const disabledDate = (current) => {
    return !(
      dayjs().subtract(3, "day") < current && current < dayjs().add(2, "day")
    );
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
      HULL_SQ,
      INP_MH: Math.floor(INP_MH * 10) / 10,
      WORK_CODE,
      DATE_TIME: DATE_TIME.format(),
      EMP_NO: loginCtx.state.EMP_NO,
    });

    //이걸 이용해서 redux로 전역으로 관리 하자.
    addWorkRecordInfo(result.RECORD_ID);

    openModalFunc("업무기록 제출을 완료하였습니다.", () => {
      form.resetFields();
      refreshHandler();
      setDisabled(false);
    });
  };

  const resetHandler = () => {
    form.resetFields();
  };

  return (
    <div className={classes["form-wrapper"]}>
      <h3>업무 내역 추가 하기</h3>
      <MyModal />
      <Form
        form={form}
        name="basic"
        size="large"
        disabled={componentDisabled}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="날짜를 선택해주세요"
          name="DATE_TIME"
          rules={[
            {
              required: true,
              message: "날짜를 선택해주세요",
            },
          ]}
        >
          <DatePicker
            placeholder="날짜를 선택해주세요"
            initialValues={dayjs()}
            disabledDate={disabledDate}
            format={format}
          />
        </Form.Item>
        <p className={classes.description}>
          날짜는 금일 기준 <b>2일</b>까지 선택가능 합니다.
        </p>
        <Form.Item
          label="HULL"
          name="HULL_SQ"
          rules={[
            {
              required: true,
              message: "선체를 선택해주세요!",
            },
          ]}
        >
          <Select
            style={{ width: 450 }}
            placeholder="선체를 선택해 주세요."
            onChange={onChangedHull}
            options={[
              {
                label: "기타 업무",
                options: [{ label: "기타 업무", value: 1 }],
              },
              {
                label: "선체",
                options: hullList.map(
                  ({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD }) => {
                    return {
                      label: `
                      선체 번호 : ${HULL_NO} /선체 종류 : ${HULL_TYPE} / 조선소 : ${SHIPYARD}`,
                      value: HULL_SQ,
                    };
                  }
                ),
              },
            ]}
          ></Select>
        </Form.Item>
        <p className={classes.description}>
          선체와 블럭이 필요없는 업무기록의 경우에는 <b>"기타 업무"</b>를
          선택해주세요.
        </p>
        <Form.Item
          label="BLOCK"
          name="BLK_SQ"
          rules={[
            {
              required: true,
              message: "블럭을 선택하세요!",
            },
          ]}
        >
          <Select style={{ width: 450 }} placeholder="블럭을 선택해 주세요.">
            {hull_no === 1 && (
              <Select.Option value={1} key={1}>
                기타 업무
              </Select.Option>
            )}
            {hull_no !== 1 &&
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
          <Select style={{ width: 450 }} placeholder="업무를 선택해 주세요.">
            {filteredWorkList.map(({ WORK_CODE, WORK_TYPE, WORK_DES }) => {
              return (
                <Select.Option value={WORK_CODE} key={WORK_CODE}>
                  {`업무 구분 : ${WORK_TYPE} / 
                  세부 사항 : ${WORK_DES}`}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <p className={classes.description}>
          업무를 추가적으로 입력하시려면 관리자님께 문의해주세요!
        </p>

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
          <InputNumber placeholder="M/H" step={0.5} min={0} max={24} />
        </Form.Item>
        <p className={classes.description}>
          투입시수는 0.5 M/H 단위로 입력가능하며 필수로 입력해야 합니다.
        </p>
        <div>
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

export default AddWorkRecordForm;
