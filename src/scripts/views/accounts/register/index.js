import React, { Component } from 'react'
import ReactDOM from "react-dom"
import "./index.scss"
import { Button, Input, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
const { Search } = Input;




export default class register extends Component {
    constructor() {
        super()
        this.state = {
            pwd1: '',
            pwd2: '',
            style: { color: 'red', margin: '0' },
            login:false,
            password:'',
            username: '',
            tel: '',
            code: '',
        }
    }
    username = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    tel = (e) => {
        this.setState({
            tel: e.target.value
        })
    }
    code = (e) => {
        this.setState({
            code: e.target.value
        })
    }

    
    one = (e) => {
        this.setState({
            pwd1: e.target.value
        })
        if (e.target.value == '' || this.state.pwd2 == '') {
            this.setState({
                style: { color: 'red', margin: '0' },
                login:false
            })
        } else if (e.target.value != this.state.pwd2) {
            this.setState({
                style: { color: 'red', margin: '0' },
                login:false
            })
        } else {
            this.setState({
                style: { display: 'none' },
                password:e.target.value,
                login:true
            })
        }
    }
    two = (e) => {
        this.setState({
            pwd2: e.target.value
        })
        if (e.target.value == '' || this.state.pwd2 == '') {
            this.setState({
                style: { color: 'red', margin: '0' },
                login:false
            })
        } else if (this.state.pwd1 != e.target.value) {
            this.setState({
                style: { color: 'red', margin: '0' },
                login:false
            })
        } else {
            this.setState({
                style: { display: 'none' },
                password:e.target.value,
                login:true
            })
        }
    }
    sendcode = () => {
        const mReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (mReg.test(this.state.tel)) {
            Axios.post('http://localhost:8866/react/getCode', {
                tel:this.state.tel
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == '1') {
                        message.success('验证码已成功发送');
                    } else {
                        message.error('验证码发送失败');
                    }
                })
        } else {
            message.error('请检查手机号是否输入正确');
        }

    }
    login = () => {
        const { username,tel,code,password } = this.state
       if(username!=''||tel!=''||code!=''||password!=''){
        Axios.post('http://localhost:8866/react/useCode', {
            username,tel,code,password
        })
        .then(res => {
            console.log(res);
            if (res.data.code == '1') {
                message.success('注册成功');
                this.props.history.push('/accounts/login')
            } else {
                message.error('注册失败');
            }
        })
       }else{
        message.error('请检查信息是否填写完整');
       }
    }

    render() {
        return (
            <div className='register'>
                <p className='title'>注册</p>
                <div>
                    <Input
                        placeholder="用户名"
                        prefix={<Icon type="user"
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.username}
                    />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Input
                        placeholder="电话号码"
                        prefix={<Icon type="phone"
                        style={{ color: 'rgba(0,0,0,.25)' }}
                        />}
                        onChange={this.tel}
                    />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Search
                        onChange={this.code}
                        enterButton="发送验证码"
                        onSearch={this.sendcode}
                    />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Input.Password placeholder="input password" prefix={<Icon type="lock"
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.one} />
                </div>
                <div style={{ marginTop: '15px' }}>
                    <Input.Password placeholder="input password" prefix={<Icon type="lock"
                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.two} />
                </div>
                <p style={this.state.style}>两次密码不一致,或不完整</p>
                <Button type="primary" block style={{ marginTop: '25px' }} onClick={this.login} disabled={!this.state.login}>
                    Login
                </Button>


                <p style={{ marginTop: '15px' }}>记起密码了!? <Link to={'/accounts'}>马上登录!</Link></p>

            </div>
        )
    }
}
