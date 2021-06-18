import { Input, Form } from 'antd';
import { connect } from 'react-redux';
import { loginUser as loginAction } from '../../redux/actions';
import { Button } from 'react-bootstrap';
import './index.css'
function LoginPage(props) {
  const { onLogin } = props;

  // const suffix = (
    
  //     style={{
  //       fontSize: 16,
  //       color: '#1890ff',
  //     }}

  // );
  return (
    <div className="body-container">
      <div className='tab-content' style={{ width: 450, margin: '16px auto' }}>
        <h3>LOGIN</h3>
        <Form
          wrapperCol={{ span: 24 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => onLogin(values)}
        >
          <Form.Item           
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              size='large'
              style={{
                fontSize: 16,
                color: '#1890ff',
              }} 
              placeholder="Username!" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size='large'
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
              placeholder="Password!" />
          </Form.Item>

          <Form.Item style={{ marginLeft: 160, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      {/* </Card> */}
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
    onLogin: (params) => dispatch(loginAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
