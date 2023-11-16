// src/Login.js

import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Typography, message } from 'antd';
import './Login.scss';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // Store the token in local storage or cookies for future authenticated requests.
        localStorage.setItem('token', token);
        message.success('Login Successful');
        // Redirect to a dashboard or other authorized pages.
        // You can use a routing library like react-router-dom for navigation.
      } else {
        const errorData = await response.json();
        message.error('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <Row justify="center" align="middle" className="login-row">
        <Col span={5} className="login-col">
          <div className="top">
            <h2>Login</h2>
            <p>MyWays - Remote Team Desk</p>
          </div>

          <Form name="login" onFinish={handleLogin}>
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
              <Button type="primary" htmlType="submit" className="login-button">
                Log In
              </Button>
            </Form.Item>
          </Form>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
