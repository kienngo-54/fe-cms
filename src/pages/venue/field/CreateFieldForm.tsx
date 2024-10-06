import {
  Button,
  Col,
  Flex,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createField } from "../../../apis/field";
import { useParams } from "react-router-dom";
import { ESport } from "../../../constants/sport";
import { EDistrict } from "../../../constants/location";

type FieldType = {
  name: string;
  sport: string;
  location: string;
  capacity: number;
  price: number;
};

interface ICreateFieldFormProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

function CreateFieldForm(props: ICreateFieldFormProps) {
  const { open, onClose, reload } = props;
  const { venueId } = useParams<{ venueId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    const result = await createField({
      body: { ...values, venueId: venueId || "" },
      successHandler: {
        callBack(data) {
          toast.success("Thêm vị trí thành công!");
          setIsLoading(false);
          onClose();
        },
      },
      errorHandler: {
        callBack(error) {
          toast.error("Thêm vị trí thất bại!");
          setIsLoading(false);
        },
      },
    });
    reload();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Thêm sân"
      open={open}
      footer={null}
      destroyOnClose
      closable={false}
    >
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Tên"
              style={{ marginBottom: 8 }}
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            >
              <Input className="app-input" placeholder="Nhập tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Vị trí"
              name="location"
              style={{ marginBottom: 8 }}
              rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
            >
              <Select
                placeholder="Chọn vị trí"
                options={Object.values(EDistrict ).map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Môn thể thao"
              name="sport"
              style={{ marginBottom: 8 }}
              rules={[
                { required: true, message: "Vui lòng chọn môn thể thao" },
              ]}
            >
              <Select
                placeholder="Chọn môn thể thao"
                options={Object.values(ESport).map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Giá"
              name="price"
              style={{ marginBottom: 8 }}
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber placeholder="Nhập giá" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Số lượng"
              name="capacity"
              style={{ marginBottom: 8 }}
              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
            >
              <InputNumber
                placeholder="Nhập số lượng"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Flex justify="flex-end" style={{ marginTop: 16, gap: 16 }}>
              <Button type="primary" danger onClick={handleCancel}>
                Huỷ
              </Button>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Thêm
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreateFieldForm;
