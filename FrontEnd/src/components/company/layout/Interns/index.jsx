import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import './index.css';
import Course from './Course'
import NoCourse from './noCourse';
import Cookie from '../../../../utils/cookie.js';
import { connect } from 'react-redux';
import {
    getInternNoCourseListAction,
    getNewCourseListAction,
    getCompanyOrSchoolAction,
    getInternNoSchoolAction,
    getFacultyOfSchoolAction,
    getCompanyOrFacultyAction,
    setPageTableAction,
    getInternHaveCourseListAction,
    getInternSchoolAction,
} from '../../../../redux/actions';
function Interns(props) {
    const { TabPane } = Tabs;
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const personInfo = userName.personId;
    const [role, setRole] = useState({isShow: false, valRole: false});
    const {
        getInternNoCourseList,
        internsNoCourse,
        getNewCourseList,
        getCompanyOrSchool,
        getInternNoSchool,
        getFacultyOfSchool,
        getCompanyOrFaculty,
        setPage,
        getInternHaveCourseList,
        internsHaveCourse,
        getInternSchool,
    } = props;

    useEffect( async() => {
        await checkRoleId(personInfo);
        if(personInfo.roleId === "6045cf1c83a38015cc63ccc3" || personInfo.roleId === "6045cf1c83a38015cc63ccc2"){
            //leader and manager
            getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, company: personInfo.companyId})  
            getInternNoCourseList({courseVal:true, current: 1, pageSize: 10, total: 0, company: personInfo.companyId})  
            getCompanyOrFaculty({organizationVal: true})
        }//faculty and school
        else if(personInfo.roleId === "6045cf1c83a38015cc63ccc5"){
            //faculty
            getCompanyOrFaculty({organizationVal: false})
            getCompanyOrSchool({school: personInfo.schoolId})
            getInternHaveCourseList({courseVal:false, current: 1, pageSize: 10, total: 0, faculty: personInfo.schoolId})
            getInternNoCourseList({courseVal:true, current: 1, pageSize: 10, total: 0, faculty: personInfo.schoolId})
        }else{
            getInternSchool({courseVal:false, current: 1, pageSize: 10, total: 0, company: personInfo.companyId})
            getInternNoSchool({courseVal:true, current: 1, pageSize: 10, total: 0, company: personInfo.companyId})
        }
    }, [])
 
    useEffect(() => {
        if(role.isShow){
            if(role.valRole){
                getNewCourseList({person: personInfo._id})
            }else{
                getNewCourseList({company: personInfo.companyId})
            }
        }else{
            if(role.valRole){
                getCompanyOrSchool({school: personInfo.schoolId})
            }else{
                getFacultyOfSchool({company: personInfo.companyId})
            }
        }
    }, [role.isShow])

    const checkRoleId = (personInfo) =>{
        if(personInfo.roleId === "6045cf1c83a38015cc63ccc3" || personInfo.roleId === "6045cf1c83a38015cc63ccc2"){
                //leader and manager
                setRole({...role,isShow: true})
                if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
                    //manager
                    setRole({isShow: true,valRole: true})
                }
            }//faculty and school
            else if(personInfo.roleId === "6045cf1c83a38015cc63ccc5"){
                //faculty
                setRole({...role,valRole: true})
            }
    }



    return (
        <div className="content" style={{ padding: 10, height: "calc(100vh - 74px)" }} >
            <h2>THỰC TẬP SINH</h2>
            <Tabs type="card" style={{padding: 10}} >
                <TabPane tab="COURSE " key="1">
                    <Course
                        internsHaveCourse={internsHaveCourse}
                        role={role}
                        personInfo={personInfo}
                        getInternSchool={getInternSchool}
                        getInternHaveCourseList={getInternHaveCourseList}
                    />
                </TabPane>
                <TabPane tab="NO COURSE" key="2">
                    <NoCourse
                     internsNoCourse={internsNoCourse}
                     getInternNoCourseList={getInternNoCourseList}
                     role={role}
                     personInfo={personInfo}
                    />
                </TabPane>

            </Tabs>
    </div>
    );
}

const mapStateToProps = (state) => {
    const { internsNoCourse, internsHaveCourse } = state.leaderReducer;
    return {
        internsNoCourse: internsNoCourse,
        internsHaveCourse: internsHaveCourse,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyOrFaculty: (params) => dispatch(getCompanyOrFacultyAction(params)),
        getInternNoCourseList: (params) => dispatch(getInternNoCourseListAction(params)),
        getNewCourseList: (params) => dispatch(getNewCourseListAction(params)),
        getCompanyOrSchool: (params) => dispatch(getCompanyOrSchoolAction(params)),
        getInternNoSchool: (params) => dispatch(getInternNoSchoolAction(params)),
        getFacultyOfSchool: (params) => dispatch(getFacultyOfSchoolAction(params)),
        getInternSchool: (params) => dispatch(getInternSchoolAction(params)),
        getInternHaveCourseList: (params) => dispatch(getInternHaveCourseListAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interns);