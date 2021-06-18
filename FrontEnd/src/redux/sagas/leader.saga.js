import {debounce, put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_TASK_LIST,
    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_FAIL,
    SET_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SEARCH_TASK_LIST,
    GET_TASKS,
    GET_TASKS_SUCCESS,

    GET_QUESTION_LIST_SUCCESS,
    GET_QUESTION_LIST_FAIL,
    GET_QUESTION_LIST,
    SET_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
    SEARCH_QUESTION_LIST,

    GET_COURSE_LIST_SUCCESS,
    GET_COURSE_LIST_FAIL,
    GET_COURSE_LIST,
    SET_COURSE,
    ACTIVE_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    GET_COURSE_WITH_TASK_LIST,
    GET_COURSE_TASK_SUCCESS,
    GET_NEW_TASK_LIST,
    GET_NEW_TASK_LIST_SUCCESS,
    UPDATE_COURSE_WITH_TASK,
    SET_COURSE_ID,
    GET_NEW_TASK_LIST_FAIL,

    GET_INTERNS_NO_COURSE,
    GET_INTERNS_NO_COURSE_SUCCESS,
    GET_INTERNS_NO_COURSE_FAIL,
    SET_INTERNS_NO_COURSE,
    SET_INTERNS_NO_COURSE_FAIL,
    GET_NEW_COURSE_LIST,
    GET_NEW_COURSE_LIST_SUCCESS,
    GET_NEW_COURSE_LIST_FAIL,

    UPDATE_INTERNS_NO_COURSE,
    UPDATE_INTERNS_NO_COURSE_FAIL,
    UPDATE_INTERNS_NO_COURSE_LIST,
    UPDATE_INTERNS_NO_COURSE_LIST_FAIL,
    GET_COMPANY_OR_SCHOOL,
    GET_COMPANY_OR_SCHOOL_FAIL,
    GET_COMPANY_OR_SCHOOL_SUCCESS,
    GET_INTERNS_NO_COURSE_SCHOOL,
    GET_INTERNS_NO_COURSE_SCHOOL_FAIL,
    GET_INTERNS_HAVE_COURSE,
    GET_INTERNS_HAVE_COURSE_SUCCESS,
    GET_INTERNS_HAVE_COURSE_FAIL,

    GET_FACULTY_OF_SCHOOL,
    GET_FACULTY_OF_SCHOOL_FAIL,
    GET_FACULTY_OF_SCHOOL_SUCCESS,
    DELETE_INTERN,
    DELETE_INTERN_FAIL,
    GET_COMPANY_OR_FACULTY,
    GET_COMPANY_OR_FACULTY_FAIL,
    GET_COMPANY_OR_FACULTY_SUCCESS,
    ACTIVE_USERNAME,
    ACTIVE_USERNAME_FAIL,
    GET_INTERNS_HAVE_COURSE_SCHOOL,
    GET_INTERNS_HAVE_COURSE_SCHOOL_FAIL,

  } from '../constants'

  //-----------Task------------//
function* getTaskListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');

    // dung IF doi voi leader

    const { keySearch, current, pageSize, company,person} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findTaskList';
    
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...pageSize && {pageSize},
            ...current && {current},
            ...keySearch && {keySearch},
            ...person && {person},
            ...company && {company},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        console.log("🚀 ~ file: leader.saga.js ~ line 58 ~ function*getTaskListSaga ~ res", res)
        const taskList = res.data.list;
        console.log("🚀 ~ file: school.saga.js ~ line 52 ~ function*getSchoolListSaga ~ list", taskList)
        const newDatabase = {
            newList: taskList,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_TASK_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

function* selectTasksSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');

    // dung IF doi voi leader
    const { keySearch, person, company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/selectTaskList';
    
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...keySearch && {keySearch},
            ...person && {person},
            ...company && {company},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        yield put({
            type: GET_TASKS_SUCCESS,
            payload: res.data,
        })
    } catch (error) {
        yield put({
            type: GET_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

function* createTaskSaga(action){
    console.log("🚀 ~ file: leader.saga.js ~ line 160 ~ function*createTaskSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/createTask';
    const cookie = new Cookie();
    // const userName = cookie.get("userInfo");
    const token = cookie.get('token');
    const { pagination, person, taskInfo} = action.payload;
    const { taskName, video, note} = taskInfo;
    const personId = person;
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...note && {note},    
        ...taskName && {taskName},
        ...video && {video},
        ...personId && {personId},
    }
    try {
        // const res = yield axios.post(apiUrl,params,config);
        yield axios.post(apiUrl,params,config);
        yield put({
            type: GET_TASK_LIST,
            payload: {...pagination, person},
        })
    } catch (error) {
        yield put({
            type: GET_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

function* updateTaskSaga(action){
    const {pagination,taskInfo, _id, person } = action.payload
    console.log("🚀 ~ file: leader.saga.js ~ line 188 ~ function*updateTaskSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/updateTask';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ..._id && {_id},    
        ...taskInfo && {taskInfo}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_TASK_LIST,
            payload: {...pagination,person},
        });
    } catch (error) {
        yield put({
            type: GET_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

function* deleteTaskSaga(action){
    const apiUrl = 'http://localhost:5000/post/deleteTask';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { pagination, person, taskId, role} = action.payload;

    const config = {
        headers:{
            Authorization: token,       
        },
    };
    try {
        // const res = yield axios.delete(`${apiUrl}/${taskId}`,config);
        yield axios.delete(`${apiUrl}/${taskId}`,config);
        // const pagination = action.payload.pagination;
        const par = {...pagination}
        if(role === "6045cf1c83a38015cc63ccc3"){
            par.person = person._id
        }else{
            par.company = person.companyId
        }
        yield put({
            type: GET_TASK_LIST,
            // payload: {...pagination, person},
            payload: par,
        });
    } catch (error) {
        yield put({
            type: GET_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

//----------------Question-------//
function* getQuestionListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { keySearch, current, pageSize, selectTaskId, person, company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findQuestionList';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...pageSize && {pageSize},
            ...current && {current},
            ...keySearch && {keySearch},
            ...person && {person},
            ...selectTaskId && {selectTaskId},
            ...company && {company},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const taskList = res.data.list;
        const newDatabase = {
            newList: taskList,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_QUESTION_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_QUESTION_LIST_FAIL,
            payload: error,
        });
    }
}

function* createQuestionSaga(action){
    const apiUrl = 'http://localhost:5000/post/createQuestion';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { content, answer_A, answer_B, answer_C,answer_D, result, image, taskId} = action.payload;
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...content && {content},    
        ...answer_A && {answer_A},
        ...answer_B && {answer_B},
        ...answer_C && {answer_C},
        ...answer_D && {answer_D},
        ...result && {result},
        ...image && {image},
        ...taskId && {taskId},
    }
    try {
        // const res = yield axios.post(apiUrl,params,config);
        yield axios.post(apiUrl,params,config);
        yield put({
            type: GET_QUESTION_LIST,
            payload: {current: 1, pageSize: 10, total: 0},
        })
    } catch (error) {
        yield put({
            type: GET_QUESTION_LIST_FAIL,
            payload: error,
        });
    }
}

function* updateQuestionSaga(action){
    const {pagination,questionInfo, _id } = action.payload
    const apiUrl = 'http://localhost:5000/post/updateQuestion';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ..._id && {_id},    
        ...questionInfo && {questionInfo}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_QUESTION_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: GET_QUESTION_LIST_FAIL,
            payload: error,
        });
    }
}

function* deleteQuestionSaga(action){
    const apiUrl = 'http://localhost:5000/post/deleteQuestion';
    const {questionId,pagination } = action.payload
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    // const questionId= action.payload.questionId;
    try {
        // const res = yield axios.delete(`${apiUrl}/${questionId}`,config);
        yield axios.delete(`${apiUrl}/${questionId}`,config);
        // const pagination = action.payload.pagination;
        yield put({
            type: GET_QUESTION_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: GET_QUESTION_LIST_FAIL,
            payload: error,
        });
    }
}

//------- Course----------------//
function* getCourseListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { current, pageSize, person, company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findCourseList';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...pageSize && {pageSize},
            ...current && {current},
            ...person && {person},
            ...company && {company},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const courseList = res.data.list;
        const newDatabase = {
            newList: courseList,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type:  GET_COURSE_LIST_SUCCESS,
            payload: newDatabase,
        })
        yield put({
            type:  SET_COURSE_ID,
            payload: courseList[0]._id,
        })
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* createCourseSaga(action){
    const startDay = action.payload.startDay._d;
    const apiUrl = 'http://localhost:5000/post/createCourse';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {
        courseName,
        expiryDate,
        personId,
        companyId,
        description,
    } = action.payload;
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...courseName && {courseName},    
        ...expiryDate && {expiryDate},
        ...personId && {personId},
        ...companyId && {companyId},
        ...startDay && {startDay},
        ...description && {description},
    }
    try {
        // const res = yield axios.post(apiUrl,params,config);
        yield axios.post(apiUrl,params,config);
        const company = companyId;
        const person = personId;
        yield put({
            type: GET_COURSE_LIST,
            payload: person? {current: 1, pageSize: 10, total: 0, person } : {current: 1, pageSize: 10, total: 0, company }
        })
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* activeCourseSaga(action){
    console.log("🚀 ~ file: organization.saga.js ~ line 171 ~ function*activeOrganSaga ~ action", action.payload)
    const apiUrl = 'http://localhost:5000/post/activeCourse';
    const {
        pagination,
        person,
        company,} = action.payload
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        _id:action.payload._id,
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_COURSE_LIST,
            payload: person? {...pagination, person } : {...pagination, company },
        });
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* updateCourseSaga(action){
    const {pagination,courseInf ,courseId } = action.payload
    const person = courseInf.personId;
    const company = courseId.companyId;
    const apiUrl = 'http://localhost:5000/post/updateCourse';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...courseInf && {courseInf},
        ...courseId && {courseId}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_COURSE_LIST,
            payload: person? {...pagination, person } : {...pagination, company },
        });
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* deleteCourseSaga(action){
    const apiUrl = 'http://localhost:5000/post/deleteCourse';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    const {pagination,courseId,person,company} = action.payload;
    // const courseId= action.payload.courseId;
    try {
        // const res = yield axios.delete(`${apiUrl}/${courseId}`,config);
        yield axios.delete(`${apiUrl}/${courseId}`,config);
        // const person = action.payload.person;
        // const company = action.payload.company;
        yield put({
            type: GET_COURSE_LIST,
            payload: person? {...pagination,person}: {...pagination,company}
        });
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}


//--------CourseWithTasks---//

function createTasksList(arr){
    let newList = [];
    arr.map((item)=>{
        const object = {
            key: item.taskId._id, 
            _id: item.taskId._id, 
            sort: item.sort , 
            taskName: item.taskId.taskName,
            note: item.taskId.note,
            video:item.taskId.video,
            exam: item.taskId.exam,

        };
        newList= [...newList, object];
    })
    return newList;
}

function* getCourseWithTaskListSaga(action){
    // console.log("🚀 ~ file: leader.saga.js ~ line 568 ~ function*getCourseWithTaskListSaga ~ action.payload", action.payload)
    const cookie = new Cookie();
    const token = cookie.get('token');
    const courseId = action.payload;
    // console.log("🚀 ~ file: leader.saga.js ~ line 498 ~ function*getCourseWithTaskListSaga ~ courseId", courseId)
    const apiUrl = 'http://localhost:5000/post/findCourseWithTask';
    const config = {
        headers:{
            authorization: token,
        },          
    }
    try {
        const res = yield axios.get(`${apiUrl}/${courseId}`,config);
        const TasksList = yield createTasksList(res.data);
        yield put({
            type:  GET_COURSE_TASK_SUCCESS,
            payload: TasksList,
        })
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* getNewTaskListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { courseId, person} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findTasksList';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...person && {person},
            ...courseId && {courseId},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newTaskList = res.data;
        yield put({
            type:  GET_NEW_TASK_LIST_SUCCESS,
            payload: newTaskList,
        })
    } catch (error) {
        yield put({
            type: GET_NEW_TASK_LIST_FAIL,
            payload: error,
        });
    }
}

function* updateCourseWithTaskSaga(action){
    const {newCourseWithTasks,courseId, person } = action.payload
    const apiUrl = 'http://localhost:5000/post/updateCourseWithTasksList';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...courseId && {courseId},    
        ...newCourseWithTasks && {newCourseWithTasks}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_COURSE_WITH_TASK_LIST,
            payload: courseId,
        });
        yield put({
            type: GET_NEW_TASK_LIST,
            payload: {person, courseId},
        });
    } catch (error) {
        yield put({
            type: GET_QUESTION_LIST_FAIL,
            payload: error,
        });
    }
}

//-------------------Interns--------------------//

function  customizedInternsList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            key: item._id,
            fullName: item.personId.fullName,
            address: item.personId.address,
            phone: item.personId.phone,
            email: item.personId.email,
            birthday: item.personId.birthday,
            result: item.result,
            courseId: item.personId.courseId,
            companyId: item.personId.companyId,
            schoolId: item.personId.schoolId,
            status: item.personId.status,
        };
        newList= [...newList, object];
    })
    return newList;
}

function  customizedCourseList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            key: item._id,
            courseName: item.courseName,
            startDay: item.startDay,
            expiryDate: item.expiryDate,
            companyId: item.companyId,
            personId: item.personId,
            status: item.status,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getInternNoCourseListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {courseVal, current, pageSize, faculty, company, course} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findInternList/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...faculty && {faculty},
            ...course && {course},
            ...pageSize && {pageSize},
            ...current && {current},
            ...courseVal && {courseVal},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const pagination = {
            current: current,
            pageSize: pageSize,
        }
        const newList = customizedInternsList(res.data.list)
        yield put({
            type:  GET_INTERNS_NO_COURSE_SUCCESS,
            payload: {...res,newList,pagination},
        })
    } catch (error) {
        yield put({
            type: GET_INTERNS_NO_COURSE_FAIL,
            payload: error,
        });
    }
}

function* getInternHaveCourseListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {courseVal, current, pageSize, faculty, company, course} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findInternList/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...faculty && {faculty},
            ...course && {course},
            ...pageSize && {pageSize},
            ...current && {current},
            ...courseVal && {courseVal},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const pagination = {
            current: current,
            pageSize: pageSize,
        }
        const newList = customizedInternsList(res.data.list)
        yield put({
            type:  GET_INTERNS_HAVE_COURSE_SUCCESS,
            payload: {...res,newList,pagination},
        })
    } catch (error) {
        yield put({
            type: GET_INTERNS_HAVE_COURSE_FAIL,
            payload: error,
        });
    }
}


function* getNewCourseListSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {company, person } = action.payload;
    const apiUrl = 'http://localhost:5000/post/newFindCourseList/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...person && {person},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = customizedCourseList(res.data)
        yield put({
            type:  GET_NEW_COURSE_LIST_SUCCESS,
            payload: newList,
        })
    } catch (error) {
        yield put({
            type: GET_NEW_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function* updateInternNoCourseSaga(action){
    const {internInf, internId, pagination, companyId , courseVal } = action.payload
    const apiUrl = 'http://localhost:5000/post/updateIntern';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...internId && {internId},    
        ...internInf && {internInf}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        const param = {
            courseVal: courseVal,
            current: pagination.current, 
            pageSize: pagination.pageSize, 
            company: companyId
        }
        yield put({
            type: GET_INTERNS_NO_COURSE,
            payload: param,
        });
    } catch (error) {
        yield put({
            type: UPDATE_INTERNS_NO_COURSE_FAIL,
            payload: error,
        });
    }
}

function* updateInternNoCourseListSaga(action){
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const token = cookie.get('token');
    const companyId = userName.personId.companyId;
    const {
        selectedRowKeys, 
        courseId, 
        pagination,  
        courseVal, } = action.payload
    // console.log("🚀 ~ file: leader.saga.js ~ line 781 ~ function*updateInternNoCourseListSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/updateInternList';
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...selectedRowKeys && {selectedRowKeys},    
        ...courseId && {courseId}
    }
    try {
        yield axios.put(apiUrl,params,config);
        const param = {
            courseVal: courseVal,
            current: pagination.current, 
            pageSize: pagination.pageSize, 
            company: companyId
        }
        yield put({
            type: GET_INTERNS_NO_COURSE,
            payload: param,
        });
    } catch (error) {
        yield put({
            type: UPDATE_INTERNS_NO_COURSE_LIST_FAIL,
            payload: error,
        });
    }
}

function createOrganizationList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            key: item._id,
            name: item.name,
            address: item.address,
            phone: item.phone,
            fax: item.fax,
            email: item.email,
            logo: item.logo,
            website: item.website,
            expiryDate: item.expiryDate,
            status: item.status,
            startDay: item.startDay,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getCompanyOrSchoolSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {company, school } = action.payload;
    const apiUrl = 'http://localhost:5000/post/getCompanyOrSchool/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...school && {school},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = createOrganizationList(res.data)
        yield put({
            type:  GET_COMPANY_OR_SCHOOL_SUCCESS,
            payload: newList,
        })
    } catch (error) {
        yield put({
            type: GET_COMPANY_OR_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* getInternNoSchoolSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {courseVal, current, pageSize, company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findInternOfSchoolList/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...courseVal && {courseVal},
            ...current && {current},
            ...pageSize && {pageSize},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const pagination = {
        current: current,
        pageSize: pageSize,
        }
        const newList = customizedInternsList(res.data.list)
        yield put({
            type:  GET_INTERNS_NO_COURSE_SUCCESS,
            payload: {...res,newList,pagination},
        })
    } catch (error) {
        yield put({
            type: GET_INTERNS_NO_COURSE_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* getInternSchoolSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {courseVal, current, pageSize, company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findInternOfSchoolList/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
            ...courseVal && {courseVal},
            ...current && {current},
            ...pageSize && {pageSize},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const pagination = {
        current: current,
        pageSize: pageSize,
        }
        const newList = customizedInternsList(res.data.list)
        yield put({
            type:  GET_INTERNS_HAVE_COURSE_SUCCESS,
            payload: {...res,newList,pagination},
        })
    } catch (error) {
        yield put({
            type: GET_INTERNS_HAVE_COURSE_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* getFacultyOfSchoolSaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { company} = action.payload;
    const apiUrl = 'http://localhost:5000/post/getFacultyOfSchool/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...company && {company},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = createOrganizationList(res.data)
        yield put({
            type:  GET_FACULTY_OF_SCHOOL_SUCCESS,
            payload: newList
        })
    } catch (error) {
        yield put({
            type: GET_FACULTY_OF_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* deleteInternSaga(action){
    const apiUrl = 'http://localhost:5000/post/deleteIntern';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {courseVal, current, pageSize, faculty, company, internId} = action.payload;
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    try {
        // const res = yield axios.delete(`${apiUrl}/${internId}`,config);
        yield axios.delete(`${apiUrl}/${internId}`,config);
        courseVal ?
        yield put({
            type: GET_INTERNS_NO_COURSE,
            payload: {courseVal, current, pageSize, faculty}
        }):
        yield put({
            type: GET_INTERNS_HAVE_COURSE,
            payload: {courseVal, current, pageSize, company}
        })
        ;
    } catch (error) {
        yield put({
            type: DELETE_INTERN_FAIL,
            payload: error,
        });
    }
}

function* getCompanyOrFacultySaga(action){
    const cookie = new Cookie();
    const token = cookie.get('token');
    const { organizationVal} = action.payload;
    const apiUrl = 'http://localhost:5000/post/getCompanyOrFaculty/';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...organizationVal && {organizationVal},
        },           
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = createOrganizationList(res.data)
        yield put({
            type: GET_COMPANY_OR_FACULTY_SUCCESS ,
            payload: newList
        })
    } catch (error) {
        yield put({
            type: GET_COMPANY_OR_FACULTY_FAIL,
            payload: error,
        });
    }
}

function* createInternSaga(action){
    const apiUrl = 'http://localhost:5000/post/createIntern';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {
        current,
        pageSize,
        courseVal,
        role,
    } = action.payload;
    const { fullName,birthday,gender,
            address,phone,email,roleId,
            companyId, schoolId} = action.payload.internIfo;
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...fullName && {fullName},    
        ...birthday && {birthday},
        ...gender && {gender},
        ...address && {address},
        ...phone && {phone},
        ...email && {email},
        ...roleId && {roleId},
        ...companyId && {companyId},
        ...schoolId && {schoolId},
    }
    try {
        const res = yield axios.post(apiUrl,params,config);
        const param = {
            courseVal: courseVal,
            current: current, 
            pageSize: pageSize, 
        }
        if(role === "6045cf1c83a38015cc63ccc5"){
            param.faculty = schoolId
        }else{
            param.company = companyId 
        }
        yield put({
            type: GET_INTERNS_NO_COURSE,
            payload: param
        })
    } catch (error) {
        yield put({
            type: SET_INTERNS_NO_COURSE_FAIL,
            payload: error,
        });
    }
}

function* activeUserNameSaga(action){
    console.log("🚀 ~ file: leader.saga.js ~ line 1095 ~ function*activeUserNameSaga ~ action", action.payload)
    const apiUrl = 'http://localhost:5000/post/activeUser';
    const {courseVal, paginationOne, company, internId} = action.payload;
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        _id: internId,
    }
    
    try {
        const res = yield axios.put(apiUrl,params,config);
        console.log("🚀 ~ file: leader.saga.js ~ line 1112 ~ function*activeUserNameSaga ~ res", res)
        yield put({
            type: GET_INTERNS_HAVE_COURSE,
            payload: {...paginationOne, courseVal, company}
        })
    } catch (error) {
        yield put({
            type: ACTIVE_USERNAME_FAIL,
            payload: error,
        });
    }
}


export default function* leaderInfSaga() {
    yield takeEvery(GET_TASK_LIST, getTaskListSaga);
    yield debounce(300,SEARCH_TASK_LIST, getTaskListSaga);
    yield takeEvery(SET_TASK, createTaskSaga);
    yield takeEvery(UPDATE_TASK, updateTaskSaga);
    yield takeEvery(DELETE_TASK, deleteTaskSaga);
    yield takeEvery(GET_TASKS, selectTasksSaga);

    yield takeEvery(GET_QUESTION_LIST, getQuestionListSaga);
    yield debounce(300,SEARCH_QUESTION_LIST, getQuestionListSaga);
    yield takeEvery(SET_QUESTION, createQuestionSaga);
    yield takeEvery(UPDATE_QUESTION, updateQuestionSaga);
    yield takeEvery(DELETE_QUESTION, deleteQuestionSaga);

    yield takeEvery(GET_COURSE_LIST, getCourseListSaga);
    // yield debounce(300,SEARCH_COURSE_LIST, New);
    yield takeEvery(SET_COURSE, createCourseSaga);
    yield takeEvery(ACTIVE_COURSE, activeCourseSaga);
    yield takeEvery(UPDATE_COURSE, updateCourseSaga);
    yield takeEvery(DELETE_COURSE, deleteCourseSaga);

    yield takeEvery(GET_COURSE_WITH_TASK_LIST, getCourseWithTaskListSaga);
    yield takeEvery(GET_NEW_TASK_LIST, getNewTaskListSaga);
    yield takeEvery(UPDATE_COURSE_WITH_TASK, updateCourseWithTaskSaga);

    yield takeEvery(GET_INTERNS_NO_COURSE, getInternNoCourseListSaga);
    yield takeEvery(GET_NEW_COURSE_LIST, getNewCourseListSaga);
    yield takeEvery(UPDATE_INTERNS_NO_COURSE, updateInternNoCourseSaga);
    yield takeEvery(UPDATE_INTERNS_NO_COURSE_LIST, updateInternNoCourseListSaga);
    yield takeEvery(GET_COMPANY_OR_SCHOOL, getCompanyOrSchoolSaga);
    yield takeEvery(GET_INTERNS_NO_COURSE_SCHOOL, getInternNoSchoolSaga);
    yield takeEvery(GET_FACULTY_OF_SCHOOL, getFacultyOfSchoolSaga);
    yield takeEvery(DELETE_INTERN, deleteInternSaga);
    yield takeEvery(GET_COMPANY_OR_FACULTY, getCompanyOrFacultySaga);
    yield takeEvery(SET_INTERNS_NO_COURSE, createInternSaga);
    yield takeEvery(GET_INTERNS_HAVE_COURSE, getInternHaveCourseListSaga);
    yield takeEvery(ACTIVE_USERNAME, activeUserNameSaga);
    yield takeEvery(GET_INTERNS_HAVE_COURSE_SCHOOL, getInternSchoolSaga);
     
}