import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookie from '../../../utils/cookie.js';
import { Drawer, Form, Button, Col, Row, Input, Select, message } from 'antd';
import { connect } from 'react-redux';
import Avatar from './uploadImages';
import {
    searchFacultyListAction,
    getFacultyListAction,
    createFacultyAction,
    updateFacultyAction,

    selectTasksAction,

} from '../../../redux/actions';

import { PlusOutlined } from '@ant-design/icons';
import TestTable from './Table';
import './index.css'
function Faculty(props) {
    const {
        isShow,
        updateFaculty,
        pagination,
        getFacultyList,
        createFaculty,


    } = props;
    const cookie = new Cookie();
    const userName = cookie.get("userInfo");
    const personInfo = userName.personId;
    const [form] = Form.useForm();
    const [state, setState] = useState({ visible: false });
    const [keySearch, setKeySearch] = useState('');
    const [facultyEdit, setFacultyEdit] = useState({});
    const [isShowEdit, setIsShowEdit] = useState(false);

    useEffect(() => {
        form.resetFields();
    }, [facultyEdit.key])
        
    const showDrawer = () => {
        setState({
            visible: true,
        });
    };

    const showEdit = (val) => {
        setIsShowEdit(true);
        showDrawer()
        setFacultyEdit(val);
    }

    const onClose = () => {
        setState({
            visible: false,
        });
        setIsShowEdit(false);
        setFacultyEdit({});
        form.resetFields();
    };

    const addFaculty = (values) => {
        if (isShowEdit) {
            const par = {
                pagination,
                companyId : personInfo.companyId,
                _id: facultyEdit._id,
                organInfo : values,
            }
            updateFaculty(par)
        } else {
            const par = {
                FacultyInfo: values,
                companyId : personInfo.companyId
            }
            createFaculty(par);
        }
        onClose();
        success()
    }

    const success = () => {
        if(isShowEdit){
          message.success('Edit Faculty success');
        }else{
          message.success('Create Faculty success');
        }
      };
    

    const searchFacultyList = (val) => {
        setKeySearch(val)
        getFacultyList({current: 1, pageSize: 10, total: 0, keySearch: val, company: personInfo.companyId});
    }

    const renderHeader = () => {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <Button type="primary" onClick={showDrawer}>
                            <PlusOutlined /> Tạo Khoa
                    </Button>
                    <Input
                        style={{ height: 35, width: "20%" }}
                        onChange={(e) => searchFacultyList(e.target.value)}
                    />
                </div>
                <Drawer
                title={isShowEdit ? "Cập nhật Khoa" : "Tạ mới Khoa"}
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
                    initialValues={isShowEdit ? facultyEdit : {}}
                    layout="vertical"
                    hideRequiredMark
                    onFinish={(values) => addFaculty(values)}>
                    <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter your company name' }]}
                        >
                        <Input placeholder="Please enter your company name" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter your address' }]}
                        >
                        <Input placeholder="Please enter your address" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                        >
                        <Input placeholder="Please enter your phone number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="fax"
                        label="Fax"
                        rules={[{ required: true, message: 'Please enter your fax number' }]}
                        >
                        <Input placeholder="Please enter your fax number" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                            required: true,
                            message: 'please enter your Email',
                            },
                        ]}
                        >
                        <Input placeholder="please enter your Email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item
                        name="website"
                        label="Website"
                        rules={[
                            {
                            required: true,
                            message: 'please enter your Website',
                            },
                        ]}
                        >
                        <Input placeholder="please enter your Website" />
                        </Form.Item>
                    </Col>
                    </Row>
                </Form>
                </Drawer>
            </>
        )
    }

    return (
        <div style={{ padding: 10, height: "calc(100vh - 74px)"  }} className={isShow ? 'hidden' : 'show'}>
            <div className='heading' >DANH SÁCH KHOA</div>
            {renderHeader()}
            <TestTable
            getFacultyList={getFacultyList}
            pagination={pagination}
            keySearch={keySearch}
            showEdit={showEdit}
            personInfo={personInfo}

            
            updateFaculty={updateFaculty}
          />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { selectTask } = state.leaderReducer;
    const { pagination } = state.facultyReducer;
    return {
        selectTaskList: selectTask,
        pagination: pagination,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFacultyList: (params) => dispatch(getFacultyListAction(params)),
        createFaculty: (params) => dispatch(createFacultyAction(params)),
        searchFacultyList: (params) => dispatch(searchFacultyListAction(params)),


        selectTasks: (params) => dispatch(selectTasksAction(params)),
        updateFaculty: (params) => dispatch(updateFacultyAction(params)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Faculty);