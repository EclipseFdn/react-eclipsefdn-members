import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import {
  TeamOutlined,
  DashboardOutlined,
  BankOutlined,
  MenuOutlined,
  MergeCellsOutlined,
  FundProjectionScreenOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import './menuLeft.css';

export default function MenuLeft() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="menu-left">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div
          className={collapsed ? 'button-ctn-collapsed' : 'button-ctn-expand'}
        >
          <button className="hamburger-button" onClick={toggleCollapsed}>
            {React.createElement(collapsed ? MenuOutlined : ArrowLeftOutlined)}
          </button>
        </div>

        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />}>
            <Link to="/organization">Organization</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/employees">Employees</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<MergeCellsOutlined />}>
            <Link to="/integrations">Integrations</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FundProjectionScreenOutlined />}>
            <Link to="/projects">Projects</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
