import { put, takeEvery} from 'redux-saga/effects';
import Cookie from '../../utils/cookie.js'
import axios from 'axios';

import {
    GET_INTERN_INFO,
    GET_INTERN_INFO_SUCCESS,
    GET_INTERN_INFO_FAIL,
    GET_QUESTION_TEST,
    GET_QUESTION_TEST_SUCCESS,
    GET_QUESTION_TEST_FAIL,
    UPDATE_INTERN_INFO,
    UPDATE_INTERN_INFO_FAIL,
  } from '../constants'

  function* getInternSaga(action){
    const apiUrl = 'http://localhost:5000/post/findIntern';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const {internId} = action.payload;
    const config = {
        headers:{
            Authorization: token,       
        },
    };
    try {
        const res = yield axios.get(`${apiUrl}/${internId}`,config);
        yield put({
            type: GET_INTERN_INFO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: GET_INTERN_INFO_FAIL,
            payload: error,
        });
    }
}

function customizedQuestionTest(arr){
    let newList = [];
    arr.map((item)=>{
        const object = {
            key: item._id, 
            _id: item._id, 
            content: item.content , 
            answer_A: item.answer_A,
            answer_B: item.answer_B,
            answer_C: item.answer_C,
            answer_D: item.answer_D,
            result: item.result,
            resultTest: "E",

        };
        newList= [...newList, object];
    })
    return newList;
}

function* getQuestionTestSaga(action){
    const cookie = new Cookie();
    // const userName = cookie.get("userInfo");
    const token = cookie.get('token');
    // const person = userName.personId._id;
    const { taskId, size } = action.payload;
    const apiUrl = 'http://localhost:5000/post/findRadomQuestionList';
    const config = {
        headers:{
            authorization: token,
        },
        params: {
            ...taskId && {taskId},
            ...size && {size},
        },
            
    }
    try {
        const res = yield axios.get(apiUrl,config);
        const newList = customizedQuestionTest(res.data) 
        yield put({
            type: GET_QUESTION_TEST_SUCCESS,
            payload: newList,
        })
    } catch (error) {
        yield put({
            type: GET_QUESTION_TEST_FAIL,
            payload: error,
        });
    }
}

function* updateInternInfSaga(action){
    const {internInf, internId} = action.payload
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
        const res = yield axios.put(apiUrl,params,config);
        yield put({
            type: GET_INTERN_INFO_SUCCESS,
            payload: res.data.newIntern
        })
    } catch (error) {
        yield put({
            type: UPDATE_INTERN_INFO_FAIL,
            payload: error,
        });
    }
}

  export default function* internsInfSaga() {
      yield takeEvery(GET_INTERN_INFO, getInternSaga);
      yield takeEvery(GET_QUESTION_TEST, getQuestionTestSaga);
      yield takeEvery(UPDATE_INTERN_INFO, updateInternInfSaga);

    // yield debounce(300,SEARCH_COURSE_LIST, New);
     
}