import { put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_LEADER_LIST_SUCCESS,
    GET_LEADER_LIST_FAIL,
    GET_LEADER_LIST,
    SET_LEADER,
    SET_LEADER_FAIL,
    ACTIVE_LEADER,
    UPDATE_LEADER,
    UPDATE_LEADER_FAIL,
    DELETE_LEADER,
    DELETE_LEADER_FAIL,
    GET_COURSE_LEADER_LIST,
    GET_COURSE_LEADER_LIST_SUCCESS,
    GET_COURSE_LEADER_LIST_FAIL,
    GET_LEADERS,
    GET_LEADERS_SUCCESS,
    GET_LEADERS_FAIL,
  } from '../constants'

function* getLeaderListSaga(action){
    const { keySearch, current, pageSize, } = action.payload;
    const cooke = new Cookie();
    const userName = cooke.get("userInfo");
    const company = userName.personId.companyId;
    const apiUrl = 'http://localhost:5000/post/findLeaderList';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...pageSize && {pageSize},    
            ...current && {current},
            ...keySearch && {keySearch},
            ...company && {company},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newDatabase = {
            newList: res.data.list,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_LEADER_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_LEADER_LIST_FAIL,
            payload: error,
        });
    }
}

function* createLeaderSaga(action){
    const apiUrl = 'http://localhost:5000/post/createLeader';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,
        },
    }
    try {
        // const res = yield axios.post(apiUrl,action.payload,config);
        yield axios.post(apiUrl,action.payload,config);
        yield put({
            type: GET_LEADER_LIST,
            payload: {current: 1, pageSize: 10, total: 0},
        })
    } catch (error) {
        yield put({
            type: SET_LEADER_FAIL,
            payload: error, 
        });
    }
}

function* activeLeaderSaga(action){
    const apiUrl = 'http://localhost:5000/post/activeLeader';
    const pagination = action.payload.pagination
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
            type: GET_LEADER_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_LEADER_FAIL,
            payload: error,
        });
    }
}

function* updateLeaderSaga(action){
    const {personInf } = action.payload
    const apiUrl = 'http://localhost:5000/post/updatePersonalInfo';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...personInf && {personInf},
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
    } catch (error) {
        yield put({
            type: UPDATE_LEADER_FAIL,
            payload: error,
        });
    }
}

function* deleteLeaderSaga(action){
    // const {newLeader, pastLeader, current, pageSize} = action.payload
    const {newLeader, pastLeader} = action.payload
    const apiUrl = 'http://localhost:5000/post/deleteLeader';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
        params:  {
            ...newLeader && {newLeader},
            ...pastLeader && {pastLeader},
        }
    }
    
    try {
        // const res = yield axios.delete(apiUrl,config);
        yield axios.delete(apiUrl,config);
        yield put({
            type: GET_LEADER_LIST,
            payload: {current: 1, pageSize: 10, total: 0},
        })
    } catch (error) {
        yield put({
            type: DELETE_LEADER_FAIL,
            payload: error,
        });
    }
}

function customizedCourses(arr){
    let newList = [];
    arr.map((item)=>{
        const object = {
            key: item._id, 
            _id: item._id, 
            courseName: item.courseName , 
            startDay: item.startDay,
            expiryDate: item.expiryDate,
            status: item.status,
            personId: item.personId,
            companyId: item.companyId,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getCourseLeaderSaga(action){
    const apiUrl = 'http://localhost:5000/post/findCourseLeaderList';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,       
        },
    };
    const personId= action.payload;
    try {
        const res = yield axios.get(`${apiUrl}/${personId}`,config);
        const list = customizedCourses(res.data)
        yield put({
            type: GET_COURSE_LEADER_LIST_SUCCESS,
            payload: list,
        });
    } catch (error) {
        yield put({
            type: GET_COURSE_LEADER_LIST_FAIL,
            payload: error,
        });
    }
}

function customizedLeaders(arr){
    let newList = [];
    arr.map((item)=>{
        const object = {
            key: item._id, 
            _id: item._id, 
            fullName: item.fullName , 
            address: item.address,
            companyId: item.companyId,
            email: item.email,
            phone: item.phone,
            status: item.status,
            roleId: item.roleId,
            userId: item.userId,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getLeaderSelectSaga(action){
    const { companyId, personId } = action.payload;
    // const cooke = new Cookie();
    // const userName = cooke.get("userInfo");
    // const company = userName.personId.companyId;
    const apiUrl = 'http://localhost:5000/post/selectLeaderList';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...companyId && {companyId},    
            ...personId && {personId},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = customizedLeaders(res.data)
    //     const newDatabase = {
    //         newList: res.data.list,
    //         count: res.data.count,
    //         pagination: {current, pageSize},
    //     }
        yield put({
            type: GET_LEADERS_SUCCESS,
            payload: newList,
        })
    } catch (error) {
        yield put({
            type: GET_LEADERS_FAIL,
            payload: error,
        });
    }
}

export default function* leaderInfSaga() {
    yield takeEvery(GET_LEADER_LIST, getLeaderListSaga);
    yield takeEvery(GET_COURSE_LEADER_LIST, getCourseLeaderSaga);  
    // yield debounce(300,SEARCH_LEADER_LIST, getSchoolListSaga);
    yield takeEvery(SET_LEADER, createLeaderSaga);
    yield takeEvery(ACTIVE_LEADER, activeLeaderSaga);
    yield takeEvery(UPDATE_LEADER, updateLeaderSaga);
    yield takeEvery(GET_LEADERS, getLeaderSelectSaga);
    yield takeEvery(DELETE_LEADER, deleteLeaderSaga);
}