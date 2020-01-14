import React, { Component } from 'react'
import "./index.scss"
import { axios, baseURL } from "&";
import shop from "~/mobx/shop"
import { observer } from "mobx-react"
import List from "~/components/list"
import { Modal, Button, Input, Select, message } from 'antd';
const { TextArea } = Input;
const { Option, OptGroup } = Select;
@observer
class myproject extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            objtype: '',
            objname: '',
            objaddress: '',
            objinfo: '',
            objPrecautions: '',

        }
    }

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    ModalChange = e => {
        this.setState({
            visible: false,
        });
    };

    handleOk = e => {
        if (this.state.objaddress && this.state.objname && this.state.objtype) {
            axios.post('/react/addobj', {
                username: shop.userinfo.username,
                objname: this.state.objname,
                id: shop.userinfo._id,
                classnum: shop.userinfo.classnum,
                objaddress: this.state.objaddress,
                avatar: shop.userinfo.avatar,
                objtype: this.state.objtype,
                objinfo: this.state.objinfo,
                objPrecautions: this.state.objPrecautions,
            })
                .then(res => {
                    if (res.data.code == '1') {
                        this.setState({
                            visible: false,
                        });

                        shop.getuserinfo('/react/t/info', localStorage.getItem('token') || sessionStorage.getItem('token'))

                    }

                })
        } else {
            message.error('请确认带红点的信息填写完整')
        }


    };



    // ------------------数据双向绑定------------------------
    SelectChange = e => {
        this.setState({
            objtype: e
        });
    };
    infoChange = e => {
        this.setState({
            objinfo: e.target.value
        });
    };

    Precautions = e => {
        this.setState({
            objPrecautions: e.target.value
        });
    };

    objnameChange = e => {
        this.setState({
            objname: e.target.value
        });
    };
    objaddressChange = e => {
        this.setState({
            objaddress: e.target.value
        });
    };
    // -------------------------------

    componentDidMount() {
        axios.post('/react/t/myobj', {
            token: localStorage.getItem('token') || sessionStorage.getItem('token')
        })
            .then(res => {

                if (res.data.data.length) {
                    res.data.data.map((item, i) => {
                        item.key = i
                    })
                    this.setState({
                        list: res.data.data
                    })

                }
            })
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        const {
            userinfo
        } = shop
        return (
            <div>
                <div className='head'>
                    <div className='h_L'></div>
                    <div className='h_R'>
                        <Button type="primary" onClick={this.showModal}>
                            提交项目
                        </Button>
                        <Modal
                            title="Upload project"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.ModalChange}
                        >
                            <p><span style={{ color: 'red' }}>*</span>项目名称:</p>
                            <Input placeholder="项目名称" onChange={this.objnameChange} />
                            <p><span style={{ color: 'red' }}>*</span>项目线上地址:</p>
                            <Input placeholder="项目上线地址" onChange={this.objaddressChange} />
                            <p><span style={{ color: 'red' }}>*</span>项目框架:</p>
                            <Select style={{ width: 200 }} onChange={this.SelectChange}>

                                <Option value="Node">Node</Option>
                                <Option value="Vue">Vue</Option>
                                <Option value="React">React</Option>
                                <Option value="Angular">Angular</Option>
                                <Option value="微信小程序">微信小程序</Option>

                            </Select>
                            <p>项目信息:</p>
                            <TextArea
                                rows={3}
                                onChange={this.infoChange}
                                placeholder="项目信息" />
                            <p>备注:</p>
                            <TextArea rows={3} onChange={this.Precautions} placeholder="备注" />

                        </Modal>
                    </div>
                </div>
                <div className='content'>
                    <List list={this.state.list} userinfo={userinfo} button={'ture'} ></List>
                </div>

            </div>
        )
    }
}
export default myproject
