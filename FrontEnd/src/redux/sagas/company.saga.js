import {debounce, put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';
import {
    GET_COMPANY_LIST_SUCCESS,
    GET_COMPANY_LIST_FAIL,
    GET_COMPANY_LIST,
    SET_COMPANY,
    SET_COMPANY_FAIL,
    ACTIVE_COMPANY,
    EXTEND_COMPANY,
    UPDATE_COMPANY,
    DELETE_COMPANY,
    SEARCH_COMPANY_LIST,
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

function* getCompanyListSaga(action){
    const { keySearch, current, pageSize} = action.payload;
    const apiUrl = 'http://localhost:5000/post/listCompany';
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
        const list = yield createCompanyList(res.data.list);
        const newDatabase = {
            newList: list,
            count: res.data.count,
            pagination: {current, pageSize},
        }
        yield put({
            type: GET_COMPANY_LIST_SUCCESS,
            payload: newDatabase,
        })
    } catch (error) {
        yield put({
            type: GET_COMPANY_LIST_FAIL,
            payload: error,
        });
    }
}

function* createCompanySaga(action){
    const apiUrl = 'http://localhost:5000/post/createCompany';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    try {
        // const res = yield axios.post(apiUrl,action.payload,config);
        yield axios.post(apiUrl,action.payload,config);
        yield put({
            type: GET_COMPANY_LIST,
            payload: {current: 1, pageSize: 10, total: 0},
        })
    } catch (error) {
        yield put({
            type: SET_COMPANY_FAIL,
            payload: error,
        });
    }
}

function* activeCompanySaga(action){
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
            type: GET_COMPANY_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_COMPANY_FAIL,
            payload: error,
        });
    }
}

function* extendCompanySaga(action){
    const {expiryDate, _id } = action.payload
    const pagination = action.payload.pagination
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
            type: GET_COMPANY_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_COMPANY_FAIL,
            payload: error,
        });
    }
}

function* updateCompanySaga(action){
    const {expiryDate,organInfo, _id } = action.payload
    const pagination = action.payload.pagination
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
            type: GET_COMPANY_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_COMPANY_FAIL,
            payload: error,
        });
    }
}

function* deleteCompanySaga(action){
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
        yield put({
            type: GET_COMPANY_LIST,
            payload: pagination,
        });
    } catch (error) {
        yield put({
            type: SET_COMPANY_FAIL,
            payload: error,
        });
    }
}

export default function* organInfSaga() {
    yield takeEvery(GET_COMPANY_LIST, getCompanyListSaga);
    yield debounce(300,SEARCH_COMPANY_LIST, getCompanyListSaga);
    yield takeEvery(SET_COMPANY, createCompanySaga);
    yield takeEvery(ACTIVE_COMPANY, activeCompanySaga);
    yield takeEvery(EXTEND_COMPANY, extendCompanySaga);
    yield takeEvery(UPDATE_COMPANY, updateCompanySaga);
    yield takeEvery(DELETE_COMPANY, deleteCompanySaga);
}