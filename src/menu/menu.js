import React from 'react';
import './menu.less'
import { Layout, Menu, Breadcrumb, Icon, Carousel, Avatar, Badge, BackTop, Dropdown, Modal } from 'antd';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { connect } from 'react-redux'
import { reduxForm, submit, getFormValues, Form, formValueSelector } from 'redux-form'
import { getLoadInfo, updateInformation } from './../store/action/menu'
import MessageList from './MessageList'
import InputField from '../components/InputField/InputField'
import { required, number, mobile, password } from '../components/InputField/validate'
import { getMd5Password } from '../util/util'
import MaskProgress from '../components/MaskProgress/MaskProgress'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Menus extends React.Component {
    state = {
        collapsed: false,
        defaultOpenKeys:null
    };
    componentDidMount() {
        const { dispatch } = this.props
        let phone = window.sessionStorage.getItem('phone')
        if (phone) {
            dispatch(getLoadInfo(phone))
        } else {
            window.location.href = '/'
        }
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    selectedKeys = () => {
        const { location = {} } = this.props;
        const { pathname = '' } = location;
        let selectedKeys = [];
        if (pathname) {
            const path = pathname.substring(6);
            selectedKeys = path.split('/');
        }
        return [selectedKeys[0]]
    }
    onClick = (type) => {
        const { dispatch, change, myValues, initialize, loginData } = this.props
        switch (type) {
            case 'updatePassword':
                dispatch(initialize({
                    ...loginData,
                    modalLock: true
                }))
                // change('modalLock' , true)
                break
            case 'updatePassword':

                break
            case 'logout':
                window.sessionStorage.removeItem('user_id')
                window.sessionStorage.removeItem('phone')
                window.location.href = '/'
                break

        }
    }
    menu = ({ item, key, keyPath, domEvent }) => {
        window.location.href = `#/menu/${key}`
    }
    new_link = () => {
        const { change } = this.props;
        change('lock', true)
    }
    handleOk = () => {
        const { dispatch, submit } = this.props;
        dispatch(submit())
    }
    onCancel = () => {
        const { change } = this.props;
        change('modalLock', false)
        change('menuModal', false)
    }
    renderModal() {
        const { modalLock, loginData, myValues } = this.props
        console.log(myValues)
        return (
            <Modal title="修改密码" visible={modalLock} onOk={this.handleOk} onCancel={this.onCancel} cancelText='取消' okText='确认' >
                <InputField label={`昵称`} validate={[required]} name='name' type='text' placeholder={'请输入昵称'} />
                <InputField label={`手机号`} validate={[required]} name='phone' type='text' placeholder={'请输入手机号'} disabled={true} />
                <InputField label={`密码`} validate={[required]} name='password' type='password' placeholder={'请输入密码'} />
            </Modal>
        )
    }
    renderMenuModal() {
        const { menuModal } = this.props
        return (
            <Modal title="欢迎登陆" visible={menuModal} onCancel={this.onCancel} footer={null} >
                <p>欢迎登陆</p>
            </Modal>
        )
    }

    onOpenChange=(openKeys)=>{
        console.log('openKeys' , openKeys)
        if(openKeys.length == 0){
            this.setState({
                defaultOpenKeys:null
            })
             
        }else{
            this.setState({
                defaultOpenKeys:openKeys[1]
            })
        }
    }

    render() {
        const { defaultOpenKeys } = this.state
        const { loginData, number = 0, myValues } = this.props;
        const menus = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.onClick.bind(this, 'updatePassword')}>
                        修改密码
          </span>
                </Menu.Item>
                <Menu.Item>
                    <span>
                        个人中心
          </span>
                </Menu.Item>
                <Menu.Item>
                    <span onClick={this.onClick.bind(this, 'logout')}>
                        退出登陆
          </span>
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                <div>
                    <div className={`Carousel_box`}>
                        <Carousel autoplay>
                            <div>
                                <h3><span style={{ cursor: 'pointer' }} onClick={this.onClick.bind(this, 'updatePassword')}>{loginData && loginData.name ? loginData.name : '默认名称'}</span></h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                        </Carousel>
                    </div>
                    <Dropdown overlay={menus} >
                        <div style={{ position: 'absolute', top: '14px', right: '30px', cursor: 'pointer' }} onClick={this.new_link} >
                            <Badge count={number ? number : ''} >
                                <Avatar shape="square" icon="user" />
                            </Badge>
                        </div>
                    </Dropdown>
                </div>
                <Layout style={{ minHeight: '100vh' }}>
                    <strong style={{ color: '#1088e9' }}></strong>
                    <BackTop>
                        <div className="ant-back-top-inner">UP</div>
                    </BackTop>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['home']} selectedKeys={this.selectedKeys()} openKeys={[defaultOpenKeys]} onOpenChange={this.onOpenChange} onClick={this.menu} mode="inline">
                            <Menu.Item key="home">
                                <Icon type="pie-chart" />
                                <span>首页</span>
                            </Menu.Item>
                            <Menu.Item key="personal_details">
                                <Icon type="pie-chart" />
                                <span>个人信息</span>
                            </Menu.Item>
                            <SubMenu key="sub1" title="用户账单">
                                <Menu.Item key="bill">用户账单</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="业务办理">
                                <Menu.Item key="home2123">业务办理</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="账户管理">
                                <Menu.Item key="change_password">修改密码</Menu.Item>
                                <Menu.Item key="home22">退出登录</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
                {
                    myValues && myValues.lock && <MessageList></MessageList>
                }
                {
                    this.renderModal()
                }
                {
                    this.renderMenuModal()
                }
                {
                    <MaskProgress />
                }
            </div>

        );
    }
}

const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
    values.password = getMd5Password(values.password)
    dispatch(updateInformation(values))
}
const selector = formValueSelector('menu')
Menus = reduxForm({
    form: 'menu',
    onSubmit: submitForm,
})(Menus)

const mapState = (state) => {
    const { register: { number, loginData } } = state
    return {
        number, loginData,
        myValues: getFormValues('menu')(state),
        modalLock: selector(state, 'modalLock'),
        menuModal: selector(state, 'menuModal'),
    }
}

export default connect(mapState)(Menus)