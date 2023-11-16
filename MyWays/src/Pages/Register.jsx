// src/Register.js

import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Typography, message } from 'antd';
import './Register.scss';

const { Text } = Typography;

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onFinish = async () => {
        try {
            const response = await fetch('http://localhost:7000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsRegistered(true);
                message.success('Registration Successful');
            } else {
                const errorData = await response.json();
                message.error('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error registering:', error);
            message.error('Error registering. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <Row justify="center" align="middle" className="register-row">
                <Col span={5} className="register-col">
                    <div className="top">
                        <h2>Register</h2>
                        <p>MyWays - Remote Team Desk</p>
                    </div>

                    {isRegistered ? (
                        <div className="registration-success">
                            <Text strong>Registration Successful</Text>
                        </div>
                    ) : (
                        <Form name="register" onFinish={onFinish}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Invalid email address' },
                                ]}
                            >
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please enter your username' }]}
                            >
                                <Input
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please enter your password' }]}
                            >
                                <Input.Password
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="register-button">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Register;
