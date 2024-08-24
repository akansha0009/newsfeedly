// src/components/SignInForm.js

import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import nookies from 'nookies';

const { Title } = Typography;

const SignIn = ({ onLogin }) => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log('Received values:', values);
        try {
            const response = await fetch('http://localhost:8000/login', {
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
                    message: 'Login Successful',
                    description: 'You have successfully logged in.',
                });
                const { token } = result;
                if (token) {
                    nookies.set(null, 'authToken', token, {
                        path: '/',
                    });
                }
                onLogin();
                navigate('/articles')
            } else {
                console.error('Login failed:', result.message);
                notification.error({
                    message: 'Login Failed',
                    description: result.message || 'Invalid email or password.',
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            notification.error({
                message: 'Login Failed',
                description: 'There was an error with your request.',
            });
        }
    };
    

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center'}}>Sign In</Title>
            <Form
                name="signin"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} style={{ fontSize: '16px', padding: '20px' }}  placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} style={{ fontSize: '16px', padding: '20px' }}  placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block style={{ fontSize: '16px', padding: '20px' }}>
                        Sign In
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to="/signup" style={{ color: '#ffffff', fontSize: '16px' }}>Create a New Account</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignIn;
