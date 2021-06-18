import { Input, Form } from 'antd';
import { connect } from 'react-redux';
import { createUserNameAction } from '../../redux/actions';
import { Button } from 'react-bootstrap';
import './index.css'
function LoginPage(props) {
  const { createUserName } = props;

  const onRegister = (val)=>{
    var pathArray = window.location.pathname.split('/register/');
    var userInf={
        username: val.username,
        password: val.password,
        personId: pathArray[1],
    }
    createUserName({...userInf})
  }

  return (
    <div className="body-container">
      <div className='tab-content' style={{ width: 450, margin: '16px auto' }}>
        <h3>REGISTER</h3>
        <Form
          wrapperCol={{ span: 24 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => onRegister(values)}
        >
        <Form.Item           
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input
            size='large'
            style={{
            fontSize: 16,
            }} 
            placeholder="Username" />
        </Form.Item>
        <Form.Item           
        name="confirm-username"
        dependencies={['username']}
        hasFeedback
        rules={[
            { required: true, message: 'Please input your username!' },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('username') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two username that you entered do not match!'));
                },
            }),
        ]}
        >
        <Input
            size='large'
            style={{
            fontSize: 16,
            }} 
            placeholder="Confirm Username" />
        </Form.Item>
        <Form.Item
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password
            size='large'
            style={{
            fontSize: 16,
            }}
            placeholder="Password" />
        </Form.Item>
        <Form.Item
        name="confirm-password"
        hasFeedback
        dependencies={['password']}
        rules={[
            { required: true, message: 'Please input your Confirm Password' },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
                }),
        ]}
        >
        <Input.Password
            size='large'
            style={{
            fontSize: 16,
            }}
            placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item style={{ marginLeft: 160, marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
            Register
        </Button>
        </Form.Item>
        </Form>
    </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {  status, userInfo } = state.userReducer;
  return {
    userInfo: userInfo,
    status: status,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUserName: (params) => dispatch(createUserNameAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
