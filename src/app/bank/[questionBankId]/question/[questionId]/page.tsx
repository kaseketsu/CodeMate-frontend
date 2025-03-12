import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import {Flex, Menu, message} from "antd";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import './index.css'
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import {Content} from "antd/es/layout/layout";
import QuestionCard from "@/components/questionCard";
import Link from "next/link";

export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  let question;
  let bank;
  //获取题库信息
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
  //获取题目信息
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (error) {
    message.error("获取题目失败, " + error.message);
  }
  if (!question) {
    return <div>获取题目详情失败, 请刷新重试</div>;
  }
  //定义菜单列表
  const questionMenuItems = (bank.questionPage?.records ?? []).map((q) => {
    return {
      label: <Link href={`/bank/${bank.id}/question/${q.id}`}>{q.title}</Link>,
      key: q.id,
    }
  })

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme={"light"} style={{padding: "20px 0"}}>
          <Title level={4} style={{padding: "0 20px"}}>{bank.title}</Title>
          <Menu items={questionMenuItems} selectedKeys={[question.id]}/>
        </Sider>
        <Content>
          <QuestionCard question={question} />
        </Content>
      </Flex>
    </div>
  )

}
