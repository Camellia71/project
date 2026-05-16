import React from "react";
import { Card, Row, Col, Input, Button, Table, Pagination, Tag, Popconfirm, message, Form } from "antd"
import type { TableProps } from 'antd';
import type { DataType } from "./interface";
import { getUserList } from "../../api/userList";
import type { PaginationProps } from 'antd';
import { deleteUser, batchDeleteUser } from "../../api/userList";
import UserForm from "./userForm";
import useDataList from "../../hooks/useDataList";
import useTableSelection from "../../hooks/useTableSelection";

interface SearchType {
    companyName: string;
    contact: string;
    phone: string;
}

interface ApiResponse {
    data?: string;
}

function Users() {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>("");
    const [form] = Form.useForm<DataType>();

    const {
        dataList,
        page,
        pageSize,
        total,
        loading,
        formData,
        setFormData,
        refetch,
        reset,
        onChange,
    } = useDataList<DataType, SearchType>(
        { companyName: "", contact: "", phone: "" },
        getUserList
    );

    const {
        rowSelection,
        selectedIds,
        clearSelection,
    } = useTableSelection(dataList, {
        tableKey: 'user-list',
        rowKey: 'id',
    });

    const disabled = selectedIds.length === 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReset = () => {
        reset();
        clearSelection();
        refetch();
    };

    const confirm = async function (id: string) {
        const res = await deleteUser(id) as ApiResponse;
        message.success(res?.data || '删除成功');
        refetch();
    };

    const batchDelete = async () => {
        const res = await batchDeleteUser(selectedIds) as ApiResponse;
        message.success(res?.data || '删除成功');
        clearSelection();
        refetch();
    };

    const edit = (record: DataType) => {
        setIsModalOpen(true);
        setTitle("编辑企业");
        form.setFieldsValue(record);
    };

    const add = () => {
        setIsModalOpen(true);
        setTitle("新增企业");
        form.resetFields();
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: "No.",
            key: "index",
            render(_value, _record, index) {
                return index + 1;
            },
        },
        {
            title: "客户名称",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "经营状态",
            key: "status",
            dataIndex: "status",
            render(value) {
                if (value === 1) {
                    return <Tag color="green">营业中</Tag>;
                } else if (value === 2) {
                    return <Tag color="#f50">暂停营业</Tag>;
                } else if (value === 3) {
                    return <Tag color="red">已关闭</Tag>;
                }
                return value;
            },
        },
        {
            title: "联系电话",
            key: "tel",
            dataIndex: "tel",
        },
        {
            title: "所属行业",
            key: "business",
            dataIndex: "business",
        },
        {
            title: "邮箱",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "统一信用代码",
            key: "creditCode",
            dataIndex: "creditCode",
        },
        {
            title: "工商注册号",
            key: "industryNum",
            dataIndex: "industryNum",
        },
        {
            title: "组织结构代码",
            key: "organizationCode",
            dataIndex: "organizationCode",
        },
        {
            title: "法人名",
            key: "legalPerson",
            dataIndex: "legalPerson",
        },
        {
            title: "操作",
            key: "operate",
            render(_value, record) {
                return (
                    <>
                        <Button type="primary" size="small" onClick={() => edit(record)}>编辑</Button>
                        <Popconfirm
                            title="删除确认"
                            description="确定要删除吗？"
                            okText="是"
                            cancelText="否"
                            onConfirm={() => confirm(record.id)}
                        >
                            <Button type="primary" danger className="ml" size="small">删除</Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    return (
        <div className="users">
            <UserForm
                visible={isModalOpen}
                hideModal={hideModal}
                title={title}
                loadData={refetch}
                form={form}
            />
            <Card className="search">
                <Row gutter={16}>
                    <Col span={7}>
                        <p>企业名称：</p>
                        <Input name="companyName" value={formData.companyName} onChange={handleChange} />
                    </Col>
                    <Col span={7}>
                        <p>联系人：</p>
                        <Input name="contact" value={formData.contact} onChange={handleChange} />
                    </Col>
                    <Col span={7}>
                        <p>联系电话:</p>
                        <Input name="phone" value={formData.phone} onChange={handleChange} />
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={refetch}>查询</Button>
                        <Button className="ml" onClick={handleReset}>重置</Button>
                    </Col>
                </Row>
            </Card>
            <Card className="mt tr">
                <Button type="primary" onClick={add}>新增企业</Button>
                <Button danger type="primary" className="ml" disabled={disabled} onClick={batchDelete}>批量删除</Button>
            </Card>
            <Card className="mt">
                <Table
                    columns={columns}
                    dataSource={dataList}
                    rowKey={(record) => record.id}
                    loading={loading}
                    rowSelection={rowSelection}
                    pagination={false}
                />
                <Pagination
                    className="fr mt"
                    total={total}
                    current={page}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 条`}
                    onChange={onChange as PaginationProps['onChange']}
                />
            </Card>
        </div>
    );
}

export default Users;