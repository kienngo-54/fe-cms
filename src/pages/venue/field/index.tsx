import React, { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { Button, Flex, TableProps } from "antd";
import { deleteField, getAllField } from "../../../apis/field";
import { RDGetAllField } from "../../../@types/apis/RequestData";
import { PAGE_SIZE } from "../../../configs";
import { omitIsNil } from "../../../utils/omit";
import { IField } from "../../../@types/entities/Field";
import AppTable from "../../../components/AppTable";
import { d3Splitting } from "../../../utils/number";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreateFieldForm from "./CreateFieldForm";
import ROUTE from "../../../constants/routes";

function FieldPage() {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const apiConfig = (query: RDGetAllField["query"], name?: string) => {
    return getAllField({
      name,
      param: {
        venueId: venueId || "",
      },
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
  } = usePagination<IField, RDGetAllField["query"]>([], apiConfig);

  const handleOpenField = () => {
    setIsOpen(true);
  };

  const handleCloseField = () => {
    setIsOpen(false);
  };
  const handleBack = () => {
    navigate(ROUTE.VENUE);
  };
  const handleDeleteField = (fieldId: string) => async () => {
    await deleteField({
      param: { fieldId },
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

  const columns: TableProps<IField>["columns"] = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) =>
        (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: "Tên đội",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Môn thể thao",
      dataIndex: "sport",
      key: "sport",
      render: (sport) => sport,
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
      render: (location) => location,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => d3Splitting(price),
    },
    {
      title: "Số lượng",
      dataIndex: "capacity",
      key: "capacity",
      render: (capacity) => capacity,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (_, data) => (
        <Button
          type="primary"
          onClick={handleDeleteField(data._id)}
          danger
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  return (
    <Flex style={{ padding: "16px 0" }} vertical gap={16}>
      <Flex justify="space-between">
        <Button type="text" onClick={handleBack}>
          Trở về
        </Button>
        <Button type="primary" onClick={handleOpenField}>
          Thêm sân
        </Button>
      </Flex>
      <AppTable<IField>
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
      <CreateFieldForm
        open={isOpen}
        onClose={handleCloseField}
        reload={reloadData}
      />
    </Flex>
  );
}

export default FieldPage;
