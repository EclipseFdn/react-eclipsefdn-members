import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import MenuLeft from './components/sharedComponents/MenuLeft';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import HeaderTop from './components/sharedComponents/HeaderTop';
import Dashboard from './components/pages/dashboard/Dashboard';
import TheFooter from './components/sharedComponents/TheFooter';
import Organization from './components/pages/organization/Organization';
import Employees from './components/pages/employees/Employees';
import Integrations from './components/pages/integrations/Integrations';
import Projects from './components/pages/projects/Projects';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="App">
      <Router>
        <MenuLeft />
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <HeaderTop />

            <div className="main-content">
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>

                <Route path="/organization">
                  <Organization />
                </Route>

                <Route path="/employees">
                  <Employees />
                </Route>

                <Route path="/integrations">
                  <Integrations />
                </Route>

                <Route path="/projects">
                  <Projects />
                </Route>
              </Switch>

              <TheFooter />
            </div>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default App;
