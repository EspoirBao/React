import React, { Component } from 'react';
import "./index.scss"
import { axios, baseURL } from "&";
import { Modal, Button, Input, Select, message } from 'antd';
import { observer } from "mobx-react"
import shop from "~/mobx/shop"
import SqList from "~/components/sqlist"

const { TextArea } = Input;
const { Option, OptGroup } = Select;

@observer
class mysquare extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            title: '',
            content: '',
            answer: '',
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
        if(this.state.title&&this.state.content&&this.state.answer){
            var time = new Date().toLocaleString( )    
        axios.post('/react/addsq', {
            userid:shop.userinfo._id,
            username: shop.userinfo.username,
            useravatar: shop.userinfo.avatar,
            time, 
            title:this.state.title,
            content:this.state.content,
            answer:this.state.answer
        })
        .then(res => {
            if (res.data.code == '1') {
                this.setState({
                    visible: false,
                });
                shop.getuserinfo('/react/t/info', localStorage.getItem('token') || sessionStorage.getItem('token'))

                axios.post('/react/addintegral',{
                    userid:shop.userinfo._id
                })
                .then(res=>{
                    shop.getuserinfo('/react/t/info', localStorage.getItem('token') || sessionStorage.getItem('token'))
                })
            }

        })
        }else{
            message.error('请确认带红点的信息填写完整')
        }

        
        

    };

    // ------------数据绑定----------------

    titleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    contentChange = e => {
        this.setState({
            content: e.target.value
        })
    }

    answerChange = e => {
        this.setState({
            answer: e.target.value
        })
    }
    // ------------数据绑定----------------


    componentDidMount() {
        axios.post('/react/t/mysqlist', {
            token: localStorage.getItem('token') || sessionStorage.getItem('token')
        })
            .then(res => {
                if (res.data.data) {
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
                            提交问答
                        </Button>
                        <Modal
                            title="Upload project"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.ModalChange}
                        >
                            <p><span style={{ color: 'red' }}>*</span>主题:</p>
                            <Input placeholder="主题" onChange={this.titleChange} />

                            <p><span style={{ color: 'red' }}>*</span>内容:</p>
                            <TextArea
                                rows={3}
                                onChange={this.contentChange}
                                placeholder="内容" />
                            <p><span style={{ color: 'red' }}>*</span>答案:</p>
                            <TextArea rows={3} onChange={this.answerChange} placeholder="答案" />

                        </Modal>
                    </div>
                </div>
                <div className='content'>
                    <SqList list={this.state.list} goUrl={'mysq'}></SqList>
                </div>

            </div>
        );
    }
}

export default mysquare;