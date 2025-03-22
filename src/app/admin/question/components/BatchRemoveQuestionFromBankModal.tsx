import { updateQuestionUsingPost } from "@/api/questionController";
import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
    addQuestionBankQuestionByBatchUsingPost,
    addQuestionBankQuestionUsingPost,
    deleteQuestionBankQuestionUsingPost,
    listQuestionBankQuestionVoByPageUsingPost, removeQuestionBankQuestionByBatchUsingPost,
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
 * 批量从题库移除题目弹窗
 * @param props
 * @constructor
 */
const BatchRemoveQuestionFromBankModal: React.FC<Props> = (props) => {
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

    const doSubmit = async (values: API.QuestionBankQuestionBatchRemoveRequest) => {
        const hide = message.loading("正在从题库中移除题目...");
        const questionBankId = values.questionBankId;
        if (!questionBankId) {
            return;
        }
        try {
            await removeQuestionBankQuestionByBatchUsingPost({
                questionBankId,
                questionIdList,
            });
            hide();
            message.success("移除成功");
            onSubmit?.();
        } catch (e) {
            hide();
            message.error("移除失败, " + e.message);
        }
    };

    useEffect(() => {
        getBankList();
    }, []);

    return (
        <Modal
            destroyOnClose
            title={"批量从题库移除题目"}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
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
                        移除
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default BatchRemoveQuestionFromBankModal;
