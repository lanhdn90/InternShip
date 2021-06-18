import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Select, Form, Input, DatePicker, Button, message } from 'antd';
import { FaBirthdayCake, FaVoicemail, FaPhoneAlt} from "react-icons/fa";
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment'
import './index.css'
import Avatar from './uploadImages';
import {
  getPersonInfoAction,
  setImagePersonAction,
  updateUserNameAction,
  changeUserNameAction,
} from '../../../redux/actions';
function PersonInf(props) {
    const {
      userInfo,
      image, 
      setImagePerson,
      updateUserName,
      getPersonInfo,
      changeUserName,
    }= props;
    const { TabPane } = Tabs;
    const { Option } = Select;
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [person, setPerson] = useState(userInfo.personId)
    useEffect(async () => {
      if( Object.values(userInfo.personId).length === 0){
        await getPersonInfo()
      }
      
    }, [])

    const renderInf = () =>{
        return(
            <>
                <Tabs  type="card">
                    <TabPane tab="Thông tin cá nhân" key="1">
                        {renderPersonInf()}
                    </TabPane>
                    <TabPane tab="Tài khoản" key="2">
                    {renderUserInf()}
                    </TabPane>
                </Tabs>
            </>
        );
    }

    const onCheck = async () => {
      try {
        const values = await form.validateFields();
        values._id = userInfo.personId._id
        if(imageUrl !== ""){
          values.image = imageUrl
        }else{
          values.image = image
        }
        success()
        updateUserName({personInf: values})
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }
    };

    const success = () => {
      message.success('Update Personal information success');
    };


    const renderPersonInf = (val)=>{
        return(
            <Form
            form={form}
            initialValues={userInfo.personId}
            layout="vertical"
            hideRequiredMark
            >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="fullName"
                  label="Họ và tên : "
                  rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                  <Input placeholder="Please enter your full name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Ngày Sinh :"
                >
                  <DatePicker/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="gender"
                    label="Giới Tính :"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                  >
                    <Select
                        defaultValue={userInfo.personId.gender}
                        style={{width: 220, textAlign: 'center'}}
                        >
                            <Option key='Male' value='Male'>Male</Option>
                            <Option key='Female' value='Female'>Female</Option>
                            <Option key='Gay' value='Gay'>Gay</Option>
                    </Select>
                  </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Địa chỉ : "
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
                  rules={[{ required: true, message: 'Please enter your phone number' , whitespace: true}]}
                >
                  <Input placeholder="Please enter your phone number" />
                </Form.Item>
              </Col>
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
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="image"
                  label="Ảnh đại diện"
                >
                  <Avatar 
                    imageUrl={image}
                    setImageUrl={setImageUrl}
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Form.Item >
                    <Button type="primary" onClick={onCheck}>
                      Save
                    </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        );
    }

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };

    const changePassword =  (val)=>{
      const par = {
        userId : userInfo._id,
        password: val.password,
        newPassword: val.newPassword
      }
      changeUserName(par)
    }

    const renderUserInf = ()=>{
      return(
        <Form
        {...formItemLayout}
        onFinish={changePassword}
        name="register"
        scrollToFirstError
        >
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input new password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={18}>
          <Form.Item
            name="confirm"
            label="Confirm New Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
    }

    return (
        <div className='content-person'>
            <div className='avatar-content' >
                <img src={image} alt="Photo" className="avatar-item" />
                <h5 className="name-info">{userInfo.personId.fullName}</h5>
                <div className="personal-info">
                    <div className="item-info" style={{marginBottom: 10}}>
                        <i>{<FaBirthdayCake />}</i>
                        <Moment  style={{paddingLeft: 20, paddingTop: 3, fontSize: 15}}  date={moment(userInfo.personId.birthday)}  format="DD/MM/YYYY"/>
                    </div>
                    <div className="item-info">
                        <i>{<FaVoicemail />}</i>
                        <p style={{paddingLeft: 20, fontSize: 15}}>{userInfo.personId.email}</p>
                    </div>
                    <div className="item-info">
                        <i>{<FaPhoneAlt />}</i>
                        <p style={{paddingLeft: 20, fontSize: 15}}>{userInfo.personId.phone}</p>
                    </div> 
                </div>
            </div>
            <div className='information'>
                {renderInf()}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
  const {image, userInfo} = state.userReducer;
  return {
    image: image,
    userInfo: userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonInfo: (params) => dispatch(getPersonInfoAction(params)),
    setImagePerson: (params) => dispatch(setImagePersonAction(params)),
    updateUserName: (params) => dispatch(updateUserNameAction(params)),
    changeUserName: (params) => dispatch(changeUserNameAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonInf);
