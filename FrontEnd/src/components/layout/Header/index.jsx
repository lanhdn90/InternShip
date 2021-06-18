import React, {useEffect} from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { LoginOutlined, ProfileOutlined , UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import "./styles.css"
import history from '../../../utils/history';
import { ROUTERS } from '../../../constants/router';
import Cookie from '../../../utils/cookie.js';
function Header(props) {

    const cooke = new Cookie();
    const userName = cooke.get("userInfo");

    
    function handleMenuClick(e) {
        const path = `${e.key}`;
        history.push(path);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key={ROUTERS.INFORMATION_ADMIN} name="1" icon={<ProfileOutlined  />}>
                Personal Information
            </Menu.Item>
            <Menu.Item key={ROUTERS.LOGIN} name="2" icon={<LoginOutlined  />}>
                Login Out
            </Menu.Item>
        </Menu>
    );

    const { Header } = Layout;
    return (
        <Header className="header_nav">
            <div className="logo" />
            <Dropdown   overlay={menu}>
                <Button className="userName" placement="bottomRight" icon={<UserOutlined />}>
                    {userName.username}
                </Button>
            </Dropdown>
        </Header>
    );
}

  export default Header;
