import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import './App.css';
import getRouter from '../router/router';
import { withRouter } from "react-router-dom";
import NavHeader from '../component/Nav/NavHeader';
import SideMenu from '../component/Nav/SideMenu';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <NavHeader/>
      <Layout>
      <SideMenu/>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>error</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        {getRouter()}
        </Content>
      </Layout>
    </Layout>
  </Layout>
    );
  }
}

export default withRouter(App);