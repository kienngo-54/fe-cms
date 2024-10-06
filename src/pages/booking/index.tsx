import { Button, Flex, TableProps, Tag } from "antd";
import React from "react";
import AppTable from "../../components/AppTable";
import { IBooking } from "../../@types/entities/Booking";
import { RDGetAllBooking } from "../../@types/apis/RequestData";
import { getAllBooking } from "../../apis/booking";
import { omitIsNil } from "../../utils/omit";
import { PAGE_SIZE } from "../../configs";
import usePagination from "../../hooks/usePagination";
import { EyeOutlined } from "@ant-design/icons";
import { d3Splitting } from "../../utils/number";
import dayjs from "dayjs";

function BookingPage() {
  const apiConfig = (query: RDGetAllBooking["query"], name?: string) => {
    return getAllBooking({
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
  } = usePagination<IBooking, RDGetAllBooking["query"]>([], apiConfig);

  const columns: TableProps<IBooking>["columns"] = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) =>
        (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: "Tên sân",
      dataIndex: "fieldDetails",
      key: "name",
      render: (fieldDetails) => fieldDetails.name,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => d3Splitting(totalPrice),
    },
    {
      title: "Người thuê",
      dataIndex: "userDetails",
      key: "username",
      render: (userDetails) => userDetails.username,
    },
    {
      title: "Số điện thoại",
      dataIndex: "userDetails",
      key: "phone",
      render: (userDetails) => userDetails.phoneNumber,
    },
    {
      title: "Thời gian thuê",
      dataIndex: "period",
      key: "period",
      render: (_, record) =>
        `${record.startTime} -> ${record.endTime} ${record.date}`,
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "paid" ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="red">Chưa thanh toán</Tag>
        ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => <Button type="primary" icon={<EyeOutlined />} />,
    },
  ];
  return (
    <Flex style={{ padding: "16px 0" }} vertical gap={16}>
      <AppTable<IBooking>
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

export default BookingPage;
