import React, { useState, useEffect } from 'react';

import Avatar from './uploadImages';
import { Drawer, Form, Button, Col, Row, Input, message } from 'antd';
import { connect } from 'react-redux';
import { 
  createSchoolAction,
  getSchoolListAction,
  setLogoSchoolAction,
  updateSchoolAction,
  searchSchoolListAction,
} from '../../../redux/actions';

import { PlusOutlined } from '@ant-design/icons';
import TestTable from './Table';
import './index.css'


function School(props) {
  const {
    setLogoSchool,
    createSchool,
    getSchoolList,
    searchSchoolList,
    isShow,
    isLogo,
    updateSchool,
    SchoolInfo,
    pagination,
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState({ visible: false });
  const [editSchool, setEditOrgan] = useState({});
  const [keySearch, setKeySearch] = useState('');
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    form.resetFields();
  }, [editSchool.key])

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const showEdit = (val) => {
  console.log("🚀 ~ file: index.jsx ~ line 41 ~ showEdit ~ val", val)
    setIsShowEdit(true);
    showDrawer()
    setEditOrgan(val);
    setLogoSchool('');
    setImageUrl(val.logo);
  }

  const onClose = () => {
    setState({
      visible: false,
    });
    setIsShowEdit(false);
    setEditOrgan({});
    setImageUrl('');
    form.resetFields();
  };

  const addTodo = (values) => {
    if(isLogo){
      values.logo = isLogo;
    }
    if(isShowEdit){
      const par = {
        pagination,
        _id: editSchool.key,
        organInfo: values,
      }
      updateSchool(par)
      console.log("🚀 ~ file: index.jsx ~ line 50 ~ addTodo ~ dang o edit",par)
    
    }else{
      createSchool(values);
      console.log("🚀 ~ file: index.jsx ~ line 50 ~ addTodo ~ dang o new", )
    }
    onClose();
    success()
  }

  const success = () => {
    if(isShowEdit){
      message.success('Edit School success');
    }else{
      message.success('Create School success');
    }
  };

  const searchOrganizationList = (val) =>{
    setKeySearch(val)
    searchSchoolList( {current: 1, pageSize: 10, total: 0, keySearch: val})
  }

  const renderHeader = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Button type="primary" onClick={showDrawer}>
            <PlusOutlined /> New School
            </Button>
          <Input
            style={{ height: 35, width: "20%" }}
            onChange={(e) => searchOrganizationList(e.target.value)}
          />
        </div>
        <Drawer
          title={isShowEdit ? "Edit School" : "Create a new School"}
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
            initialValues={isShowEdit ? editSchool : {}}
            layout="vertical"
            hideRequiredMark
            onFinish={(values) => addTodo(values)}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your school name' }]}
                >
                  <Input placeholder="Please enter your school name" />
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
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="logo"
                  label="Logo"
                >
                  <Avatar 
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    setLogoSchool={setLogoSchool}
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
    <div style={{ padding: 10, height: "calc(100vh - 74px)" }} className={isShow ? 'hidden' : 'show'}>
      <div className='heading' >DANH SÁCH NHÀ TRƯỜNG</div>
      {renderHeader()}
      <TestTable
        showEdit={showEdit}
        updateSchool={updateSchool}
        pagination={pagination}
        keySearch={keySearch}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { pagination, SchoolInfo } = state.schoolReducer;
  return {
    isLogo: SchoolInfo.logo,
    SchoolInfo: SchoolInfo,
    pagination: pagination,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSchool: (params) => dispatch(createSchoolAction(params)),
    setLogoSchool: (params) => dispatch(setLogoSchoolAction(params)),
    getSchoolList: (params) => dispatch(getSchoolListAction(params)),
    updateSchool: (params) => dispatch(updateSchoolAction(params)),
    searchSchoolList: (params) => dispatch(searchSchoolListAction(params)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(School);
