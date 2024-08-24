import React from 'react';
import { Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import nookies from 'nookies';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    nookies.destroy(null, 'authToken');
    navigate('/signin');
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        News Feedly
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="logout" icon={<LogoutOutlined /> } onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
