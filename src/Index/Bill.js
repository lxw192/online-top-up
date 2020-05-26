import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import moment from 'moment'
import { file_upload } from '../store/action/menu'
import InputField from '../components/InputField/InputField'
import { reduxForm, submit, getFormValues, Form, formValueSelector, change } from 'redux-form'
import PaginationWrop from '../components/PaginationWrop/PaginationWrop'
import SearchForm from '../components/SearchForm/SearchForm'
import { Tabs, Button, Icon, Col, Row, Modal } from 'antd';
import { connect } from 'react-redux'
import $ from 'jquery'
import { get_house_list, creat_house_list } from '../store/action/index'
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
class Bill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        const { dispatch } = this.props
        const { home_ref } = this.refs
        setTimeout(() => {
           
        })
    }

    fileCallBack = () => {

    }
    searchGrid = (values) => {
        const { dispatch } = this.props;
        console.log(values)
        let parmas = []
        parmas.push("?offset=" + values.offset);
        parmas.push("&limit=" + values.limit);

        dispatch(get_house_list(parmas.join('')))
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
    render() {
        const { house_list } = this.props;
        return (
            <div className={`housing_information` , 'component_box'}>
                <div>
                    <Breadcrumb BreadcrumbData={[
                        {key:'用户账单' , link:'#/menu/bill' , islink:true},
                    ]}></Breadcrumb>
                </div>
                <SearchForm formName='home_form' enableKeys={['keysearch']} search={this.searchGrid} ref="home_ref">
                    <div className={`housing_information_list`}>
                      1234567890
                    </div>
                </SearchForm>
            </div >
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
const selector = formValueSelector('home')
Bill = reduxForm({
    form: 'home',
    onSubmit: submitForm,
})(Bill)

const mapState = (state) => {
    return {
    }
};

export default connect(mapState)(Bill);