import React,{useState}from 'react';
// import { Route } from 'react-router';
import Header from '../../components/layout/Header';
import AdminSidebar from '../../components/layout/Sidebar/Admin';
import Cookie from '../../utils/cookie';
import { Route, Redirect } from 'react-router-dom';

function AdminLayout(props) {
    const {exact, path, component: Component, ...other} = props;
    const cooke = new Cookie();
    const userName = cooke.get("userInfo");
    const [isShow, setIsShow] = useState(false);
    if (userName && userName.username) {
    //   console.log("🚀 ~ file: index.jsx ~ line 14 ~ AdminLayout ~ 1")
      if (userName.personId.roleId !== '6045cf1c83a38015cc63ccc1') {
        // console.log("🚀 ~ file: index.jsx ~ line 14 ~ AdminLayout ~ 2")
        return <Redirect to="/login" />;
      }
    //   console.log("🚀 ~ file: index.jsx ~ line 14 ~ AdminLayout ~ 3");
      <Redirect to="/admin/information" />;
    } else {
        // console.log("🚀 ~ file: index.jsx ~ line 14 ~ AdminLayout ~ 4");
      return <Redirect to="/login" />;;
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
                            <AdminSidebar
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

export default AdminLayout;