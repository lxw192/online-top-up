import React from 'react';
import { Input, Form ,Checkbox , Radio , Select } from 'antd';
import { Field } from 'redux-form';
import { required, maxLength, number, email, mobile, startCharacter, isTelphone, } from './validate';
const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
const _formItemLayouts = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
 
class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needReload : false,
            value:''
        }
    }
    static defaultProps = {
        options :[],
        defaultValue :[],
        maxLength:200,
        inputStyle:{width:200},
      }
      componentDidMount(){
          const { type } = this.props
          type == 'Verification'&&this.draw()
      }
    componentWillReceiveProps(nextProps){
        const { needReload } = nextProps
        if (needReload && !this.props.needReload) {
            this.setState({
                needReload: true
            })
            return
        }
        
    }
    validateRequired = (validate = []) => {
        let isRequireFlag = false;
        validate.map((val) => {
            if (val.toString().indexOf('此项是必填项') !== -1) {
                isRequireFlag = true
            }
        });
        return isRequireFlag;
    }
    validateStatus = (field) => {
        if (field && field.meta && field.meta.touched && field.meta.error) {
            return 'error'
        } else {
            return null;
        }
    }
    showErrMessage(field){
        if(field && field.meta && field.meta.touched && field.meta.error){
            return field.meta.error
        }else {
            return '';
        }
  }
  randomColor=()=>{//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  dj = () => {
    this.draw();
  }
  draw = () => {
    let show_num = []
    var canvas_width = document.getElementById('canvas').clientWidth;
    var canvas_height = document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i <= 3; i++) {
      var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
      var deg = Math.random() * 25 * Math.PI / 180;//产生0~30之间的随机弧度
      var txt = aCode[j];//得到随机的一个内容
      show_num[i] = txt;
      console.log()
      this.setState({
        show_num:show_num
      })
      var x = 10 + i * 20;//文字在canvas上的x坐标
      var y = 20 + Math.random() * 5;//文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      console.log(txt)
      context.translate(x, y);
      context.rotate(deg);

      context.fillStyle = this.randomColor();
      context.fillText(txt, 0, 0);

      context.rotate(-deg);
      context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle = this.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = this.randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }
    renderField = (field) => {
        const { formItemLayout, placeholder, allowClear, disabled, type, inputStyle, label, validate, formFiled , options ,defaultValue , defaultValues ,maxLength , dropdownMatchSelectWidth=false , width } = this.props
        console.log(type)

        if (type == 'checkbox') {
            return (
                    <FormItem
                        {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                        label={label}
                        required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                        help={this.showErrMessage(field)}
                        validateStatus={this.validateStatus(field)}  >
                        <Checkbox.Group options={options} defaultValue={defaultValue ? defaultValue : []} onChange={(value) => {
                            this.props.onChange ? this.props.onChange(value, field) : field.input.onChange(value);
                        }} />
                    </FormItem>
            )
        } else if (type == 'search') {
            return (
                    <FormItem
                        {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                        label={label}
                        required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                        help={this.showErrMessage(field)}
                        validateStatus={this.validateStatus(field)}  >
                       <Search {...field.input} placeholder={placeholder}  maxLength={maxLength} style={inputStyle} onSearch={this.props.onSearch} enterButton />
                    </FormItem>
            )
        } else if (type == 'select') {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Select {...field.input} showSearch style={inputStyle} placeholder={placeholder} optionFilterProp="children"
                    dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                        onChange={(value) => {
                            if (this.props.onChange) {
                                if (!value) {
                                    this.props.onChange('', field);
                                } else {
                                    this.props.onChange(value, field);
                                }
                            } else {
                                if (!value)
                                    if (value == 0) {
                                        field.input.onChange('0');
                                    } else {
                                        field.input.onChange('');
                                    }
                                else
                                    field.input.onChange(value);
                            }
                        }} onSearch={this.props.onSelect}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                            options&&options.length > 0 &&options.map((item , index)=>{
                                return (
                                    <Option value={item.label}>{item.value}</Option>
                                )
                            })
                        }
                        
                    </Select>
                </FormItem>
            )
        } else if(type == 'radio'){
            console.log(defaultValues , options)
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                        <Radio.Group onChange={
                            (val) => {
                                this.setState({
                                    value: val.target.value
                                })
                                if (this.props.onChange) {
                                    this.props.onChange(val.target.value, field);
                                } else {
                                    field.input.onChange(val.target.value);
                                }
                            }}
                            defaultValue={defaultValues}
                            value={ this.state.value ? this.state.value : defaultValues }
                            >
                            {
                                options.map((item , index)=>{
                                    console.log(item.value)
                                    return (
                                        <Radio.Button value={item.value}>{item.value}</Radio.Button>
                                    )
                                })
                            }
                        </Radio.Group>
                </FormItem>
        )
        } else if (type == 'Verification') {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Input {...field.input} value={field.input.value ? field.input.value : ''} allowClear={allowClear} disabled={disabled} placeholder={placeholder} type={type} style={{...inputStyle , width:width,}}
                        onChange={(value) => {
                            if (this.props.onChange) {
                                this.props.onChange(value, field);
                            } else {
                                field.input.onChange(value);
                            }
                        }} 
                        onBlur={()=>{
                               this.props.onBlur(field.input.value.toUpperCase() , this.state.show_num.join('').toUpperCase()) 
                        }}
                        />
                    <canvas id="canvas" width="100" height="30" onClick={this.dj} style={{ border: '1px solid #ccc', borderRadius: '5px' }}></canvas>
                </FormItem>
            )
        } else {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Input {...field.input} value={field.input.value ? field.input.value : ''} allowClear={allowClear} disabled={disabled} placeholder={placeholder} type={type} style={inputStyle}
                        onChange={(value) => {
                            if (this.props.onChange) {
                                this.props.onChange(value, field);
                            } else {
                                field.input.onChange(value);
                            }
                        }} />
                </FormItem>
            )
        }

    }
    render() {
        const { name, label, type, formFiled, validate } = this.props;
        const tempValidate = [required], otherValidate = [];
        const { needReload } = this.state;
        if(needReload){
            return (
                <Field fieldId={'preField' + name} name={name} label={label} type={type} validate={formFiled ? formFiled.is_required ? tempValidate : otherValidate : validate} component={ (field) => { return this.renderField(field) } } />
            );
        }else{
            return (
                <Field fieldId={'nexField' + name} name={name} label={label} type={type} validate={formFiled ? formFiled.is_required ? tempValidate : otherValidate : validate} component={this.renderField} />
            );
        }
      
    }
}


export default InputField;
