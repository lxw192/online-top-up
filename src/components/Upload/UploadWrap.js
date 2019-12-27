import React from 'react';
import ReactDOM from 'react-dom';
// import { file_upload } from '../store/action/menu'
import { Tabs, Button, Icon, Col, Row, Modal, Upload } from 'antd';
import { connect } from 'react-redux'

class UploadWrap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            uploading: false,
          };
    }
    componentDidMount() {
    }
    beforeUpload=(file, fileList)=>{
        console.log('file, fileList' , file, fileList)
    }
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        });
    
        this.setState({
          uploading: true,
        });
    
        // You can use any AJAX library you like
        // reqwest({
        //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        //   method: 'post',
        //   processData: false,
        //   data: formData,
        //   success: () => {
        //     this.setState({
        //       fileList: [],
        //       uploading: false,
        //     });
        //     message.success('upload successfully.');
        //   },
        //   error: () => {
        //     this.setState({
        //       uploading: false,
        //     });
        //     message.error('upload failed.');
        //   },
        // });
      };
      onChange=(event)=>{
        console.log(event)
      }
    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: file => {
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              return false;
            },
            fileList,
          }
      
        return (
            <div>
                <Upload {...props} onChange={this.onChange}>
                    <Button>
                        <Icon type="upload" /> Select File
              </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        )
    }
}

export default UploadWrap