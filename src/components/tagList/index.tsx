import { Tag } from "antd";
import "./index.css";
import Link from "next/link";

interface Props {
  tagList?: string[];
}

const TagList = (props: Props) => {
  const { tagList = [] } = props;
  return (
    <div className="tag-list">
      {tagList.map((item) => {
        return <Tag key={item}>{item}</Tag>;
      })}
    </div>
  );
};

export default TagList;
