import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Layout, Menu } from 'antd';

const { Header } = Layout;
export default class NavHeader extends Component {
    render() {
        return (
            <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">首页1</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/hello">hello</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/ant/table">Table</Link></Menu.Item>
      </Menu>
    </Header>
        )
    }
}
