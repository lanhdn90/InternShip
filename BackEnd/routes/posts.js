import express from 'express';
import Person from'../models/Person.js'

import User from'../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {
    register, 
    login, 
    activeUser,
    findPersonalInfo,
    updatePersonalInfo,
    updateUserName,
} from '../controllers/AuthController.js'
import {
    findFacultyList,
    findCompanyList,
    findOrganization,
    createCompany,
    createSchool, 
    createFaculty,
    updateOrganization ,
    searchOrganization,
    deleteOrganization,
    activeOrganization,
    findListSchool,
    extendOrganization,
    deleteFaculty,
} from '../controllers/OrganizationController.js'

import {
    createLeader,
    findLeaderList,
    activeLeader,
    selectLeaderList,
    deleteLeader,
} from '../controllers/LeaderController.js'

import {
    findTaskList,
    createTask,
    updateTask,
    deleteTask,
    selectTaskList,
} from '../controllers/TaskController.js'

import {
    findQuestionList,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    searchQuestionList,
    findRadomQuestionList,
} from '../controllers/QuestionController.js'

import {
    findCourseLeaderList,
    findCourseList,
    createCourse,
    updateCourse,
    deleteCourse,
    searchCourseList,
    activeCourse,
    createCourseWithTask,
    findCourseWithTask,
    findTasksList,
    updateCourseWithTasksList,
    newFindCourseList,
    findCourses,
} from '../controllers/CourseController.js'

import {
    findIntern,
    findInternList,
    createIntern,
    getCompanyOrSchool,
    updateIntern,
    updateInternList,
    getFacultyOfSchool,
    findInternOfSchoolList,
    deleteIntern,
    getCompanyOrFaculty,
    // searchInternList,
} from '../controllers/InternsController.js'


const router = express.Router();    

router.post('/loginUserName', login);

const checkLogin =(req,res,next)=>{
    try {   
        let token = req.headers.authorization
        console.log("🚀 ~ file: posts.js ~ line 88 ~ checkLogin ~ token", token)
        let personId = jwt.verify(token,'verySecretValue')
        console.log("🚀 ~ file: posts.js ~ line 89 ~ checkLogin ~ personId", personId)
        Person.findOne({
            _id: personId._id._id
        })
        .then(data=>{
        console.log("🚀 ~ file: posts.js ~ line 84 ~ checkLogin ~ data", data)
            if(data){
                req.date = data.roleId
                next()
            }else{
                res.json('Not Permisson')
            }  
        })
        .catch(err =>{
            res.json('Khong co nguoi')
        })
    } catch (error) {
        res.status(500).json('token ko hop le')
    }
}   

const checkAdmin = (req,res,next)=>{
    const roleId = req.date;
    console.log("🚀 ~ file: posts.js ~ line 59 ~ checkAdmin ~ roleId", roleId)
    if(roleId == "6045cf1c83a38015cc63ccc1"){
        console.log('vao check login')
        next()
    }else{
        console.log('vao check role')
        res.json('ban ko co role nay')
    }
}

const checkStudent = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc6"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkSchools = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc4" || roleId == "6045cf1c83a38015cc63ccc5"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkSchool = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc4"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkFaculty = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc5"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkCompany = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc2" || roleId == "6045cf1c83a38015cc63ccc3"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkManager = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc2"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

const checkLeader = (req,res,next)=>{
    const roleId = req.date;
    if(roleId == "6045cf1c83a38015cc63ccc3"){
        next()
    }else{
        res.json('ban ko co quen nay')
    }
}

// router.get('/cookie', function(req, res){
//     res.cookie('name', 'freetuts.net', { expires: new Date(Date.now() + 900000)});
//     res.send('success') 
// });

// router.get('/getCookie', function(req, res){
//     if (req.cookies.token)
//         res.send(`Cookie name co gia tri la ${req.cookies.token}`)
//    res.send('Khong the tim lay cookie co ten la name')
// });

