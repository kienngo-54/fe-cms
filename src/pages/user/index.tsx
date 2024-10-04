import React from "react";
import AppTable from "../../components/AppTable";
import { IUser } from "../../@types/entities/User";
import { getAllUser } from "../../apis/user";
import usePagination from "../../hooks/usePagination";
import { RDGetAllUser } from "../../@types/apis/RequestData";
import { PAGE_SIZE } from "../../configs";
import { omitIsNil } from "../../utils/omit";
import { data } from "autoprefixer";
import { Flex, TableColumnType, TableColumnsType } from "antd";

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
    offset,
    reloadData,
  } = usePagination<IUser, RDGetAllUser["query"]>([], apiConfig);

  const columns: TableColumnsType<Omit<IUser, "_id">> = [
    {
      title: "Index",
      dataIndex: "index",
    },
    {
      title: "Họ và tên",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    { title: "Số điện thoại", dataIndex: "phoneNumber" },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
  ];

  return (
    <Flex style={{ padding: "16px 0" }}>
      <AppTable<Omit<IUser, "_id">>
        loading={isLoading}
        columns={columns}
        pagination={{
          total,
          pageSize: PAGE_SIZE,

          current: currentPage,
          onChange: onPaginationChange,
        }}
        dataSource={tableData.map((item) => ({
          key: item._id,
          index: (currentPage - 1) * PAGE_SIZE + tableData.indexOf(item) + 1,
          username: item.username,
          email: item.email,
          phoneNumber: item.phoneNumber,
          address: item.address,
        }))}
      />
    </Flex>
  );
}

export default UserPage;
