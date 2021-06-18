import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookie from '../../../../utils/cookie.js';
import { Drawer, Form, Button, Col, Row, Input, Select, message  } from 'antd';
import { connect } from 'react-redux';
import Avatar from './uploadImages';
import {
    selectTasksAction,
    setQuestionAction,
    updateQuestionAction,
    searchQuestionAction,
    getQuestionListAction,


} from '../../../../redux/actions';

import { PlusOutlined } from '@ant-design/icons';
import TestTable from './Table';
import './index.css'
function Question(props) {
    const {
        createQuestion,
        isShow,
        updateQuestion,
        pagination,
        selectTasks,
        selectTaskList,
        getQuestionList,

    } = props;
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const personInfo = userName.personId;
    const [form] = Form.useForm();
    const [state, setState] = useState({ visible: false });
    const [editQuestion, setEditQuestion] = useState({});
    const [keySearch, setKeySearch] = useState('');
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [taskId, setTaskId] = useState('');
    const [selectTaskId, setSelectTaskId] = useState("")
    const [manage, setManage] = useState(false)
    const { Option } = Select;

    useEffect(() => {
        if(personInfo.roleId !== "6045cf1c83a38015cc63ccc3"){
            setManage(true) 
            selectTasks({company: personInfo.companyId ,keySearch});
        }else{
            selectTasks({person: personInfo._id ,keySearch});
        }
    }, []);

    useEffect(() => {
        form.resetFields();
    }, [editQuestion._id])

    const onTaskId = value => {
        setTaskId(value);
    };
        
    const onSelectChange = value => {
        setSelectTaskId(value);
        getQuestionList({current: 1, pageSize: 10, total: 0, keySearch, selectTaskId: value});

        console.log("🚀 ~ file: index.jsx ~ line 35 ~ Question ~ value", value)
        };


    const showDrawer = () => {
        setState({
            visible: true,
        });
    };

    const showEdit = (val) => {
        setIsShowEdit(true);
        showDrawer()
        setEditQuestion(val);
    }

    const onClose = () => {
        setState({
            visible: false,
        });
        setIsShowEdit(false);
        setEditQuestion({});
        form.resetFields();
    };

    const addQuestion = (values) => {
        if(imageUrl !== ""){
            values.image = imageUrl;
        }
        if(taskId !== ''){
            values.taskId = taskId;
        }
        if (isShowEdit) {
            const par = {
                pagination,
                _id: editQuestion._id,
                questionInfo: values,
            }
            updateQuestion(par)
        } else {
            createQuestion(values);
        }
        onClose();
        success();
    }

    const success = () => {
        if(isShowEdit){
          message.success('Edit Question success');
        }else{
          message.success('Create Question success');
        }
      };

    const searchQuestionList = (val) => {
        setKeySearch(val)
        if(manage){
            getQuestionList({current: 1, pageSize: 10, total: 0, selectTaskId, keySearch: val, company: personInfo.companyId});
          }else{
            getQuestionList({current: 1, pageSize: 10, total: 0, selectTaskId, keySearch: val, person: personInfo._id });
          }
    }

    const renderHeader = () => {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
                    <div>
                        <Button type="primary" onClick={showDrawer}>
                            <PlusOutlined /> New Question
                        </Button>
                        <Select 
                            defaultValue={isShowEdit ? selectTaskList[0].taskName : "--- Task Option ---"}
                            style={{width: 220, marginLeft: 10, textAlign: 'center'}}
                            onChange={onSelectChange}>
                            {selectTaskList.map((item) => (
                            <Option key={item._id}>{item.taskName}</Option>
                            ))}
                        </Select>
                    </div>
                    <Input
                        style={{ height: 35, width: "20%" }}
                        onChange={(e) => searchQuestionList(e.target.value)}
                    />
                </div>
                <Drawer
                    title={isShowEdit ? "Edit Question" : "Create a new Question"}
                    width={720}
                    onClose={onClose}
                    visible={state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={onClose} style={{ marginRight: 8 }}>
                                Cancel
                  </Button>
                            <Button onClick={() => form.submit()} type="primary">
                                Submit
                  </Button>
                        </div>
                    }
                >
                    <Form
                        form={form}
                        initialValues={isShowEdit ? editQuestion : {}}
                        layout="vertical"
                        hideRequiredMark
                        onFinish={(values) => addQuestion(values)}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name='taskName'
                                    label="Task Name"
                                >
                                    <Select
                                        defaultValue={isShowEdit ? editQuestion.taskId.taskName : "--- Task Option ---"}
                                        style={{width: 220, marginLeft: 10, textAlign: 'center'}}
                                        onChange={onTaskId}>
                                        {selectTaskList.map((itemTask) => (
                                        <Option key={itemTask._id} value={itemTask._id}>{itemTask.taskName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="content"
                                    label="Content"
                                    rules={[{ required: true, message: 'Please enter Content' }]}
                                >
                                    <Input.TextArea placeholder="Please enter Content" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="answer_A"
                                    label="Answer A"
                                    rules={[{ required: true, message: 'Please enter Answer A' }]}
                                >
                                    <Input placeholder="Please enter Answer A" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="answer_B"
                                    label="Answer B"
                                    rules={[{ required: true, message: 'Please enter Answer B' }]}
                                >
                                    <Input placeholder="Please enter Answer B" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="answer_C"
                                    label="Answer C"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter Answer C',
                                        },
                                    ]}
                                >
                                    <Input placeholder="please enter Answer C" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    name="answer_D"
                                    label="Answer D"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter Answer D',
                                        },
                                    ]}
                                >
                                    <Input placeholder="please enter Answer D" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="result"
                                    label="Result"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter result',
                                        },
                                    ]}
                                >
                                    <Input placeholder="please enter result" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="image"
                                    label="Image"
                                >
                                    <Avatar
                                        imageUrl={imageUrl}
                                        setImageUrl={setImageUrl}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        )
    }

    return (
        <div style={{ padding: 10 }} className={isShow ? 'hidden' : 'show'}>
            <div className='heading' >DANH SÁCH CÂU HỎI</div>
            {renderHeader()}
            <TestTable
            showEdit={showEdit}
            updateQuestion={updateQuestion}
            pagination={pagination}
            keySearch={keySearch}
            selectTaskId={selectTaskId}
            personInfo={personInfo}
            manage={manage}
            getQuestionList={getQuestionList}
          />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { selectTask } = state.leaderReducer;
    const { pagination } = state.leaderReducer;
    return {
        selectTaskList: selectTask,
        pagination: pagination,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectTasks: (params) => dispatch(selectTasksAction(params)),
        createQuestion: (params) => dispatch(setQuestionAction(params)),
        updateQuestion: (params) => dispatch(updateQuestionAction(params)),
        searchQuestionList: (params) => dispatch(searchQuestionAction(params)),
        getQuestionList: (params) => dispatch(getQuestionListAction(params)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);