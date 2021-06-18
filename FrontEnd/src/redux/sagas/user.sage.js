import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import Cookie from '../../utils/cookie.js'
import moment from 'moment';
import {  message  } from 'antd';
import {
    CHECK_USER,
    CHECK_USER_SUCCESS,
    CHECK_USER_FAIL,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    SET_IMAGE_SUCCESS,
    SET_IMAGE_FAIL,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    GET_PERSON_INFO,
    GET_PERSON_INFO_SUCCESS,
    CHANGE_USER,
    SET_USER,
    SET_USER_FAIL,
  } from '../constants'
import history from '../../utils/history'
import {ROUTERS} from '../../constants/router'

function* checkUserSaga(action){
    const apiUrl = 'http://localhost:5000/post/loginUserName';
    try {
        const res = yield axios.post(apiUrl,action.payload);
        const username = res.data;
        const image = username.user.personId.image;
        username.user.personId.birthday = moment(res.data.user.personId.birthday)
        username.user.personId.image = "";
        yield put({
            type: CHECK_USER_SUCCESS,
            payload: username,
        })
        yield put({
            type: SET_IMAGE_SUCCESS,
            payload: image,
        })
        const role = username.user.personId.roleId
        switch(role){
            case "6045cf1c83a38015cc63ccc1":{
                yield history.push(ROUTERS.INFORMATION_ADMIN);
                break;
            }
            case "6045cf1c83a38015cc63ccc2":{   
                yield history.push(ROUTERS.INFORMATION_MANAGER);
                break;
            }
            case "6045cf1c83a38015cc63ccc3":{
                yield history.push(ROUTERS.INFORMATION_LEADER);   
                break;
            }
            case "6045cf1c83a38015cc63ccc4":{
                yield history.push(ROUTERS.INFORMATION_PERSON_SCHOOL);   
                break;
            }
            case "6045cf1c83a38015cc63ccc5":{
                yield history.push(ROUTERS.INFORMATION_PERSON_FACULTY);   
                break;
            }
            case "6045cf1c83a38015cc63ccc6":{
                yield history.push(ROUTERS.INTERNS_INFORMATION);   
                break;
            }
        }      
    } catch (error) {
        yield put({
            type: CHECK_USER_FAIL,
            payload: error,
        });
    }
}

function* updateUserNameSaga(action){
    const {personInf } = action.payload
    console.log("🚀 ~ file: user.sage.js ~ line 89 ~ function*updateUserNameSaga ~ action.payload", action.payload)
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
        const res = yield axios.put(apiUrl,params,config);
        const username = res.data.newPerson;
        username.birthday = moment(res.data.newPerson.birthday)
        const image = username.image;
        username.image = "";
        yield put({
            type: UPDATE_USER_SUCCESS,
            payload: username,
        })
        yield put({
            type: SET_IMAGE_SUCCESS,
            payload: image,
        })
        
    } catch (error) {
        yield put({
            type: UPDATE_USER_FAIL,
            payload: error,
        });
    }
}

function* changeUserNameSaga(action){
    const {userId, password, newPassword   } = action.payload
    console.log("🚀 ~ file: user.sage.js ~ line 126 ~ function*changeUserNameSaga ~ action.payload", action.payload)
    const apiUrl = 'http://localhost:5000/post/updateUserName';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            Authorization: token,   
        },
    }
    const params= {
        ...userId && {userId},
        ...password && {password},
        ...newPassword && {newPassword},
    }
    
    try {
        // const res = yield axios.put(apiUrl,params,config);
        yield axios.put(apiUrl,params,config); 
        success()
    } catch (error) {
        error()
    }
}
// function* logoutUserSaga(action) {
//     const apiUrl = 'http://localhost:3001';
//     try {
//       const { } = action.payload;
//       const response = yield axios.get(`${apiUrl}/usertListData?userName=$&role=user`, action.payload);
//       const data = response.data;
  
//       if (data[0].id) {
  
//         yield put({
//           type: LOGOUT_USER_SUCCESS,
//           payload: data[0],
//         });
//         yield localStorage.removeItem("myValueInLocalStorage");
//         yield history.push(ROUTERS.LOGIN)
//       }
//     } catch (error) {
//       yield put({
//         type: CHECK_USER_FAIL,
//         payload: error,
//       });
//     }
//   }

function* getPersonInfoSaga(action){
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const token = cookie.get('token');
    const person = userName._id;
    const apiUrl = 'http://localhost:5000/post/findPersonalInfo';
    const config = {
        headers:{
            authorization: token,
        },           
    }
    try {
        const res = yield axios.post(`${apiUrl}/${person}`,config);
        const username = res.data;
        const image = username.personId.image;
        username.personId.birthday = moment(res.data.personId.birthday)
        username.personId.image = "";
        yield put({
            type: GET_PERSON_INFO_SUCCESS,
            payload: username,
        })
        yield put({
            type: SET_IMAGE_SUCCESS,
            payload: image,
        })
    } catch (error) {
        yield put({
            type: SET_IMAGE_FAIL,
            payload: SET_USER_FAIL,
        });
    }
}

function* createUserNameSaga(action){
    const {username, password, personId   } = action.payload
    const apiUrl = 'http://localhost:5000/post/register/';
    const cookie = new Cookie();
    const token = cookie.get('token');
    const config = {
        headers:{
            authorization: token,   
        },
    }
    const params= {
        ...username && {username},
        ...password && {password},
        ...personId && {personId},
    }
    
    try {
        // const res = yield axios.post(apiUrl,params,config);
        yield axios.post(apiUrl,params,config);
        yield history.push(ROUTERS.LOGIN);
    } catch (error) {
        yield put({
            type: SET_IMAGE_FAIL,
            payload: error,
        });
    }
}

const success = () => {
    message.success(`Thay đổi mật khẩu thành công`);
  };

// const error  = () => {
//     message.warning(`Thay đổi mật khẩu thất bại`);
// };

export default function* personalInfSaga() {
    yield takeEvery(CHECK_USER, checkUserSaga);
    yield takeEvery(UPDATE_USER, updateUserNameSaga);
    yield takeEvery(GET_PERSON_INFO, getPersonInfoSaga);
    yield takeEvery(CHANGE_USER, changeUserNameSaga);
    yield takeEvery(SET_USER, createUserNameSaga);
    
}