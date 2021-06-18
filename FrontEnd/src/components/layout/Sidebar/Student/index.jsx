import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { FaAddressCard, FaBuilding, FaRegChartBar, FaSchool } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { ROUTERS } from '../../../../constants/router';
import history from '../../../../utils/history';
import "./styles.css";

function StudentSidebar(props) {
    const { Sider } = Layout;
    const {showSideBar, userName} = props;
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
            style={{backgroundColor: "rgb(0,21,41)", borderRight: 'none' }}

            mode="inline">
                    
                    <Menu.Item key={ROUTERS.INTERNS_INFORMATION} icon={<FaAddressCard />}>
                            Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.COURSE_INFORMATION} icon={<FaRegChartBar />}>
                            Khóa học
                    </Menu.Item>
                    <Menu.Item key={`/intern/result/${userName._id}`} icon={<FaSchool />}>
                            Kết Quả
                    </Menu.Item>
                    
          </Menu>
        </Sider>

    );
}

export default StudentSidebar;