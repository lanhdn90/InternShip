import React,{useState}from 'react';
import Header from '../../components/layout/Header';
import ManagerSidebar from '../../components/layout/Sidebar/Manager';
import Cookie from '../../utils/cookie';
import { Route, Redirect } from 'react-router-dom';


function ManagerLayout(props) {
    const {exact, path, component: Component, ...other} = props;
    const cooke = new Cookie();
    const userName = cooke.get("userInfo");
    const [isShow, setIsShow] = useState(false);
    if (userName && userName.username) {
      if (userName.personId.roleId !== '6045cf1c83a38015cc63ccc2') {
        return <Redirect to="/login" />;
      }
      <Redirect to="/manager/information" />
    } else {
      return <Redirect to="/login" />;
    }
    const showSideBar = (val)=>{
        setIsShow(val);
    }
    return (
        <Route
            exact={exact}
            path={path}
            render={(routerProps)=>{
                return(
                    <div>
                        <Header/>
                        <div style={{display: 'flex'}}>
                            <ManagerSidebar
                                showSideBar = {showSideBar}
                            />
                            <Component 
                            {...other}{...routerProps}
                            isShow={isShow}
                            /> 
                        </div>
                    </div>
                )
            }}
        />
    );
}

export default ManagerLayout;