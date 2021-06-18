import React,{useState}from 'react';
import Header from '../../components/layout/Header';
import FacultySidebar from '../../components/layout/Sidebar/Faculty';
import Cookie from '../../utils/cookie';
import { Route, Redirect } from 'react-router-dom';


function FacultyLayout(props) {
    const {exact, path, component: Component, ...other} = props;
    const cooke = new Cookie();
    const userName = cooke.get("userInfo");
    const [isShow, setIsShow] = useState(false);
    if (userName && userName.username) {
      if (userName.personId.roleId !== '6045cf1c83a38015cc63ccc5') {
        return <Redirect to="/login" />;
      }
      <Redirect to="/faculty/information" />
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
                            <FacultySidebar
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

export default FacultyLayout;