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
import { get_house_list, creat_house_list } from './../store/action/index'
import { required, number, mobile, password } from '../components/InputField/validate'
// import { UploadWrap } from '../components/Upload/UploadWrap'
import UploadWrap from '../components/Upload/UploadWrap'
let areaData = [
    { label: '不限', value: '不限' },
    { label: '通州', value: '通州' },
    { label: '大兴', value: '大兴' },
    { label: '房山', value: '房山' },
    { label: '丰台', value: '丰台' },
    { label: '昌平', value: '昌平' },
    { label: '石景山', value: '石景山' },
    { label: '门头沟', value: '门头沟' },
    { label: '海淀', value: '海淀' },
    { label: '朝阳', value: '朝阳' },
    { label: '顺义', value: '顺义' },
    { label: '东城', value: '东城' },
    { label: '西城', value: '西城' },
    { label: '怀柔', value: '怀柔' },
    { label: '平谷', value: '平谷' },
]
let rateData = [
    { label: '不限', value: '不限' },
    { label: '40~70', value: '40~70万' },
    { label: '70~100', value: '70~100万' },
    { label: '100~130', value: '100~130万' },
    { label: '130~160', value: '130~160万' },
    { label: '160~190', value: '160~190万' },
    { label: '220~250', value: '220~250万' },
    { label: '250', value: '250万以上' },
]
let acreageData = [
    { label: '不限', value: '不限' },
    { label: '50~70', value: '50~70㎡' },
    { label: '70~90', value: '70~90㎡' },
    { label: '90~110', value: '90~110㎡' },
    { label: '110~130', value: '110~130㎡' },
    { label: '130~150', value: '130~150㎡' },
    { label: '150~180', value: '150~180㎡' },
    { label: '180', value: '180㎡以上' },
]
let orientationData = [
    { label: '不限', value: '不限' },
    { label: '东', value: '东' },
    { label: '南', value: '南' },
    { label: '西', value: '西' },
    { label: '北', value: '北' },
]
let floorData = [
    { label: '不限', value: '不限' },
    { label: '底层', value: '底层' },
    { label: '中层', value: '中层' },
    { label: '高层', value: '高层' },
    { label: '顶层', value: '顶层' },
]
let tower_age_Data = [
    { label: '不限', value: '不限' },
    { label: '5', value: '5年' },
    { label: '10', value: '10年' },
    { label: '15', value: '15年' },
    { label: '20', value: '20年' },
    { label: '30', value: '30年及以上' },
]
let decorationData = [
    { label: '不限', value: '不限' },
    { label: '精装修', value: '精装修' },
    { label: '简装修', value: '简装修' },
    { label: '毛坯房', value: '毛坯房' },
]
let purposeData = [
    { label: '不限', value: '不限' },
    { label: '普通住宅', value: '普通住宅' },
    { label: '商业', value: '商业' },
    { label: '别墅', value: '别墅' },
    { label: '四合院', value: '四合院' },
    { label: '其他', value: '其他' },
]
let ownershipData = [
    { label: '不限', value: '不限' },
    { label: '商品房', value: '商品房' },
    { label: '公房', value: '公房' },
    { label: '经济房', value: '经济房' },
    { label: '其他', value: '其他' },
]
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
        const { home_ref } = this.refs
        console.log(this.refs)
        // dispatch(get_house_list('?offset=0&limit=10'))
        setTimeout(() => {
            home_ref.changeValues({
                area: '不限',
                orientation: '不限',
                floor: '不限',
                tower_age: '不限',
                decoration: '不限',
                purpose: '不限',
                ownership: '不限',
            })
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
        if (values.area && values.area != '不限') parmas.push("&area=" + values.area);
        if (values.orientation && values.orientation != '不限') parmas.push("&orientation=" + values.orientation);
        if (values.floor && values.floor != '不限') parmas.push("&floor=" + values.floor);
        if (values.tower_age && values.tower_age != '不限') parmas.push("&tower_age=" + values.tower_age);
        if (values.decoration && values.decoration != '不限') parmas.push("&decoration=" + values.decoration);
        if (values.purpose && values.purpose != '不限') parmas.push("&purpose=" + values.purpose);
        if (values.ownership && values.ownership != '不限') parmas.push("&ownership=" + values.ownership);
        if (values.keysearch) parmas.push("&keysearch=" + values.keysearch);

        dispatch(get_house_list(parmas.join('')))
    }
    search = () => {
        const { home_ref } = this.refs
        home_ref.searchGrid()
    }
    
    addHouse = () => {
        const { change } = this.props
        change("modalLock", true)
    }
    handleCancel = () => {
        const { change } = this.props
        change("modalLock", false)
    }
    handleOk = () => {
        console.log("11111111111111111")
        const { dispatch , submit } = this.props
        dispatch(submit())
    }
    endCallBack = (data) => {
        const { change } = this.props
        if(data.code == 200){
            change('img_url' , data.url)
        }
    }
    renderModal() {
        const { modalLock } = this.props
        return (
            <Modal title="添加房源" visible={modalLock} onCancel={this.handleCancel} onOk={this.handleOk} okText="确认" cancelText="取消">
                <Row>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`标题`} name='title_name'  validate={[required]} type='text' options={areaData} placeholder={'请输入标题'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`总价`} name='price'  validate={[required]} type='text' options={areaData} placeholder={'请输入总价'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`单价`} name='univalence' validate={[required]} type='text' options={areaData} placeholder={'请输入单价'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`位置`} name='area' defaultValues={'不限'} validate={[required]} type='select' options={areaData} placeholder={'请选择位置'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`售价`} name='rate' defaultValues={'不限'} validate={[required]} type='select' options={rateData} placeholder={'请选择售价'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`面积`} name='acreage' defaultValues={'不限'} validate={[required]} type='select' options={acreageData} placeholder={'请选择面积'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`朝向`} name='orientation' defaultValues={'不限'} validate={[required]} type='select' options={orientationData} placeholder={'请选择朝向'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`楼层`} name='floor' defaultValues={'不限'} validate={[required]} type='select' options={floorData} placeholder={'请选择楼层'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`楼龄`} name='tower_age' defaultValues={'不限'} validate={[required]} type='select' options={tower_age_Data} placeholder={'请选择楼龄'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`装修`} name='decoration' defaultValues={'不限'} validate={[required]} type='select' options={decorationData} placeholder={'请选择装修'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`用途`} name='purpose' defaultValues={'不限'} validate={[required]} type='select' options={purposeData} placeholder={'请选择用途'} />
                    </Col>
                    <Col>
                        <InputField formItemLayout={_formItemLayout} label={`权属`} name='ownership' defaultValues={'不限'} validate={[required]} type='select' options={ownershipData} placeholder={'请选择权属'} />
                    </Col>
                    <Col>
                        <UploadWrap endCallBack={this.endCallBack}></UploadWrap>
                    </Col>
                </Row>
            </Modal>
        )
    }
    render() {
        const { house_list } = this.props;
        let str = '紫绶园 东南不临街两居室 精装自住装修'
        const { url } = this.props
        return (
            <div className={`housing_information`}>
                <SearchForm formName='home_form' enableKeys={['keysearch']} search={this.searchGrid} ref="home_ref">
                    <div className={`search`}>
                        <div >
                            <div className={`search_box`}>
                                <InputField formItemLayout={_formItemLayout} onSearch={this.search} inputStyle={{ width: '300px' }} label={`标题`} name='keysearch' type='search' placeholder={'请输入'} />
                            </div>
                            <div className={`search_box` } className={ 'search_btn' }>
                                <Button type='primary' onClick={this.addHouse}>新增</Button>
                            </div>
                        </div>
                        <Row>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`位置`} name='area' defaultValues={'不限'} type='radio' options={areaData} placeholder={'请选择位置'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`售价`} name='rate' defaultValues={'不限'} type='radio' options={rateData} placeholder={'请选择售价'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`面积`} name='acreage' defaultValues={'不限'} type='radio' options={acreageData} placeholder={'请选择面积'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`朝向`} name='orientation' defaultValues={'不限'} type='radio' options={orientationData} placeholder={'请选择朝向'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`楼层`} name='floor' defaultValues={'不限'} type='radio' options={floorData} placeholder={'请选择楼层'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`楼龄`} name='tower_age' defaultValues={'不限'} type='radio' options={tower_age_Data} placeholder={'请选择楼龄'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`装修`} name='decoration' defaultValues={'不限'} type='radio' options={decorationData} placeholder={'请选择装修'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`用途`} name='purpose' defaultValues={'不限'} type='radio' options={purposeData} placeholder={'请选择用途'} />
                            </Col>
                            <Col>
                                <InputField formItemLayout={formItemLayout} label={`权属`} name='ownership' defaultValues={'不限'} type='radio' options={ownershipData} placeholder={'请选择权属'} />
                            </Col>
                        </Row>
                    </div>
                    <div className={`housing_information_list`}>
                        <Row>
                            {
                                house_list && house_list.length > 0 && house_list.map((item, index) => {
                                    return (
                                        <Col key={index} span={12}>
                                            <div className={'list'}>
                                                <div>
                                                    <img src={`house_img/${item.img_url}`} alt="" />
                                                </div>
                                                <div>
                                                    <p className={'title'} title={`${str.length > 18 ? str : ''}`}>{item.title_name}</p>
                                                    <div>地址</div>
                                                    <div><img src={`${__dirname}img/icon/house.png`} />{item.area} | {item.orientation} | {item.floor} | {item.decoration} | {item.ownership}</div>
                                                    <div><img src={`${__dirname}img/icon/time.png`} />{item.creat_time > 0 ? moment(item.creat_time * 1000).format("YYYY/MM/DD") : ''}</div>
                                                </div>
                                                <div>
                                                    <div className={`price`}>252 万</div>
                                                    <div className={`univalence`}>单价59986元/平米</div>
                                                </div>
                                                <span className={`cross`}>×</span>    
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <PaginationWrop formName='home_form' onChange={this.searchGrid}></PaginationWrop>
                    </div>
                </SearchForm>
                {this.renderModal()}
            </div >
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
    dispatch(creat_house_list(values)).then(data=>{
        if(data.code&&data.code > 300){

        }else{
            props.change("modalLock", false)
        }
    })
}
const selector = formValueSelector('home')
Index1 = reduxForm({
    form: 'home',
    onSubmit: submitForm,
})(Index1)

const mapState = (state) => {
    const { home: { house_list } } = state
    return {
        house_list,
        url: selector(state, 'url'),
        modalLock: selector(state, 'modalLock'),
    }
};

export default connect(mapState)(Index1);