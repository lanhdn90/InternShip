import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { FaAddressCard, FaRegQuestionCircle, FaDiscourse, FaUnity, FaPersonBooth } from "react-icons/fa";
import { ROUTERS } from '../../../../constants/router';
import history from '../../../../utils/history';
import "./styles.css";

function LeaderSidebar(props) {
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
            style={{backgroundColor: "rgb(0,21,41)", borderRight: 'none', color: 'white' }}
            mode="inline">
                    <Menu.Item key={ROUTERS.INFORMATION_LEADER} icon={<FaAddressCard />}>
                            Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.INTERNS_LEADER} icon={<FaPersonBooth />}>
                            Thực tập sinh
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.COURSE} icon={<FaDiscourse />}>
                            Quản lý Khóa học
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.TASK} icon={<FaUnity />}>
                                Quản lý Bài học
                    </Menu.Item>
                    <Menu.Item key={ROUTERS.QUESTION} icon={<FaRegQuestionCircle />}>
                            Quản lý Câu hỏi
                    </Menu.Item>
                
          </Menu>
        </Sider>

    );
}

export default LeaderSidebar;