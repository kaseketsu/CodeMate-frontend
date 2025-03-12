import { updateQuestionUsingPost } from "@/api/questionController";
import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost, deleteQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost, removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading("正在更新");
  try {
    await updateQuestionUsingPost(fields);
    hide();
    message.success("更新成功");
    return true;
  } catch (error: any) {
    hide();
    message.error("更新失败，" + error.message);
    return false;
  }
};

/**
 * 更新所属题库弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  //获取所属题库列表
  const getCurrentBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId: questionId,
        pageSize: 200,
      });
      const list = (res.data?.records || []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList" as any, list);
    } catch (e) {
      message.error("获取所属题库失败, " + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentBankIdList();
    }
  }, [questionId]);

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
      title={"更新所属题库"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.Item label={"所属题库"} name="questionBankIdList">
          <Select
            mode={"multiple"}
            style={{ width: "100%" }}
            options={questionBankList.map((item) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
            onSelect={async (value) => {
              const hide = message.loading("正在更新题库");
              try {
                await addQuestionBankQuestionUsingPost({
                  questionId: questionId,
                  questionBankId: value,
                });
                hide();
                message.success("更新题库成功");
              } catch (e) {
                hide();
                message.error("更新题库失败, " + e.message);
              }
            }}
            onDeselect={async (value) => {
              const hide = message.loading("正在移除题库");
              try {
                await removeQuestionBankQuestionUsingPost({
                  questionId: questionId,
                  questionBankId: value,
                });
                hide();
                message.success("移除题库成功");
              } catch (e) {
                hide();
                message.error("移除题库失败, " + e.message);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBankModal;
