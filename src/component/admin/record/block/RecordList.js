import classes from "./RecordList.module.css";
import { Button, Divider, Form, Input, List, Radio, Space } from "antd";
import HeaderItem from "./HeaderItem";
import ListItem from "./ListItem";
import dayjs from "dayjs";
import NoFilterdtoExcel from "component/admin/sheet/NoFilterdtoExcel";
import { HEADER } from "constant/List";
import { useForm } from "antd/es/form/Form";
import { dayJsYMD } from "utils/dayJs";
const headers = HEADER.BLK_LIST;

const selectKeyword = [
  { label: "업무날짜", value: "WORK_DATE" },
  { label: "사원명", value: "EMP_NAME" },
  { label: "업무 종류 ", value: "WORK_TYPE" },
  { label: "업무 내용 ", value: "WORK_DES" },
  { label: "투입시수", value: "INP_MH" },
];

const RecordList = ({
  workRecordList,
  fileName,
  getBlkWorkRecordList,
  resetHandler,
  onChangeKeyword,
}) => {
  const [form] = useForm();

  return (
    <div className={classes.wrapper}>
      <Divider orientation="left"> 블럭별 업무 기록 리스트</Divider>
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
                getBlkWorkRecordList();
                form.resetFields();
              }}
            >
              목록 초기화
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <List
        size="large"
        header={
          <div>
            {<NoFilterdtoExcel list={workRecordList} fileName={fileName} />}
            <HeaderItem items={headers} />
          </div>
        }
        footer={<div>제작자 ＠github : yeongi</div>}
        bordered
        dataSource={workRecordList}
        renderItem={({
          RECORD_NO,
          BLK_NO,
          BLK_SQ,
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
                RECORD_NO={RECORD_NO}
                INP_MH={INP_MH}
                BLK_SQ={BLK_SQ}
                resetHandler={resetHandler}
                items={[
                  RECORD_NO,
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
