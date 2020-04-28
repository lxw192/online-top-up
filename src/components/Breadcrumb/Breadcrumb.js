import React , { Component , PropTypes } from 'react'
import { Breadcrumb } from 'antd';
import './Breadcrumb.less'
export default class BreadcrumbComponent extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  static props={
    BreadcrumbData:[]
  }
  render(){
    const { BreadcrumbData=[] }  = this.props
   return(
     <div className={'Breadcrumb_box'}>
       <Breadcrumb separator=">">
         <Breadcrumb.Item className='location'>当前位置</Breadcrumb.Item>
         {
           BreadcrumbData.map((item, index) => {
             console.log(item.link)
              return <Breadcrumb.Item href={item.link} key={index} >{item.key}</Breadcrumb.Item>
           })
         }
       </Breadcrumb>
     </div>  
   ) 
  }
}