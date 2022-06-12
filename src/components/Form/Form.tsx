import React, { FC, useState } from "react";
import "./Form.css";
import { IAgentForm, IAgent } from "../../types/Agent";
import { Form, Input, Button } from "antd";

const AgentForm: FC<any> = (props: IAgentForm) => {
  const [form] = Form.useForm();
  const layout = "vertical";
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IAgent) => {
    setLoading(true);
    await props.handleCreate(values);
    setLoading(false);
  };

  return (
    <Form layout={layout} form={form} autoComplete="off" onFinish={onFinish}>
      <Form.Item
        label="First Name"
        name="firstName"
        className="formItem"
        rules={[{ required: true, message: "Please input your firstname!" }]}
      >
        <Input placeholder="Please Enter First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        className="formItem"
        rules={[{ required: true, message: "Please input your lastname!" }]}
      >
        <Input placeholder="Please Enter Last Name" />
      </Form.Item>
      <Form.Item
        label="AboutMe"
        name="aboutMe"
        className="formItem"
        rules={[{ required: true, message: "Please input your about me!" }]}
      >
        <Input placeholder="Please Enter About Me" />
      </Form.Item>
      <Form.Item label="Photo URL" name="photoUrl" className="formItem">
        <Input placeholder="Please Enter Photo URL" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        className="formItem"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input placeholder="Please Enter Address" />
      </Form.Item>
      <Form.Item
        label="Practice Areas"
        name="practiceAreas"
        rules={[
          { required: true, message: "Please input your Practice Areas!" },
        ]}
      >
        <Input placeholder="Please Enter Practice Areas" />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="btnSubmit"
          type="primary"
          loading={loading}
        >
          Join the team
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AgentForm;
