import { Card, Input, Table, TableProps } from "antd";
import { useQuery } from "react-query";
import { IParams, useParamsStroe } from "./store/params";
import { debounce, isEmpty, omitBy } from "lodash-es";
import { useShallow } from "zustand/react/shallow";
import "./App.less";

interface DataType {
  id: string;
  userId: string;
  title: string;
  body: string;
}

// api可根据自己的后端服务使用@umijs/openapi生成
export const fetchData = (params: IParams) => {
  let url = "https://jsonplaceholder.typicode.com/posts";
  const search = omitBy(params, (value) => isEmpty(value));
  if (!isEmpty(search)) {
    url += `?${new URLSearchParams(search).toString()}`;
  }

  return fetch(url).then(async (response) => {
    // 如果请求返回status不为200 则抛出后端错误
    if (response.status !== 200) {
      const { message } = await response.json();
      throw new Error(message);
    }
    return response.json();
  });
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },
];

function App() {
  const { title, id, setTitle, setId } = useParamsStroe(
    useShallow((state) => ({
      title: state.title,
      id: state.id,
      setTitle: state.setTitle,
      setId: state.setId,
    }))
  );

  const { data, isLoading } = useQuery({
    queryKey: ["issues", title, id],
    queryFn: () => fetchData({ title, id }),
  });

  return (
    <Card title="todo list">
      <div className="search-cont">
        <Input
          allowClear
          onChange={debounce((e) => {
            setId(e.target.value);
          }, 300)}
          placeholder="please enter id to search"
          style={{ width: 260, marginRight: 16 }}
        />
        <Input
          allowClear
          onChange={debounce((e) => {
            setTitle(e.target.value);
          }, 300)}
          placeholder="please enter name to search"
          style={{ width: 260, marginRight: 16 }}
        />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={data}
      />
    </Card>
  );
}

export default App;
