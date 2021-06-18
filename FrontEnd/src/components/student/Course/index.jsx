import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import { Row, Col, Table, Tooltip, Button, Modal, message, Statistic, Card } from 'antd';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPlayer from 'react-player';
import Cookie from '../../../utils/cookie.js';
import { connect } from 'react-redux';
import './index.css';
import {
    getCourseWithTaskListAction,
    getInternInfoAction,
    getQuestionTestAction,
    updateQuestionTestAction,
    updateInternInfAction,
  } from '../../../redux/actions'
// CoursePage.propTypes = {
    
// };

function CoursePage(props) {
    const { Countdown } = Statistic;
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const personInfo = userName.personId;
    const time = useRef(Date.now() + 10 * 1000);
    const {
        getInternInfo,
        internInfo,
        getCourseWithTaskList,
        courseWithTaskList,
        getQuestionTest,
        questionTest,
        updateQuestionTest,
        updateInternInf,
    } = props;
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [TaskList, setTaskList] = useState([])
    const [visible, setVisible] = useState(false);
    const [firstCourse, setFirstCourse] = useState({})
    const [taskId, setTaskId] = useState('')
    const [question, setQuestion] = useState({})
    const [backQuestion, setBackQuestion] = useState(-1)
    const [nextQuestion, setNextQuestion] = useState(0);
    const [questionId, setQuestionId] = useState(-1)

    const columns = [
        {
          title: 'STT',
          dataIndex: 'sort',
          width: 40,
          ellipsis: {
            showTitle: false,
          },
        },
        {
            title: 'Bài Học',
            // dataIndex: 'taskName',
            width: 100,
            ellipsis: {
              showTitle: false,
            },
            render: (record) =>(
                <Tooltip placement="topLeft" color="blue" title={record.taskName}>
                    <a onClick={()=>onChangeCourse(record)}>{record.taskName}</a>
                </Tooltip>
              ),
          },
    ];

    useEffect(async() => {
        await getInternInfo({internId: personInfo._id})  
    }, [])

    useEffect(async() => {
        await getCourseWithTaskList(internInfo.courseId)
    }, [internInfo.courseId])

    useEffect(async() => {
        if(questionId !== -1){
            setQuestion(questionTest[questionId])
        }else if(questionTest.length !== 0){
            setQuestion(questionTest[0])
            setQuestionId(0)
        }
    }, [questionTest])

    useEffect(async() => {
        await setTaskList(checkResult(courseWithTaskList,internInfo.result))
        if(courseWithTaskList.length !== 0){
            await setFirstCourse(courseWithTaskList[internInfo.result - 1])
            await setTaskId(courseWithTaskList[internInfo.result - 1].key)
        }
    }, [courseWithTaskList,internInfo])

    const onChangeCourse =(val)=>{
        setFirstCourse(val)
    }

    const checkResult = (arr, number)=>{
        let newArr = [];
        arr.map(( itemArr, index)=>{
            itemArr.sort = index + 1
            if(index < number) newArr = [...newArr,itemArr]
        })
        return newArr;
    }
    
    const onShowTest = async () =>{
        await getQuestionTest({taskId: taskId, size: firstCourse.exam})
        time.current = Date.now() + firstCourse.exam * 3 * 60 * 1000 
        setVisible(true)
    }
    
    const onHiddenTest = async () =>{
        setVisible(false)
        setQuestionId(0)
        setBackQuestion(-1);
        setNextQuestion(1);
    }

    const isShowQuestion = (val)=>{
        setQuestionId(val)
        setQuestion(questionTest[val])
        setBackQuestion(val - 1);
        setNextQuestion(val + 1);
    }

    const isBackQuestion = ()=>{
        const val = backQuestion
        if(nextQuestion === questionTest.length){
            setQuestionId(questionTest.length -2)
            setQuestion(questionTest[questionTest.length -2]);
            setNextQuestion(questionTest.length -1);
            setBackQuestion(questionTest.length -3);
        }else{
            setQuestionId(val)
            setQuestion(questionTest[val]);
            setNextQuestion(val);
            setBackQuestion(val -1);
        }
    }

    const isNextQuestion = ()=>{
        const val = nextQuestion
        if(backQuestion === -1){
            setQuestion(questionTest[1]);
            setBackQuestion(0)
            setNextQuestion(2)
            setQuestionId(1)
        }else{
            setQuestionId(val)
            setQuestion(questionTest[val]);
            setBackQuestion(val)
            setNextQuestion(val + 1)
        }
    }

    const onResultQuestion =(values)=>{
        updateQuestionTest({item: {...question,resultTest: values }, index: questionId})
    }

    const isFinishExam = ()=>{
        let count = 0;
        questionTest.map((itemQuestion, index)=>{
            if(itemQuestion.result === itemQuestion.resultTest){
                count++;
            }
        })
        if(((count / questionTest.length ) * 100) >= 70 ){
            updateInternInf({internInf: {...internInfo, result: internInfo.result +1}, internId: internInfo._id})
            success(count)
        }else{
            warning(count)
        }
        onHiddenTest();
    }

    const success = (number) => {
        message.success(`Chúc mừng bạn! Bạn đã trả lời đúng: ${number}`);
      };
    
    const warning = (number) => {
        message.warning(`Bạn trả lời đúng: ${number}. Cần cố gắng thêm nhé`);
    };
    const renderModal = () =>{
        return(
          <Modal
            centered
            visible={visible}
            onCancel={() => onHiddenTest()}
            width={1000}
            footer={false}
          >
            <Row gutter={16} style={{paddingTop: 16, minHeight: 500}}>
                <Col span={17}  className='question'>
                    <Card title={`${questionId + 1}. ${question.content}`}>
                        <div className={ question.resultTest === "A" ? "result-question-item result-item" : "result-item"}
                            onClick={()=>onResultQuestion("A")}
                        >A. {question.answer_A}</div>
                        <div className={ question.resultTest === "B" ? "result-question-item result-item" : "result-item"}
                            onClick={()=>onResultQuestion("B")}
                        >B. {question.answer_B}</div>
                        <div className={ question.resultTest === "C" ? "result-question-item result-item" : "result-item"}
                            onClick={()=>onResultQuestion("C")}
                        >C. {question.answer_C}</div>
                        <div className={ question.resultTest === "D" ? "result-question-item result-item" : "result-item"}
                            onClick={()=>onResultQuestion("D")}
                        >D. {question.answer_D}</div>
                    </Card>
                </Col>
                <Col span={7} className='question' style={{position: 'relative'}} >
                    <Card
                        title={
                            <Row justify="space-between" align="middle">
                                Câu hỏi
                                <Countdown value={time.current} onFinish={isFinishExam} />
                            </Row>
                        }
                    >
                        {/* Nên có 1 trạng thái nữa là đang đứng tại câu nào, và màu của nó giống hover */}
                        <div className="list-question">
                        {questionTest.map((item,index)=>{
                            const number = index + 1
                            return(
                                <div className={ item.resultTest !== "E" ? "resultTest number-question" : "number-question"} onClick={()=>isShowQuestion(index)} >{number}</div>
                            );
                        })}                            
                    </div>
                    </Card>
                    <div className="button-question">
                        <Button disabled={backQuestion === -1 ? true : false}  className='icon-item' onClick={()=>isBackQuestion()} icon={<FaChevronLeft />}> </Button>
                        <Button  type="primary" className='button-item' onClick={()=>isFinishExam()} >Finish </Button>
                        <Button disabled={(nextQuestion === questionTest.length) ? true : false}  className='icon-item' onClick={()=>isNextQuestion()} icon={<FaChevronRight />}> </Button>
                    </div>
                </Col>
            </Row>
          </Modal> 
        );
    }

    return (
        <div style={{width: '100%', margin: 10, minHeight: "calc(100vh - 74px)"}}>
        <Row gutter={[16, 16]}>
            <Col span={16}>
                <Card
                    title={<div className="course-title">{firstCourse.taskName}</div>}
                    bordered={false}
                    size="small"
                    className="course-container"
                >
                    {!!firstCourse.video && (
                        <ReactPlayer 
                            url={firstCourse.video}
                            width="100%"
                            height="500px"
                            controls={true}
                            playing={playing}
                        />
                    )}
                    <div className="course-exam-container">
                        <div>Chú ý hãy học thật kỹ rồi hãy làm bài Kiểm tra :</div>
                        <Button type="primary" onClick={onShowTest} disabled={firstCourse.key === taskId ? false : true}>Exam</Button>
                    </div>
                    <div
                        className="course-content"
                        dangerouslySetInnerHTML={{
                            __html: firstCourse.note
                        }}>
                    </div>
                </Card>
            </Col>
            <Col span={8} >
                <Card
                    title={<div className="course-list-title">DANH SÁCH BÀI HỌC</div>}
                    bordered={false}
                    size="small"
                >
                    <Table
                        size="small"
                        loading={loading}
                        columns={columns} 
                        dataSource={TaskList}
                        pagination={false}  
                    />            
                </Card>
            </Col>
        </Row>
        {renderModal()}
        </div>
    );
}
const mapStateToProps = (state) => {
    const {courseWithTaskList} = state.leaderReducer;
    const { internInfo, questionTest} = state.internReducer;
    return {
      courseWithTaskList: courseWithTaskList,
      internInfo: internInfo,
      questionTest: questionTest,
    }
};
  
const mapDispatchToProps = (dispatch) => {
return {
    getCourseWithTaskList: (params) => dispatch(getCourseWithTaskListAction(params)),
    getInternInfo: (params) => dispatch(getInternInfoAction(params)),
    getQuestionTest: (params) => dispatch(getQuestionTestAction(params)),
    updateQuestionTest: (params) => dispatch(updateQuestionTestAction(params)),
    updateInternInf: (params) => dispatch(updateInternInfAction(params)),
};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);

