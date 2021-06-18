import { put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_COMPANY_LIST_HOME_SUCCESS,
    GET_COMPANY_LIST_HOME_FAIL,
    GET_COMPANY_LIST_HOME,
    GET_COURSE_LIST_HOME,
    GET_COURSE_LIST_HOME_SUCCESS,
    GET_COURSE_LIST_HOME_FAIL,
  } from '../constants'

function createCompanyList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            key: item.companyId._id,
            name: item.companyId.name,
            address: item.companyId.address,
            phone: item.companyId.phone,
            fax: item.companyId.fax,
            email: item.companyId.email,
            logo: item.companyId.logo,
            website: item.companyId.website,
            expiryDate: item.companyId.expiryDate,
            status: item.companyId.status,
            startDay: item.companyId.startDay,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getCompanyListHomeSaga(action){
    const { current, pageSize} = action.payload;
    const apiUrl = 'http://localhost:5000/post/companyOfHome';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...pageSize && {pageSize},
            ...current && {current},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const list = yield createCompanyList(res.data.list);
        console.log("🚀 ~ file: school.saga.js ~ line 52 ~ function*getCompanyListSaga ~ list", list)
        const newDatabase = {
            newList: list,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_COMPANY_LIST_HOME_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_COMPANY_LIST_HOME_FAIL,
            payload: error,
        });
    }
}

function createCourseList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            key: item._id,
            courseName: item.courseName,
            status: item.status,
            startDay: item.startDay,
            description: item.description,
            nameCompany: item.companyId.name,
            logo: item.companyId.logo,
            fullName: item.personId.fullName,
            avatar: item.personId.avatar,
            expiryDate: item.expiryDate,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getCourseListHomeSaga(action){
    console.log("🚀 ~ file: home.saga.js ~ line 91 ~ function*getCourseListHomeSaga ~ action.payload", action.payload)
    // const { keySearch, current, pageSize} = action.payload;
    const apiUrl = 'http://localhost:5000/post/findCourses';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,
        },
        // params: {
        //     ...pageSize && {pageSize},
        //     ...current && {current},
        // },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const list = yield createCourseList(res.data);
        yield put({
            type: GET_COURSE_LIST_HOME_SUCCESS,
            payload: list,
        })
    } catch (error) {
        yield put({
            type: GET_COURSE_LIST_HOME_FAIL,
            payload: error,
        });
    }
}

export default function* homeInfSaga() {
    yield takeEvery(GET_COMPANY_LIST_HOME, getCompanyListHomeSaga);
    yield takeEvery(GET_COURSE_LIST_HOME, getCourseListHomeSaga);
    // yield debounce(300,GET_COURSE_LIST_HOME, getCourseListHomeSaga);
    // yield takeEvery(ACTIVE_COMPANY, activeCompanySaga);
    // yield takeEvery(EXTEND_COMPANY, extendCompanySaga);
    // yield takeEvery(UPDATE_COMPANY, updateCompanySaga);
    // yield takeEvery(DELETE_COMPANY, deleteCompanySaga);
}