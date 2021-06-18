import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { FaAddressCard, FaDiscourse,FaUnity, FaRegChartBar, FaPersonBooth } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { ROUTERS } from '../../../../constants/router';
import history from '../../../../utils/history';
import "./styles.css";

function AdminSidebar(props) {
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
        <Sider 
        // theme={'light'} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={onCollapse}>
          <Menu 
            onClick={handleClick}
            onDeselect={handleClick}
            defaultSelectedKeys={['1']}
            style={{backgroundColor: "rgb(0,21,41)", borderRight: 'none', color: 'white' }}
            mode="inline">
                    
                    <Menu.Item key={ROUTERS.INFORMATION_MANAGER} icon={<FaAddressCard />}>
                            Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.TABLE} icon={<FcManager />}>
                            Quản lý Hướng dẫn
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.INTERNS_MANAGER} icon={<FaPersonBooth />}>
                            Thực tập sinh
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.COURSE_MANAGER} icon={<FaDiscourse />}>
                            Quản lý Khóa học
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.TASK_MANAGER} icon={<FaUnity />}>
                            Quản lý Bài học
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.QUESTION_MANAGER} icon={<FaRegChartBar />}>
                            Quản lý Câu hỏi
                    </Menu.Item>
          </Menu>
        </Sider>

    );
}

export default AdminSidebar;