import React from 'react';
import axios from 'axios'
import s from './App.less';
import cx from 'classnames';
import { Tabs , Button } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import InputField from './components/InputField/InputField'
import { login } from './store/action/register'
import { getMd5Password } from './util/util'
import { required , number , mobile , password } from './components/InputField/validate'



const { TabPane } = Tabs;
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
  }
  onChange = (value, field) => {
    field.input.onChange(value);
  }
  onClick = () => {
    const { submit } = this.props;
    submit()
  }
  render() {
    const { items = [] } = this.state
    return (
      <div className={`bg_img`}>
        <div className={`login_page_box_opacity`}></div>
        <div className={`login_page_box`}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="账号密码登陆" key="1">
              <InputField name='phone' validate={[required]} label='账号' type='text' onChange={this.onChange} placeholder={`请输入账号`} />
              <InputField name='password' validate={[required]} label='密码' type='password' onChange={this.onChange} placeholder={`请输入密码`} />
              <div className={'logo_BTN'}>
                <Button style={{ marginRight: '20px' }} onClick={ ()=>window.location.href = '#/register'} >注册</Button>
                <Button type='primary' onClick={this.onClick} >登陆</Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }

}

const submitForm = (values, dispatch, props) => {
  console.log(values, dispatch, props)
  values.password = getMd5Password(values.password)
  dispatch(login(values)).then(data => {
    console.warn(data)
    if (data.code && data.code >= 300) {

    } else {
      props.history.push('/menu/home')
    }
  })
}

App = reduxForm ({
  form:'home',
  onSubmit:submitForm,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues:{
  }
})(App)

const mapState = (state) => {
    return {

    }
};

export default connect(mapState)(App);