// router.get('/deleteCookie', function(req, res){
//     res.clearCookie('token');
//     res.send('Da xoa cookie')
//  });

router.post('/register', register);
//--------Organization-----------------///
// router.post('/createCompany',checkLogin, checkAdmin, createCompany);
// router.post('/createSchool',checkLogin, checkAdmin, createSchool);
// router.get('/listCompany', checkLogin, checkAdmin, findCompanyList);
// router.get('/listSchool', checkLogin, checkAdmin, findListSchool);
router.post('/createCompany', createCompany);
router.post('/createSchool', createSchool);
router.get('/listCompany',  findCompanyList);
router.get('/listSchool',  findListSchool);
router.get('/findFacultyList', findFacultyList);
router.get('/organization/:companyId', findOrganization);
router.get('/companyOfHome',  findCompanyList);

router.post('/createCompany',checkLogin, checkAdmin, createCompany);
router.post('/createSchool',checkLogin, checkAdmin, createSchool);
router.post('/createFaculty', createFaculty);


router.put('/updateOrg', updateOrganization);
router.put('/extendOrganization', extendOrganization);
router.put('/activeOrganization', activeOrganization);

router.delete('/delete/:companyId',deleteOrganization);
router.delete('/deleteFaculty/:schoolId',deleteFaculty);

//---------------MANAGER_CONTROLLER--------------------------///
//---------LEADER----------------//
router.get('/findLeaderList', findLeaderList);
router.post('/createLeader', createLeader);
router.put('/activeLeader', activeLeader);
router.get('/selectLeaderList', selectLeaderList);
router.delete('/deleteLeader',deleteLeader);

//-----------------LEADER_CONTROLLER---------------//
//-------------------TASK ------------------------//
router.get('/findTaskList', findTaskList);
router.get('/selectTaskList', selectTaskList);
router.post('/createTask', createTask);
router.put('/updateTask', updateTask);
router.delete('/deleteTask/:taskId',deleteTask);


//-------------------QUESTION ------------------------//

router.get('/findRadomQuestionList/',findRadomQuestionList);
router.get('/findQuestionList', findQuestionList);
router.get('/findQuestionList', findQuestionList);
router.post('/createQuestion', createQuestion);
router.put('/updateQuestion', updateQuestion);
router.delete('/deleteQuestion/:questionId',deleteQuestion);
router.get('/searchQuestionList', searchQuestionList);

//-------------------Course ------------------------//
router.get('/findCourseLeaderList/:personId', findCourseLeaderList);
router.get('/findCourseList', findCourseList);
router.get('/findCourses', findCourses);
router.post('/createCourse', createCourse);
router.put('/activeCourse', activeCourse);
router.put('/updateCourse', updateCourse);
router.delete('/deleteCourse/:courseId',deleteCourse);
router.get('/searchCourseList', searchCourseList);

router.get('/findCourseWithTask/:courseId', findCourseWithTask);
router.post('/createCourseWithTask', createCourseWithTask);
router.get('/findTasksList', findTasksList);
router.put('/updateCourseWithTasksList', updateCourseWithTasksList);

//-------------------Intern ------------------------//
router.get('/findInternList', findInternList);
router.get('/getCompanyOrSchool', getCompanyOrSchool);
router.post('/createIntern', createIntern);
router.get('/findInternOfSchoolList', findInternOfSchoolList);
router.get('/getFacultyOfSchool', getFacultyOfSchool);
router.get('/newFindCourseList', newFindCourseList);
router.get('/getCompanyOrFaculty', getCompanyOrFaculty);
router.put('/updateIntern', updateIntern);
router.put('/updateInternList', updateInternList);
router.put('/activeUser', activeUser);
router.delete('/deleteIntern/:internId',deleteIntern);


//-------------------INTERN ------------------------//
router.get('/findIntern/:internId', findIntern);

router.get('/findPersonalInfo/:personId', findPersonalInfo);
router.put('/updatePersonalInfo', updatePersonalInfo);

router.put('/updateUserName', updateUserName);
export default router;