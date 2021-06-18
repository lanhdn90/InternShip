import {
    GET_INTERN_INFO_SUCCESS,
    GET_QUESTION_TEST_SUCCESS,
    UPDATE_QUESTION_TEST,
} from '../constants';

const initialState ={
    internInfo: {},
    questionTest: []
}

function internReducer (state = initialState, action){
    switch(action.type){
        case GET_INTERN_INFO_SUCCESS:{
            return{
                ...state,
                internInfo: action.payload
            };
        }
        case GET_QUESTION_TEST_SUCCESS:{
            return{
                ...state,
                questionTest: [...action.payload]
            };
        }
        case UPDATE_QUESTION_TEST:{
            const list = [...state.questionTest]
            const {item, index} = action.payload
            list.splice(index,1,item)
            return{
                ...state,
                questionTest: [...list]
            };
        }
        default: {
            return state;
        }
    }
}

export default internReducer;