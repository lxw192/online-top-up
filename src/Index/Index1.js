import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import moment from 'moment'
import { file_upload } from '../store/action/menu'
import InputField from '../components/InputField/InputField'
import { reduxForm, submit, getFormValues, Form, formValueSelector, change } from 'redux-form'
import PaginationWrop from '../components/PaginationWrop/PaginationWrop'
import SearchForm from '../components/SearchForm/SearchForm'
import { Tabs, Button, Icon, Col, Row, Modal ,Table,notification } from 'antd';
import { connect } from 'react-redux'
import $ from 'jquery'
import { get_personal_details , validate_password  , getPasswordList } from './../store/action/personal'
import { required, number, mobile, password } from '../components/InputField/validate'
// import { UploadWrap } from '../components/Upload/UploadWrap'
import UploadWrap from '../components/Upload/UploadWrap'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
// import Haha from './haha'
const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
};
const _formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
}
class Index1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(get_personal_details())
    }

    fileCallBack = () => {

    }
    searchGrid = (values) => {
        const { dispatch } = this.props;
        console.log(values)
        let parmas = []
        parmas.push("?offset=" + values.offset);
        parmas.push("&limit=" + values.limit);

        // dispatch(get_personal_details(parmas.join('')))
    }
   
    handleStart=()=>{
        console.log('123')
    }
    handleDrag=()=>{
        console.log('123')
    }
    handleStop=()=>{
        console.log('123')
    }
    handleOk = () => {
        const { change } = this.props
        change('modalLock', false)
    }
    onCancel = () => {
        const { change } = this.props
        change('modalLock', false)
    }
    showModal=()=>{
        const { change }  = this.props
        change('modalLock' , true)
    }
    addPassword=()=>{
        const { dispatch , allvalues } = this.props
        if(allvalues.password){
            dispatch(validate_password(allvalues.password))
        }else{
            notification.open({
                message: '提示',
                description: '请输入密码',
                icon: <img src='./img/信息icon.png'/> ,
              });
        }

    }
    renderModal() {
        const { modalLock , data=[{id:1231 , refill_card:'1231' ,refill_password:'123123123132',face_value:'123111' }]} = this.props
        let columns = [
            {title:'充值卡' , dataIndex:'refill_card' , key:'refill_card'},
            {title:'密码' , dataIndex:'refill_password' , key:'refill_password'},
            {title:'面值' , dataIndex:'face_value' , key:'face_value'},
            {
                title: '操作', dataIndex: 'action', key: 'action',
                render: (t , r) => {
                    return (
                        <a>充值</a>
                    )
                }
            },
        ]
        return (
            <Modal title="充值卡充值" visible={modalLock} onOk={this.handleOk} onCancel={this.onCancel} cancelText='取消' okText='确认' >
                <div className={'modal_box'}>
                    <p>提示：一次最多使用一张充值卡充值，您的余额是<span>1</span>元。本次续订套餐总月数是<span>1</span>月，共支付<span>1</span>元</p>
                    <InputField label={`密码`} validate={[required]} name='password' type='text' placeholder={'请输入密码'} />
                    <a href={'javascript:;'} onClick={this.addPassword}>添加</a>
                    <p>已添加的充值卡</p>
                    <Table columns={columns} dataSource={data} />
                </div>
            </Modal>
        )
    }
    render() {
        const { house_list } = this.props;
        return (
            <div className={`housing_information` , 'component_box'}>
                <div>
                    <Breadcrumb BreadcrumbData={[
                        {key:'个人信息' , link:'#/menu/home1' , islink:true},
                    ]}></Breadcrumb>
                </div>
                <SearchForm formName='personal_details_form' enableKeys={['keysearch']} search={this.searchGrid} ref="home_ref">
                    <div className={`housing_information_list`}>
                        <div style={{textAlign:'right'}}>
                            <Button type='primary' onClick={this.showModal}>充值</Button>
                        </div>
                       <div>个人信息</div>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`账号`} validate={[required]} name='account' type='text' placeholder={'请输入账号'} /></Col>
                           {/* <Col span={12}><InputField label={`密码`} validate={[required]} name='cipher' type='password' placeholder={'请输入密码'} /></Col> */}
                       </Row>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`用户名`} validate={[required]} name='username' type='text' placeholder={'请输入用户名'} /></Col>
                           <Col span={12}><InputField disabled={true} label={`所属区域`} validate={[required]} name='area' type='text' placeholder={'请输入所属区域'} /></Col>
                       </Row>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`身份证号`} validate={[required]} name='id_card_no' type='text' placeholder={'请输入身份证号'} /></Col>
                           <Col span={12}><InputField disabled={true} label={`手机号`} validate={[required]} name='mobile' type='text' placeholder={'请输入手机号'} /></Col>
                       </Row>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`联系地址`} validate={[required]} name='address' type='text' placeholder={'请输入联系地址'} /></Col>
                           <Col span={12}><InputField disabled={true} label={`门牌号`} validate={[required]} name='house_number' type='text' placeholder={'请输入门牌号'} /></Col>
                       </Row>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`充值时间`} validate={[required]} name='prepaid_phone_time' type='text' placeholder={'请输入充值时间'} /></Col>
                           <Col span={12}><InputField disabled={true} label={`套餐类型`} validate={[required]} name='package_type' type='text' placeholder={'请输入套餐类型'} /></Col>
                       </Row>
                       <Row>
                           <Col span={12}><InputField disabled={true} label={`套餐结束时间`} validate={[required]} name='prepaid_end_time' type='text' placeholder={'请输入套餐结束时间'} /></Col>
                           <Col span={12}><InputField disabled={true} label={`剩余时间`} validate={[required]} name='time_remaining' type='text' placeholder={'请输入剩余时间'} /></Col>
                       </Row>
                    </div>
                </SearchForm>
                <div>
                    {
                        this.renderModal()
                    }
                </div>
            </div >
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
const selector = formValueSelector('personal_details')
Index1 = reduxForm({
    form: 'personal_details',
    onSubmit: submitForm,
})(Index1)

const mapState = (state) => {
    return {
        modalLock:selector(state , 'modalLock'),
        allvalues:getFormValues('personal_details')(state),
    }
};

export default connect(mapState)(Index1);