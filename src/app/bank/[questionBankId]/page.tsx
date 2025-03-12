"use server";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { Avatar, Button, Card, message, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/questionList";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;
  let bank = undefined;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      queryQuestion: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    message.error("获取题库失败, " + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败, 请刷新重试</div>;
  }

  //获取第一道题目
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage?.records?.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={66} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type={"secondary"}>{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${bank.id}/question/${firstQuestionId}`}
                target={"_blank"}
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionBankId={bank.id}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题目列表（${bank.questionPage?.total ?? 0}）`}
      />
    </div>
  );
}
