import React, { Component } from 'react'
import "./index.scss"
import { Upload, Icon, message, Modal, Button, Input, Select } from 'antd';
import shop from "~/mobx/shop"
import { observer } from "mobx-react"
import { axios, baseURL } from "&";
const { TextArea } = Input;
const { Option, OptGroup } = Select;

// ---------------------------------------------

// -------------上传头像模块↓--------------------
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
        message.error('Image must smaller than 4MB!');
    }
    return isJpgOrPng && isLt4M;
}
// ---------------------------------------------

@observer
class mine extends Component {


    state = {
        loading: false,
        visible: false,
        info: '',
        classnum: '',
    };

    classChange = (value) => {
        this.setState({
            classnum: value.label
        })

        console.log(value.label)
    }



    info = (e) => {
        this.setState({
            info: e.target.value
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {

        axios.post('/react/t/userinfo', {
            token: localStorage.getItem('token') || sessionStorage.getItem('token'),
            userinfo: this.state.info,
            classnum: this.state.classnum,
        })

            .then(res => {
                if (res.data.code == '1') {
                    message.info(res.data.msg)
                    shop.getuserinfo('/react/t/info', localStorage.getItem('token') || sessionStorage.getItem('token'))
                } else {
                    message.error(res.data.msg)
                }
            })

        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(2222);
        this.setState({
            visible: false,
        });
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            axios.post('/react/t/avatar', {
                token,
                avatar: info.file.response.url[0]
            })
                .then(res => {
                    if (res.data.code == '1') {
                        message.info(res.data.msg)
                        shop.getuserinfo('/react/t/info', token)
                    } else {
                        message.error(res.data.msg)

                    }
                })
        }

    };
    componentWillMount() {
        this.setState({ imageUrl: baseURL + shop.userinfo.avatar })
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className='mine'>

                <h1>{shop.userinfo.username}</h1>

                <div className='content'>
                    <div className='box'>
                        <div className='av'>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={baseURL + "/upload/img"}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                        <div className='pl'>
                            <div className='line1'>
                                个人介绍:
                                <span className='line2'>{shop.userinfo.userinfo ? shop.userinfo.userinfo : '暂时还没有个人介绍哦'}</span>
                            </div>
                            <hr />
                            <div className='line1'>
                                班级:
                                <span className='line2'>{shop.userinfo.classnum ? shop.userinfo.classnum : '暂时还没选择班级哦'}</span>
                            </div>
                            <hr />
                            <div className='line1'>
                                积分:
                                <span className='line2'>{shop.userinfo.integral ? shop.userinfo.integral : '暂时没有积分哦,还去卢本伟广场吧'}</span>
                            </div>
                            <hr />
                            <div>


                                <Button type="primary" onClick={this.showModal}>
                                    添加或修改个人信息
                            </Button>
                                <Modal
                                    title="Personal information"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    班级:<Select
                                        labelInValue

                                        style={{ width: 120, marginBottom: "20px" }}
                                        onChange={this.classChange}
                                    >
                                        <OptGroup label="19级">
                                            <Option value="1909">1909</Option>
                                            <Option value="1910">1910</Option>
                                            <Option value="1911">1911</Option>
                                            <Option value="1912">1912</Option>
                                        </OptGroup>
                                        <OptGroup label="20级">
                                            <Option value="2001">2001</Option>
                                            <Option value="2002">2002</Option>
                                        </OptGroup>
                                    </Select>

                                    <p>个人介绍:</p>
                                    <TextArea rows={4} onChange={this.info} />
                                </Modal>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        )
    }
}
export default mine
