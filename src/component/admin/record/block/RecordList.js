import { useCallback, useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import classes from "./RecordList.module.css";
import { Button, Divider, Form, Input, List, Radio, Space } from "antd";
import HeaderItem from "./HeaderItem";
import ListItem from "./ListItem";
import dayjs from "dayjs";
import { dayJsYMD } from "../../../../lib/dayJs";
import NoFilterdtoExcel from "../../sheet/NoFilterdtoExcel";
import { HEADER } from "../../../../lib/const/List";
import { useForm } from "antd/es/form/Form";
const headers = HEADER.BLK_LIST;

const selectKeyword = [
  { label: "업무날짜", value: "WORK_DATE" },
  { label: "사원명", value: "EMP_NAME" },
  { label: "투입시수", value: "INP_MH" },
];

const RecordList = ({ block }) => {
  const [isLoading, setLoading] = useState(false);
  const [workRecordList, setList] = useState([{}]);
  const [fileName, setFileName] = useState("");
  const [form] = useForm();

  const getWorkRecordList = useCallback(async (block) => {
    setLoading(true);
    const list = await AdminHandler.getWorkRecordList(block);
    setList(list);
    if (list.length > 0) {
      const { BLK_NO, HULL_NO, HULL_TYPE, SHIPYARD } = list[0];
      setFileName(
        `${SHIPYARD}-${HULL_TYPE}-${HULL_NO}-${BLK_NO}-${dayJsYMD(
          dayjs(new Date())
        )}`
      );
    }
    setLoading(false);
  }, []);

  const onChangeKeyword = ({ condition, keyword }) => {
    setList((prev) =>
      prev.filter((list) => (list[condition] + "").includes(keyword + ""))
    );
  };

  useEffect(() => {
    getWorkRecordList(block);
  }, [getWorkRecordList, block]);

  return (
    <div className={classes.wrapper}>
      <Form onFinish={onChangeKeyword} form={form}>
        <Space>
          <Form.Item name="condition" initialValue={["EMP_NAME"]}>
            <Radio.Group options={selectKeyword} />
          </Form.Item>
          <Form.Item name="keyword">
            <Input style={{ width: 500 }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">검색 하기</Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                getWorkRecordList(block);
                form.resetFields();
              }}
            >
              초기화
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <Divider orientation="left"> 블럭별 업무 기록 리스트</Divider>
      <List
        size="large"
        header={
          <div>
            {!isLoading && (
              <NoFilterdtoExcel list={workRecordList} fileName={fileName} />
            )}
            <HeaderItem items={headers} />
          </div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        bordered
        dataSource={workRecordList}
        renderItem={({
          BLK_NO,
          EMP_NAME,
          EMP_NO,
          HULL_NO,
          HULL_TYPE,
          INP_MH,
          NORM_MH,
          RES_MH,
          SHIPYARD,
          WORK_CODE,
          WORK_DATE,
          WORK_DES,
          WORK_TYPE,
        }) => {
          return (
            <List.Item>
              <ListItem
                items={[
                  SHIPYARD,
                  HULL_NO,
                  HULL_TYPE,
                  BLK_NO,
                  WORK_TYPE,
                  WORK_DES,
                  EMP_NAME,
                  EMP_NO,
                  NORM_MH,
                  INP_MH,
                  dayJsYMD(dayjs(WORK_DATE)),
                ]}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default RecordList;
