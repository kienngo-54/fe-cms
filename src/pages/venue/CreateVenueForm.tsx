import { Button, Col, Flex, Form, FormProps, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createVenue } from "../../apis/venue";

type FieldType = {
  name: string;
  location: string;
};

interface ICreateVenueFormProps {
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

function CreateVenueForm(props: ICreateVenueFormProps) {
  const { open, onClose, reload } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsLoading(true);
    await createVenue({
      body: { ...values },
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
      title="Thêm địa điểm"
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
              <Input className="app-input" placeholder="Nhập vị trí" />
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

export default CreateVenueForm;
