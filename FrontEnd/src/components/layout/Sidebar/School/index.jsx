import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { FaAddressCard, FaPersonBooth, FaBuilding, FaSchool } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { ROUTERS } from '../../../../constants/router';
import history from '../../../../utils/history';
import "./styles.css";

function SchoolSidebar(props) {
    const { Sider } = Layout;
    const {showSideBar} = props;
    let [collapsed, setCollapsed] = useState(false);

    const handleClick =(e) => {
        const path = `${e.key}`;
        history.push(path);
        
    };

    const onCollapse = collapsed => {
        setCollapsed(collapsed => !collapsed);
        showSideBar(collapsed)
    };
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu 
            onClick={handleClick}
            onDeselect={handleClick}
            defaultSelectedKeys={['1']}
            style={{backgroundColor: "rgb(0,21,41)", borderRight: 'none' }}

            mode="inline">
                    
                    <Menu.Item key={ROUTERS.INFORMATION_PERSON_SCHOOL} icon={<FaAddressCard />}>
                            Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.INFORMATION_SCHOOL} icon={<FaSchool />}>
                             Nhà Trường
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.INFORMATION_FACULTY_OF_SCHOOL} icon={<FaBuilding />}>
                            Quản lý Khoa
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.INTERNS_SCHOOL} icon={<FaPersonBooth />}>
                            Thực tập sinh
                    </Menu.Item>
                    
          </Menu>
        </Sider>

    );
}

export default SchoolSidebar;