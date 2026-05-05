import UserForm from './userForm';
import { useState } from 'react';
import { Card, Button, message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { DataType } from './interface';

function AddUser() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [form] = Form.useForm<DataType>();
    const navigate = useNavigate();

    const hideModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            navigate('/users');
        }, 500);
    }

    const loadData = () => {
        message.success('企业新增成功！');
    }
    const handleFormValuesChange = (_values: any, _allValues: any) => {
        console.log('表单值变化:', _allValues);
    }

    return (
        <div style={{ padding: '20px' }}>
            <Card title="新增企业" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <UserForm
                    visible={isModalOpen}
                    hideModal={hideModal}
                    title="新增企业"
                    loadData={loadData}
                    form={form}
                    onValuesChange={handleFormValuesChange}
                />
                {!isModalOpen && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Button type="primary" onClick={() => navigate('/users')}>
                            返回列表页
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default AddUser;