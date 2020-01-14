import React, { Component } from 'react'
import "./index.scss"
import { Input, Tooltip, Icon, Button, Switch ,message } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import Axios from "axios";
import shop from  "~/mobx/shop"
import {observer} from "mobx-react"

@observer
class login extends Component {

    constructor(props){
        super(props)
        this.state = {
           Remember:true,
            username:'',
            password:''
        }
    }

    username = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    password = (e) => {
        this.setState({
            password: e.target.value
            
        })
    }

    login=()=>{
        Axios.post('http://localhost:8866/react/login',{
            username:this.state.username,
            tel: this.state.username,
            password:this.state.password,
        })
        .then(res =>{
            if(res.data.code=='1'){
                message.success('登陆成功')
                if(this.state.Remember){
                    sessionStorage.setItem('token',res.data.token)
                    this.props.history.push('/home/mine')
                }else{
                    localStorage.setItem('token',res.data.token)
                    this.props.history.push('/home/mine')
                }
            }else{
                message.error('登录失败')
            }
        })
    }

    onChange=(e)=>{
        this.setState({
            Remember:!e
        })   
    }
    render() {
        

        return (
            <div className='login'>
                <p className='title'>欢迎登录</p>

                <div className='line1' style={{ marginTop: '25px' }}>
                    <Input
                        placeholder="username"
                        prefix={<Icon type="user"
                            style={{ color: 'rgba(0,0,0,.25)' }} />}
                            onChange={this.username}
                    />
                </div>

                <div className='line2' style={{ marginTop: '15px' }} >
                <Input.Password placeholder="input password" prefix={<Icon type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.password}/>
                            
                </div>
                <div className='line3'>
                    <Switch  onChange={this.onChange} size='small' />
                    <span> Remember me</span>
                </div>


                <Button type="primary" block style={{ marginTop: '25px' }} onClick={this.login}  >
                    Login
                </Button>

                <p> <Link to={'/accounts/register'}>马上注册!</Link></p>
            </div>
        )
    }
}
export default  login