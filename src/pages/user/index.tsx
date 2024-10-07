import React from "react";
import AppTable from "../../components/AppTable";
import { IUser } from "../../@types/entities/User";
import { deleteUser, getAllUser } from "../../apis/user";
import usePagination from "../../hooks/usePagination";
import { RDGetAllUser } from "../../@types/apis/RequestData";
import { PAGE_SIZE } from "../../configs";
import { omitIsNil } from "../../utils/omit";
import { data } from "autoprefixer";
import {
  Button,
  Flex,
  TableColumnType,
  TableColumnsType,
  TableProps,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function UserPage() {
  const apiConfig = (query: RDGetAllUser["query"], name?: string) => {
    return getAllUser({
      name,
      query: {
        ...omitIsNil({ ...query }, { deep: false }),
        record: PAGE_SIZE,
      },
    });
  };

  const {
    data: tableData,
    currentPage,
    total,
    onPaginationChange,
    isLoading,
    reloadData,
  } = usePagination<IUser, RDGetAllUser["query"]>([], apiConfig);

  const handleDelete = (userId: string) => async () => {
    await deleteUser({
      param: { userId },
      successHandler: {
        callBack(data) {
          toast.success("Xoá thành công");
        },
      },
      errorHandler: {
        callBack(error) {
          toast.error("Xoá thất bại");
        },
      },
    });
    reloadData();
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) =>
        (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "username",
      render: (username) => username,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => email,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber) => phoneNumber || "",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (address) => address || "",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete(record._id)}
        />
      ),
    },
  ];

  return (
    <Flex style={{ padding: "16px 0" }}>
      <AppTable<IUser>
        loading={isLoading}
        columns={columns}
        pagination={{
          total,
          pageSize: PAGE_SIZE,

          current: currentPage,
          onChange: onPaginationChange,
        }}
        dataSource={tableData}
      />
    </Flex>
  );
}

export default UserPage;
