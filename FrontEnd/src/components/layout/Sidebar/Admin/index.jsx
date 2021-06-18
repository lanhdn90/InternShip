import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { FaAddressCard, FaBuilding, FaRegChartBar, FaSchool } from "react-icons/fa";
import { ROUTERS } from '../../../../constants/router';
import history from '../../../../utils/history';
import "./styles.css";

function ManagerSidebar(props) {
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
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu 
            onClick={handleClick}
            onDeselect={handleClick}
            defaultSelectedKeys={['1']}
            style={{backgroundColor: "rgb(0,21,41)", borderRight: 'none', color: 'white' }}
            mode="inline">
                    <Menu.Item key={ROUTERS.INFORMATION_ADMIN} icon={<FaAddressCard />}>
                            Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.COMPANY_LIST} icon={<FaBuilding />} >
                            Quản lý Công ty
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.SCHOOL_LIST} icon={<FaSchool />}>
                                Quản lý Nhà trường 
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.REPORT_ADMIN} icon={<FaRegChartBar />}>
                            Báo cáo & Thống kê
                    </Menu.Item>
                
          </Menu>
        </Sider>

    );
}

export default ManagerSidebar;