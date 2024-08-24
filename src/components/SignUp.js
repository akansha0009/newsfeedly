// src/components/SignUpForm.js

import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignUp = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log('Received values:', values);
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include',
            });
    
            const result = await response.json();
            console.log('result', result)
            if (response.ok) {
                notification.success({
                    message: 'Registered Successful',
                    description: 'You have successfully registered.',
                });
                console.log('Navigating to /signin');
                navigate('/signin');
            } else {
                console.error('Login failed:', result.message);
                notification.error({
                    message: 'Registeration Faild',
                    description: 'Please add different or valid credentials.',
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
            <Form
                name="signup"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                    <Input prefix={<UserOutlined />} style={{ fontSize: '16px', padding: '20px' }} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} style={{ fontSize: '16px', padding: '20px' }} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="hashedPassword"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password style={{ fontSize: '16px', padding: '20px' }} prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ fontSize: '16px', padding: '20px' }}>
                        Sign Up
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link style={{ color: '#ffffff', fontSize: '16px' }} to="/signin">Already have an account? Sign In</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
