import React, { Component } from 'react';
import "./index.scss"
import { axios, baseURL } from "&";
import { Descriptions, Avatar, Popconfirm, message } from 'antd';
import 'antd/dist/antd.css';
import shop from "~/mobx/shop"
import { observer } from "mobx-react"
@observer
class myqs extends Component {
    state = {
        info: '',
        answer: '',
    };

    confirm = (e) => {
        axios.post('/react/getanswer',{
            userid:shop.userinfo._id,
            sqid:this.state.info._id,
        })
        .then(res=>{
            console.log(res)
            if(res.data.code==1){
                this.setState({
                    answer:res.data.data[0].answer
                })
                message.success('获取答案成功');
            }else{
                message.error('获取答案失败')
            }
        })
    }

    cancel = (e) => {
        message.error('取消操作');
    }

    componentDidMount() {
        axios.post('/react/getmysq', {
            _id: this.props.match.params.id
        })
            .then(res => {
                console.log(res)
                this.setState({
                    info: res.data.data[0]
                })
            })

    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        return (
            <div>
                <Descriptions title="主题">
                    <Descriptions.Item label="用户名">
                        {this.state.info.username}
                        <Avatar
                            src={baseURL + this.state.info.useravatar}
                            shape="square" size="large" icon="user"
                            style={{ marginLeft: '20px' }} /></Descriptions.Item>
                    <Descriptions.Item label="发布时间"> {this.state.info.time}</Descriptions.Item>
                    <Descriptions.Item label="标题">{this.state.info.title}</Descriptions.Item>
                    <Descriptions.Item label="内容">
                        {this.state.info.content}
                    </Descriptions.Item>
                    <Descriptions.Item label="答案">
                        {this.state.info.answer}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

export default myqs;