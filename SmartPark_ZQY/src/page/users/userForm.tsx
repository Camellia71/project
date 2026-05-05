import { Modal, Row, Col, Form, Input, Radio, message} from "antd"
import {  useCallback } from "react";
import { editUser } from "../../api/userList";
import type { FormInstance } from 'antd/es/form';

interface FormProps {
    visible: boolean;
    hideModal: () => void;
    title: string;
    loadData:()=>void;
    form: FormInstance;
    onValuesChange?: (values: any, allValues: any) => void;
}

function UserForm(props: FormProps) {
    const { visible, hideModal, title, loadData, form, onValuesChange } = props

    const handleOk = () => {
    form.validateFields().then(async (res) => {
        try {
            let result: any;
            if (title === "新增企业") {
                result = await editUser(res);
            } else {
                result = await editUser({ ...res, id: form.getFieldValue('id') });
            }
            message.success(result?.data || '操作成功');
            hideModal();
            loadData();
            form.resetFields();
        } catch (error) {
            message.error('操作失败');
        }
    }).catch((err) => {
        console.log(err);
    });
};

    const handleValuesChange = useCallback((values: any, allValues: any) => {
        if (onValuesChange) {
            onValuesChange(values, allValues);
        }
    }, [onValuesChange]);

    return <>
        <Modal
            title={title}
            open={visible}
            onCancel={hideModal}
            width={800}
            onOk={handleOk}
        >
            <Form
                form={form}
                labelCol={{span:8}}
                wrapperCol={{span:16}}
                onValuesChange={handleValuesChange}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="客户名称"
                            name="name"
                            rules={[{ required: true, message: "客户名称不能为空" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="联系电话"
                            name="tel"
                            rules={[{ required: true, message: "联系电话不能为空" },{pattern:/^1[3-9]\d{9}$/,message:"请输入有效的手机号"}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="经营状态"
                            name="status"
                            rules={[{ required: true, message: "经营状态不能为空" }]}
                        >
                            <Radio.Group>
                                <Radio value="1">营业中</Radio>
                                <Radio value="2">暂停营业</Radio>
                                <Radio value="3">已关闭</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="所属行业"
                            name="business"
                            rules={[{ required: true, message: "所属行业不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: "邮箱不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="统一信用代码"
                            name="creditCode"
                            rules={[{ required: true, message: "统一信用代码不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="工商注册号"
                            name="industryNum"
                            rules={[{ required: true, message: "工商注册号不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="组织机构代码"
                            name="organizationCode"
                            rules={[{ required: true, message: "组织机构代码不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="法人名"
                            name="legalPerson"
                            rules={[{ required: true, message: "法人名不能为空" }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Modal>

    </>
}
export default UserForm