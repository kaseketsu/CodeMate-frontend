"use client";
import {listQuestionVoByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/tagList";
import Link from "next/link";

interface Props {
  //默认值:用于服务端展示
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const actionRef = useRef<ActionType>();
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  //题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  //题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  //用于判断是否首次加载
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = record.tagList;
        return <TagList tagList={tagList} />;
      },
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
          // filterType: "light"
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={{
          pageSize: 12,
          showTotal: (total) => `共 ${total} 条`,
          total,
          showSizeChanger: true,
        }}
        request={async (params, sort, filter) => {
          //是否首次请求
          if (isFirstLoad) {
            setIsFirstLoad(false);
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] ?? "descend";

          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField: '_score',
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          //更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          //更新状态
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
