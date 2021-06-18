import {debounce, put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_FACULTY_LIST_SUCCESS,
    GET_FACULTY_LIST_FAIL,
    GET_FACULTY_LIST,
    SET_FACULTY,
    SET_FACULTY_FAIL,
    ACTIVE_FACULTY,
    ACTIVE_FACULTY_FAIL,
    UPDATE_FACULTY,
    UPDATE_FACULTY_FAIL,
    DELETE_FACULTY,
    DELETE_FACULTY_FAIL,
    SEARCH_FACULTY_LIST,
  } from '../constants'


function createFacultyList(arr){
    let newList = [];
    arr.map((item)=>{
        const object ={
            _id: item.schoolId._id,
            key: item.schoolId._id,
            name: item.schoolId.name,
            address: item.schoolId.address,
            phone: item.schoolId.phone,
            fax: item.schoolId.fax,
            email: item.schoolId.email,
            logo: item.schoolId.logo,
            website: item.schoolId.website,
            expiryDate: item.schoolId.expiryDate,
            status: item.schoolId.status,
            startDay: item.schoolId.startDay,
        };
        newList= [...newList, object];
    })
    return newList;
}

function* getFacultyListSaga(action){
    const { keySearch, current, pageSize, company } = action.payload;
    const apiUrl = 'http://localhost:5000/post/findFacultyList';
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
        const list = yield createFacultyList(res.data.list);
        const newDatabase = {
            newList: list,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_FACULTY_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_FACULTY_LIST_FAIL,
            payload: error,
        });
    }
}

function* createFacultySaga(action){
    const apiUrl = 'http://localhost:5000/post/createFaculty';
    const {FacultyInfo, companyId} = action.payload
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        }
    }
    const params= {
        ...FacultyInfo && {FacultyInfo},    
        ...companyId && {companyId},
    }
    try {
        // const res = yield axios.post(apiUrl,params,config);
        yield axios.post(apiUrl,params,config);
        yield put({
            type: GET_FACULTY_LIST,
            payload: {current: 1, pageSize: 10, total: 0, company:companyId },
        })
    } catch (error) {
        yield put({
            type: SET_FACULTY_FAIL,
            payload: error,
        });
    }
}

function* activeFacultySaga(action){
    const apiUrl = 'http://localhost:5000/post/activeOrganization';
    const {pagination, _id, company} = action.payload
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        _id: _id,
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_FACULTY_LIST,
            payload: {...pagination, company},
        });
    } catch (error) {
        yield put({
            type: ACTIVE_FACULTY_FAIL,
            payload: error,
        });
    }
}

function* updateFacultySaga(action){
    const {pagination,organInfo, _id, companyId } = action.payload
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
        ...organInfo && {organInfo} 
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_FACULTY_LIST,
            payload: {...pagination, company:companyId},
        });
    } catch (error) {
        yield put({
            type: UPDATE_FACULTY_FAIL,
            payload: error,
        });
    }
}

function* deleteFacultySaga(action){
    console.log("🚀 ~ file: faculty.saga.js ~ line 168 ~ function*deleteFacultySaga ~ action", action.payload)
    const apiUrl = 'http://localhost:5000/post/deleteFaculty';
    const {schoolId, pagination, company} = action.payload
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    try {
        const res = yield axios.delete(`${apiUrl}/${schoolId}`,config);
        console.log("🚀 ~ file: faculty.saga.js ~ line 180 ~ function*deleteFacultySaga ~ res", res)
        yield put({
            type: GET_FACULTY_LIST,
            payload: {...pagination, company },
        });
    } catch (error) {
        yield put({
            type: DELETE_FACULTY_FAIL,
            payload: error,
        });
    }
}

export default function* facultyInfSaga() {
    yield takeEvery(GET_FACULTY_LIST, getFacultyListSaga);
    yield debounce(300,SEARCH_FACULTY_LIST, getFacultyListSaga);
    yield takeEvery(SET_FACULTY, createFacultySaga);
    yield takeEvery(ACTIVE_FACULTY, activeFacultySaga);
    yield takeEvery(UPDATE_FACULTY, updateFacultySaga);
    yield takeEvery(DELETE_FACULTY, deleteFacultySaga);
}