import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import { message } from "antd";
import "./index.css";
import QuestionCard from "@/components/questionCard";

/**
 * 题目详情页
 * @param params
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;
  let question;
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

  return (
    <div id="questionPage">
      <QuestionCard question={question} />
    </div>
  );
}
