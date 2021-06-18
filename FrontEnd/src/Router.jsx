import React from 'react';
import { Router, Switch,Route } from 'react-router';
import history from './utils/history';
import {ROUTERS} from './constants/router';

import AdminLayout from './pages/Admin';
import ManagerLayout from './pages/Manager';
import LeaderSidebar from './pages/Leader';
import SchoolSidebar from './pages/School';
import FacultySidebar from './pages/Faculty';
import StudentSidebar from './pages/Student';
import HomeLayout from './pages/HomePage';

import Login from './pages/Login';
import Register from './pages/Register'

import Information from './components/Admin/Information';
import Company from './components/Admin/Company';
import School from './components/Admin/School';
import Faculty from './components/school/Faculty';
import SchoolInfo from './components/school/School';
import Report from './components/Admin/Report';
import Leader from './components/company/manager/Leader';

//leader
import Question from './components/company/leader/Question';
import Task from './components/company/leader/Task';
import Course from './components/company/leader/Course';


// import ModalFun from './components/layout/Modal';
// import ReactBeautiful from './components/company/leader/Course/Updata.jsx';
import Interns from './components/company/layout/Interns'

import Result from './components/student/Result';
import CourseDetail from './components/student/Course';
import HomePage from './components/HomePage/components/HomePage';
function BrowserRouter(props) {
    return (
       <Router history={history}>
           <Switch>
               <Route exact 
                    path={ROUTERS.LOGIN}
                    component = {Login}
               />
               <Route exact 
                    path={ROUTERS.REGISTER}
                    component = {Register} 
               />
               <HomeLayout 
                    exact
                    path={ROUTERS.HOME_PAGE}
                    component = {HomePage}
               />    
               <AdminLayout
                    exact
                    path={ROUTERS.INFORMATION_ADMIN}
                    component = {Information}
               />             
               <AdminLayout
                    exact
                    path={ROUTERS.COMPANY_LIST}
                    component = {Company}
               />
               <AdminLayout
                    exact
                    path={ROUTERS.SCHOOL_LIST}
                    component = {School}
               />
               <AdminLayout
                    exact
                    path={ROUTERS.REPORT_ADMIN}
                    component = {Report}
               />

               <ManagerLayout
                    exact
                    path={ROUTERS.INFORMATION_MANAGER}
                    component = {Information}
               />
               <ManagerLayout
                    exact
                    path={ROUTERS.TABLE}
                    component = {Leader}
               />
               <ManagerLayout
                    exact
                    path={ROUTERS.INTERNS_MANAGER}
                    component = {Interns}
               />
               <ManagerLayout
                    exact
                    path={ROUTERS.COURSE_MANAGER}
                    component = {Course}
               />
               <ManagerLayout
                    exact
                    path={ROUTERS.TASK_MANAGER}
                    component = {Task}
               />
               <ManagerLayout
                    exact
                    path={ROUTERS.QUESTION_MANAGER}
                    component = {Question}
               />

               <LeaderSidebar
                    exact
                    path={ROUTERS.INFORMATION_LEADER}
                    component = {Information}
               />
               <LeaderSidebar
                    exact
                    path={ROUTERS.QUESTION}
                    component = {Question}
               />
               <LeaderSidebar
                    exact
                    path={ROUTERS.TASK}
                    component = {Task}
               />
               <LeaderSidebar
                    exact
                    path={ROUTERS.COURSE}
                    component = {Course}
               />
               <LeaderSidebar
                    exact
                    path={ROUTERS.INTERNS_LEADER}
                    component = {Interns}
               />

               <SchoolSidebar
                    exact
                    path={ROUTERS.INFORMATION_PERSON_SCHOOL}
                    component = {Information}
               />
               <SchoolSidebar
                    exact
                    path={ROUTERS.INFORMATION_FACULTY_OF_SCHOOL}
                    component = {Faculty}
               />
               <SchoolSidebar
                    exact
                    path={ROUTERS.INFORMATION_SCHOOL}
                    component = {SchoolInfo}
               />

               <SchoolSidebar
                    exact
                    path={ROUTERS.INTERNS_SCHOOL}
                    component = {Interns}
               />

               <FacultySidebar
                    exact
                    path={ROUTERS.INFORMATION_PERSON_FACULTY}
                    component = {Information}
               />
               {/* <FacultySidebar
                    exact
                    path={ROUTERS.INFORMATION_FACULTY_SCHOOL}
                    component = {Information}
               /> */}
               <FacultySidebar
                    exact
                    path={ROUTERS.INTERNS_FACULTY}
                    component = {Interns}
               />
               
               <StudentSidebar
                    exact
                    path={ROUTERS.INTERNS_INFORMATION}
                    component = {Information}
               />
               <StudentSidebar
                    exact
                    path={ROUTERS.COURSE_INFORMATION}
                    component = {CourseDetail}
               />
               <StudentSidebar
                    exact
                    path={ROUTERS.COURSE_RESULT}
                    component = {Result}
               />
           </Switch>
       </Router>
    );
}

export default BrowserRouter;