import React,{useState}from 'react';
import Header from '../../components/layout/Header';
import StudentSidebar from '../../components/layout/Sidebar/Student';
import Cookie from '../../utils/cookie';
import { Route, Redirect } from 'react-router-dom';


function StudentLayout(props) {
    const {exact, path, component: Component, ...other} = props;
    const cooke = new Cookie();
    const userName = cooke.get("userInfo");
    const [isShow, setIsShow] = useState(false);
    if (userName && userName.username) {
      if (userName.personId.roleId !== '6045cf1c83a38015cc63ccc6') {
        return <Redirect to="/login" />;
      }
      <Redirect to="/interns/information" />
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
                            <StudentSidebar
                                showSideBar = {showSideBar}
                                userName={userName}
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

export default StudentLayout;