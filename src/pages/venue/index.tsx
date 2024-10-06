import React, { useState } from "react";
import { deleteVenue, getAllVenue } from "../../apis/venue";
import { RDGetAllVenue } from "../../@types/apis/RequestData";
import usePagination from "../../hooks/usePagination";
import { Button, Flex, TableProps } from "antd";
import { IVenue } from "../../@types/entities/Venue";
import { PAGE_SIZE } from "../../configs";
import { omitIsNil } from "../../utils/omit";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AppTable from "../../components/AppTable";
import ROUTE from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import CreateVenueForm from "./CreateVenueForm";
import { toast } from "react-toastify";

function VenuePage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const apiConfig = (query: RDGetAllVenue["query"], name?: string) => {
    return getAllVenue({
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
  } = usePagination<IVenue, RDGetAllVenue["query"]>([], apiConfig);

  const handleRedirectToField = (venueId: string) => () => {
    navigate(ROUTE.FIELD.replace(":venueId", venueId));
  };

  const handleDeleteVenue = (venueId: string) => async () => {
    await deleteVenue({
      param: { venueId },
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

  const handleOpenVenue = () => {
    setIsOpen(true);
  };

  const handleCloseVenue = () => {
    setIsOpen(false);
  };

  const columns: TableProps<IVenue>["columns"] = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) =>
        (currentPage - 1) * PAGE_SIZE + index + 1,
    },
    {
      title: "Tên địa điểm",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
      render: (location) => location,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (_, data) => (
        <Flex gap={16}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleRedirectToField(data._id)}
          />
          <Button
            type="primary"
            onClick={handleDeleteVenue(data._id)}
            danger
            icon={<DeleteOutlined />}
          />
        </Flex>
      ),
    },
  ];

  return (
    <Flex style={{ padding: "16px 0" }} vertical gap={16}>
      <Flex justify="flex-end">
        <Button type="primary" onClick={handleOpenVenue}>
          Thêm địa điểm
        </Button>
      </Flex>
      <AppTable<IVenue>
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
      <CreateVenueForm
        open={isOpen}
        reload={reloadData}
        onClose={handleCloseVenue}
      />
    </Flex>
  );
}

export default VenuePage;
