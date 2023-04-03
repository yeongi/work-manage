import { useEffect, useState } from "react";
import AdminHandler from "../../../../lib/handler/AdminHandler";
import useModalState from "../../../../lib/state/useMyModal";
import { Button, Form, Input, Modal, Checkbox } from "antd";
import classes from "./HullModal.module.css";

const HullModal = ({ hullInfo }) => {
  const [open, setOpen] = useState(false);
  const { MyModal, openModalFunc } = useModalState("업데이트 완료");
  const [hull, setHull] = useState({});

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  useEffect(async () => {
    //hull 정보가 맞으면
    if (hullInfo !== undefined) {
      setHull(hullInfo);
      await form.setFieldsValue({
        HULL_NO: hullInfo.HULL_NO,
        HULL_TYPE: hullInfo.HULL_TYPE,
        SHIPYARD: hullInfo.SHIPYARD,
        complete: hullInfo.complete,
      });

      setOpen(true);
    }
    if (hullInfo === undefined) setOpen(false);
  }, [hullInfo]);

  // const completeHandler = async (hullsq) => {
  //   const result = await AdminHandler.updateHullComplte(hullsq);
  //   openModalFunc(result.message);
  //   setHull(result.data);
  //   console.log("페치된 데이터", result.data);
  //   console.log("hull 상태", hull);
  // };

  if (hull !== undefined) {
    return (
      <>
        <Modal
          title="선체 정보 조회 및 수정"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => {
            setOpen(false);
          }}
          width={900}
        >
          {
            <section>
              <h3>선체 정보</h3>
              <article className={classes["info-wrapper"]}>
                <div>
                  <p>조선소</p>
                  <hr />
                  <h3>{hull.SHIPYARD}</h3>
                </div>
                <div>
                  <p>선체 종류</p>
                  <hr />
                  <h3>{hull.HULL_TYPE}</h3>
                </div>
                <div>
                  <p>선체 번호</p>
                  <hr />
                  <h3>{hull.HULL_NO}</h3>
                </div>
                <div>
                  <p>작업 완료 여부</p>
                  <hr />
                  <h3>{hull.complete === 0 ? "작업 진행 중" : "작업 완료"}</h3>
                </div>
              </article>
            </section>
          }
          <section className={classes["form-wrapper"]}>
            <Form
              form={form}
              name="horizontal_login"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item
                name="SHIPYARD"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="SHIPYARD" />
              </Form.Item>

              <Form.Item
                name="HULL_TYPE"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="HULL_TYPE" />
              </Form.Item>

              <Form.Item
                name="HULL_NO"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="HULL_NO" />
              </Form.Item>

              <Form.Item name="complete" valuePropName="checked">
                <Checkbox>complete</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {"업데이트"}
                </Button>
              </Form.Item>
            </Form>
          </section>

          <MyModal />
        </Modal>
      </>
    );
  }

  return <h1>로딩중</h1>;
};
export default HullModal;
