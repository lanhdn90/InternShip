import {
    GET_USER_SUCCESS,
    CREATE_USER_SUCCESS,
    CHECK_USER_SUCCESS,
    SET_IMAGE_SUCCESS,
    UPDATE_USER_SUCCESS,
    GET_PERSON_INFO_SUCCESS,
  } from '../constants';
  import Cookie from '../../utils/cookie.js';
  const initialState = {
    userListData: [],
    userInfo: {
      personId:{},
    },
    image: '',
    // status: false,
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case CHECK_USER_SUCCESS: { //action gửi cái max qua để check
        const cooke = new Cookie();
        const userName = action.payload.user;
        cooke.set('token',action.payload.token,'/');
        cooke.set('userInfo',userName,'/');
        return {
          ...state,
          userInfo: userName,
        };
      }
  
      case GET_PERSON_INFO_SUCCESS: { //action gửi cái max qua để check
        const userName = action.payload;
        return {
          ...state,
          userInfo: userName,
        };
      }

      case GET_USER_SUCCESS: { //action gửi cái max qua để check
        return state;
      }
  
      case CREATE_USER_SUCCESS: { //action gửi cái max qua để check
        return {
          ...state,
          userListData: [
            ...action.payload, //là cái data
            action.payload
          ],
        };
      }

      case UPDATE_USER_SUCCESS: { //action gửi cái max qua để check
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            personId : {...action.payload},
          }
        };  
      }
  
      case SET_IMAGE_SUCCESS: { //action gửi cái max qua để check
        return {
          ...state,
          image: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  }
  
  export default userReducer;
  