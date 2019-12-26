
import React from 'react';
import { Input, Form, Modal } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="创建"
            okText="创建"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="简介">
                {getFieldDecorator('content')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="网址">
                {getFieldDecorator('url')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="资源">
                {getFieldDecorator('source')(<Input type="textarea" />)}
              </Form.Item>
              <Form.Item label="类型">
                {getFieldDecorator('type')(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
  );

  export default CollectionCreateForm;