"use client";
import { Avatar, Card, List, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import TagList from "@/components/tagList";

interface Props {
  questionList: API.QuestionVO[];
  cardTitle?: string;
  questionBankId?: number;
}

/**
 * 题库列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionList, cardTitle, questionBankId } = props;
  return (
    <Card className="question-list" title={cardTitle}>
      <List
        dataSource={questionList}
        renderItem={(item) => (
          <List.Item extra={<TagList tagList={item.tagList} />}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/bank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default QuestionList;
