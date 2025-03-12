"use client";
import "./index.css";
import { Card, Divider } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/tagList";
import MdViewer from "@/components/mdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
  question: API.QuestionVO;
}

const QuestionCard = (props: Props) => {
  const { question } = props;
  //签到
  useAddUserSignInRecord();
  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: "16px" }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: "16px" }} />
      <Card title={"推荐答案"}>
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionCard;
