import {debounce, put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_SCHOOL_LIST_SUCCESS,
    GET_SCHOOL_LIST_FAIL,
    GET_SCHOOL_LIST,
    SET_SCHOOL,
    SET_SCHOOL_FAIL,
    ACTIVE_SCHOOL,
    EXTEND_SCHOOL,
    UPDATE_SCHOOL,
    DELETE_SCHOOL,
    SEARCH_SCHOOL_LIST,
  } from '../constants'

function createListOrgan(arr){
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

function* getSchoolListSaga(action){
    console.log("🚀 ~ file: school.saga.js ~ line 37 ~ function*getSchoolListSaga ~ action.payload.pagination", action.payload)
    const { keySearch, current, pageSize} = action.payload;
    const apiUrl = 'http://localhost:5000/post/listSchool';
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
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const list = yield createListOrgan(res.data.list);
        console.log("🚀 ~ file: school.saga.js ~ line 52 ~ function*getSchoolListSaga ~ list", list)
        const newDatabase = {
            newList: list,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_SCHOOL_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_SCHOOL_LIST_FAIL,
            payload: error,
        });
    }
}

function* createSchoolSaga(action){
    console.log("🚀 ~ file: school.saga.js ~ line 74 ~ function*createSchoolSaga ~ action", action)
    const apiUrl = 'http://localhost:5000/post/createSchool';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    try {
        const res = yield axios.post(apiUrl,action.payload,config);
        console.log("🚀 ~ file: school.saga.js ~ line 84 ~ function*createSchoolSaga ~ res", res)
        yield put({
            type: GET_SCHOOL_LIST,
            payload: {current: 1, pageSize: 10, total: 0},
        })
    } catch (error) {
        yield put({
            type: SET_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* activeSchoolSaga(action){
    console.log("🚀 ~ file: organization.saga.js ~ line 171 ~ function*activeOrganSaga ~ action", action.payload)
    const apiUrl = 'http://localhost:5000/post/activeOrganization';
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
            type: GET_SCHOOL_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* extendSchoolSaga(action){
    const {expiryDate, _id } = action.payload
    const pagination = action.payload.pagination
    console.log("🚀 ~ file: organization.saga.js ~ line 139 ~ function*updateOrganSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/extendOrganization';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ..._id && {_id},    
        ...expiryDate && {expiryDate},
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_SCHOOL_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* updateSchoolSaga(action){
    const {expiryDate,organInfo, _id } = action.payload
    const pagination = action.payload.pagination
    console.log("🚀 ~ file: organization.saga.js ~ line 139 ~ function*updateOrganSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/updateOrg';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ..._id && {_id},    
        ...expiryDate && {expiryDate},
        ...organInfo && {organInfo}
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_SCHOOL_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_SCHOOL_FAIL,
            payload: error,
        });
    }
}

function* deleteSchoolSaga(action){
    const apiUrl = 'http://localhost:5000/post/delete';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    const companyId= action.payload.companyId;
    try {
        // const res = yield axios.delete(`${apiUrl}/${companyId}`,config);
        yield axios.delete(`${apiUrl}/${companyId}`,config);
        const pagination = action.payload.pagination;
        console.log("🚀 ~ file: organization.saga.js ~ line 169 ~ function*deleteOrganSaga ~ pagination", pagination)
        yield put({
            type: GET_SCHOOL_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_SCHOOL_FAIL,
            payload: error,
        });
    }
}

export default function* organInfSaga() {
    yield takeEvery(GET_SCHOOL_LIST, getSchoolListSaga);
    yield debounce(300,SEARCH_SCHOOL_LIST, getSchoolListSaga);
    yield takeEvery(SET_SCHOOL, createSchoolSaga);
    yield takeEvery(ACTIVE_SCHOOL, activeSchoolSaga);
    yield takeEvery(EXTEND_SCHOOL, extendSchoolSaga);
    yield takeEvery(UPDATE_SCHOOL, updateSchoolSaga);
    yield takeEvery(DELETE_SCHOOL, deleteSchoolSaga);
}