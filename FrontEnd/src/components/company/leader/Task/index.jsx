import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Form, Button, Col, Row, Input, InputNumber,
  message, } from 'antd';
import { connect } from 'react-redux';
import Cookie from '../../../../utils/cookie.js';
import {
    setPageTableAction, 
    createTaskAction,
    updateTaskAction,
    searchTaskAction,
} from '../../../../redux/actions';

import { PlusOutlined } from '@ant-design/icons';
import TestTable from './Table';
import './index.css'
function Task(props) {
    const {
    createTask,
    searchTaskList,
    isShow,
    updateTask,
    pagination,
    setPage,
      } = props;
      const [form] = Form.useForm();
      const cookie = new Cookie();
      const userName = cookie.get("userInfo");
      const personInfo = userName.personId;
      const [state, setState] = useState({ visible: false });
      const [editTask, setEditTask] = useState({});
      const [keySearch, setKeySearch] = useState('');
      const [isShowEdit, setIsShowEdit] = useState(false);
      const [manage, setManage] = useState(false)

      useEffect(() => {
        form.resetFields();
      }, [editTask._id])
      
      useEffect( () => {
        return  () => {
          setPage({current: 1, pageSize: 10, total: 0})
        }
      }, [])

      const showDrawer = () => {
        setState({
          visible: true,
        });
      };
    
      const showEdit = (val) => {
        setIsShowEdit(true);
        showDrawer()
        setEditTask(val);
      }
    
      const onClose = () => {
        setState({
          visible: false,
        });
        setIsShowEdit(false);
        setEditTask({});
        form.resetFields();
      };
    
      const addTodo = (values) => {
        const par = {
          pagination,
          taskInfo: values,
          person: personInfo._id,
        }
        if(isShowEdit){
          par._id =  editTask._id
          updateTask(par)
        }else{
          createTask(par);
        }
        success()
        onClose();
      }
    
      const success = () => {
        if(isShowEdit){
          message.success('Edit Task success');
        }else{
          message.success('Create Task success');
        }
      };

      const searchOrganizationList = async (val) =>{
        setKeySearch(val)
        if(personInfo.roleId === "6045cf1c83a38015cc63ccc3"){
          await searchTaskList({current: 1, pageSize: 10, total: 0, keySearch: val, person: personInfo._id });
        }else{
          await searchTaskList({current: 1, pageSize: 10, total: 0, keySearch: val, company: personInfo.companyId })
        } 
      }
    
      const renderHeader = () => {
        return (
          <>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Button type="primary" onClick={showDrawer}  disabled={manage? true : false}>
                <PlusOutlined /> New Task
                </Button>
              <Input
                style={{ height: 35, width: "20%" }}
                onChange={(e) => searchOrganizationList(e.target.value)}
              />
            </div>
            <Drawer
              title={isShowEdit ? "Edit Task" : "Create a new Task"}
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
                initialValues={isShowEdit ? editTask : {}}
                layout="vertical"
                hideRequiredMark
                onFinish={(values) => addTodo(values)}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="taskName"
                      label="Task Name"
                      rules={[{ required: true, message: 'Please enter task name' }]}
                    >
                      <Input placeholder="Please enter task name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="video"
                      label="Video"
                      rules={[{ required: true, message: 'Please enter video' }]}
                    >
                      <Input placeholder="Please enter Video" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="note"
                      label="Note"
                      rules={[{ required: true, message: 'Please enter Note' }]}
                    >
                      <Input.TextArea  placeholder="Please enter Note" />
                    </Form.Item>
                  </Col>
                </Row>
                {isShowEdit ?
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="exam"
                      label="Exam"
                      rules={[{ required: true, message: 'Please enter number Exam' }]}
                    >
                      <InputNumber min={1} max={editTask.count}  placeholder="Please enter number Exam" />
                    </Form.Item>
                  </Col>
                </Row>
                :<></>
                }
              </Form>
            </Drawer>
          </>
        )
      }
    
      return (
        <div style={{ padding: 10,  height: "calc(100vh - 74px)" }} className={isShow ? 'hidden' : 'show'}>
          <div className='heading' >DANH SÁCH BÀI HỌC</div>
          {renderHeader()}
          <TestTable
            showEdit={showEdit}
            updateTask={updateTask}
            pagination={pagination}
            keySearch={keySearch}
            setPage={setPage}
            manage={manage}
            personInfo={personInfo}
            setManage={setManage}
          />
        </div>
      );
    }
  
    const mapStateToProps = (state) => {
      const { pagination} = state.leaderReducer ;
      return {
        pagination: pagination,
      }
    };
    
    const mapDispatchToProps = (dispatch) => {
      return {
        setPage: (params) => dispatch(setPageTableAction(params)),
        createTask: (params) => dispatch(createTaskAction(params)),
        updateTask: (params) => dispatch(updateTaskAction(params)),
        searchTaskList: (params) => dispatch(searchTaskAction(params)),
      };
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Task);