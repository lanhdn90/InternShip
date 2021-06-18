import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from './uploadImages';
import { Drawer, Form, Button, Col, Row, Input, message } from 'antd';
import { connect } from 'react-redux';
import { 
  createCompanyAction,
  getCompanyListAction,
  setLogoCompanyAction,
  updateCompanyAction,
  searchCompanyListAction,
  extendCompanyAction,
} from '../../../redux/actions';

import { PlusOutlined } from '@ant-design/icons';
import TestTable from './Table';
import './index.css'
Company.propTypes = {

};

function Company(props) {
  const {
    setLogoCompany,
    createCompany,
    getCompanyList,
    searchOrganList,
    isShow,
    isLogo,
    updateCompany,
    companyInfo,
    companyList,
    pagination,
    extendCompany
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState({ visible: false });
  const [editOrgan, setEditOrgan] = useState({});
  const [keySearch, setKeySearch] = useState('');
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    form.resetFields();
  }, [editOrgan.key])

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const showEdit = (val) => {
    setIsShowEdit(true);
    showDrawer()
    setEditOrgan(val);
    setLogoCompany('');
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
        _id: editOrgan.key,
        organInfo: values,
      }
      updateCompany(par)
    
    }else{
      createCompany(values);
    }
    onClose();
    success()
  }

  const success = () => {
    if(isShowEdit){
      message.success('Edit Company success');
    }else{
      message.success('Create Company success');
    }
  };


  const searchOrganizationList = (val) =>{
    setKeySearch(val)
    searchOrganList({current: 1, pageSize: 10, total: 0, keySearch: val})
  }

  const renderHeader = () => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <Button type="primary" onClick={showDrawer}>
            <PlusOutlined /> New Company
            </Button>
          <Input
            style={{ height: 35, width: "20%" }}
            onChange={(e) => searchOrganizationList(e.target.value)}
          />
        </div>


        <Drawer
          title={isShowEdit ? "Edit Company" : "Create a new Company"}
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
            initialValues={isShowEdit ? editOrgan : {}}
            layout="vertical"
            hideRequiredMark
            onFinish={(values) => addTodo(values)}>
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
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="logo"
                  label="Logo"
                >
                  <Avatar 
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    setLogoCompany={setLogoCompany}
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
      <div className='heading' >DANH SÁCH CÔNG TY</div>
      {renderHeader()}
      <TestTable
        showEdit={showEdit}
        updateCompany={updateCompany}
        extendCompany={extendCompany}
        pagination={pagination}
        keySearch={keySearch}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {companyList,pagination, companyInfo } = state.companyReducer;
  return {
    isLogo: companyInfo.logo,
    companyInfo: companyInfo,
    companyList: companyList,
    pagination: pagination,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCompany: (params) => dispatch(createCompanyAction(params)),
    getCompanyList: (params) => dispatch(getCompanyListAction(params)),
    updateCompany: (params) => dispatch(updateCompanyAction(params)),
    setLogoCompany: (params) => dispatch(setLogoCompanyAction(params)),
    extendCompany: (params) => dispatch(extendCompanyAction(params)),
    searchOrganList: (params) => dispatch(searchCompanyListAction(params)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Company);
