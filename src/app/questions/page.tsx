"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { message } from "antd";
import {listQuestionVoByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/questionTable";

/**
 * 题目页
 * @constructor
 */
export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  //获取搜索参数
  const { q: searchText } = searchParams;
  let questionList = [];
  const pageSize = 12;
  let total = 0;
  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize,
      sortField: "_score",
      sortOrder: "desc",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    message.error("获取题目列表失败, " + e.message);
  }
  return (
    <div id="questionPage" className="max-width-content">
      <Title level={3}>题目大全</Title>
      <QuestionTable
        defaultQuestionList={questionList}
        defaultTotal={total}
        defaultSearchParams={{
          title: searchText,
        }}
      />
    </div>
  );
}
