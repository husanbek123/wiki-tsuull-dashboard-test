import { useState } from "react";
import { CRUDNavigator } from "./CRUDNavigator";
import { Table, Button } from "antd";
export default function TABLE(
  data: Array<any>,
  columns: Array<{
    title: string;
    dataIndex: string;
  }>
) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        dataSource={data.map((item, index) => ({
          key: index + 1,
          ...columns,
          delete: (
            <Button onClick={() => CRUDNavigator("Delete", item._id)}>
              delete
            </Button>
          ),
          update: (
            <Button onClick={() => CRUDNavigator("Update", item._id)}>
              update
            </Button>
          ),
        }))}
        rowSelection={rowSelection}
        columns={columns}
      />
    </div>
  );
}
