import { updateQuestionUsingPost } from "@/api/questionController";
import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  deleteQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionIdList: number[];
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 批量添加题目到题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  //获取题库列表
  const getBankList = async () => {
    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize: 200,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records || []);
    } catch (e) {
      message.error("获取题库列表失败, " + e.message);
    }
  };

  useEffect(() => {
    getBankList();
  }, []);



  return (
    <Modal
      destroyOnClose
      title={"批量向题库添加题目"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={() => {}}>
        <Form.Item label={"选择题库"} name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
