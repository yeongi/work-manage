import { useCallback, useEffect, useState } from "react";
import AdminHandler from "lib/handler/AdminHandler";
import BlkList from "./BlkList";
import useModalState from "hooks/useModalState";
import { Button, Form, Input, Modal, Checkbox } from "antd";
import classes from "./HullModal.module.css";

const HullModal = ({ hullInfo, refreshHandler }) => {
  const { ModalElement, openModalWithSetting } = useModalState("업데이트 완료");

  const [open, setOpen] = useState(false);
  const [hull, setHull] = useState({});

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await AdminHandler.updateHullComplte({
      ...values,
      HULL_SQ: hullInfo.HULL_SQ,
      complete: values.complete === true ? 1 : 0,
    });

    if (result.status === 200) {
      openModalWithSetting({
        message: result.message,
      });
      setHull(values);
    }
  };

  const onCheckHullInfo = useCallback(
    async (hi) => {
      //hull 정보가 맞으면
      if (hi !== undefined) {
        setHull(hi);

        await form.setFieldsValue({
          HULL_NO: hi.HULL_NO,
          HULL_TYPE: hi.HULL_TYPE,
          SHIPYARD: hi.SHIPYARD,
          complete: hi.complete,
        });

        setOpen(true);
      }
      if (hi === undefined) setOpen(false);
    },
    [form]
  );

  useEffect(() => {
    onCheckHullInfo(hullInfo);
  }, [onCheckHullInfo, hullInfo]);

  const closeHandler = async () => {
    await refreshHandler();
    setOpen(false);
  };

  if (hull !== undefined) {
    return (
      <>
        {/* TODO: fix modal form element */}
        <Modal
          title="선체 정보 조회 및 수정"
          centered
          open={open}
          onOk={closeHandler}
          onCancel={closeHandler}
          width={1000}
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
                  <p>선체 번호</p>
                  <hr />
                  <h3>{hull.HULL_NO}</h3>
                </div>
                <div>
                  <p>선체 종류</p>
                  <hr />
                  <h3>{hull.HULL_TYPE}</h3>
                </div>

                <div>
                  <p>작업 완료 여부</p>
                  <hr />
                  <h3>
                    {hull.complete === 0 || hull.complete === false
                      ? "작업 진행 중"
                      : "작업 완료"}
                  </h3>
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
                name="HULL_NO"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="HULL_NO" />
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
              <Form.Item name="complete" valuePropName="checked">
                <Checkbox>complete</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {"선체 정보 업데이트"}
                </Button>
              </Form.Item>
            </Form>
          </section>
          <section>
            {hullInfo !== undefined ? (
              <BlkList HULL_SQ={hullInfo.HULL_SQ} />
            ) : (
              <h1>블럭리스트</h1>
            )}
          </section>

          <ModalElement />
        </Modal>
      </>
    );
  }

  return <h1>로딩중</h1>;
};
export default HullModal;
