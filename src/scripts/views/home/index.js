import "./index.scss"
import React, { Component } from "react"
import LazyLoad from "&/lazyload";
import { Menu, Icon, Avatar, Button, Dropdown, message } from 'antd';
import { axios, baseURL } from "&";
import {Link} from 'react-router-dom';
import shop from "~/mobx/shop"
import { observer } from "mobx-react"
import 'antd/dist/antd.css';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

const out = () => {
    sessionStorage.setItem('token', '')
    localStorage.setItem('token', '')
    window.location.reload()
}

const { SubMenu } = Menu;
const menu = (
    <Menu>
        <Menu.Item ><Link to={'/home/mine'}>设置</Link></Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={out} >退出登录</Menu.Item>
    </Menu>
)
@observer
class Home extends Component {


    ;


    handleClick = e => {
        console.log('click ', e.key);
        this.props.history.push('/home/' + e.key)
    };

    handleClick = e => {
        console.log('click ', e.key);
        this.props.history.push('/home/' + e.key)
    };

    constructor(props) {
        super(props)
        this.state = {
            banner: []
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        // shop.getuserinfo('/react/t/info', token)
        axios.post('/react/t/info', {
            token,
        })
            .then(res => {
                if (res.data.code == '1') {
                    console.log()
                    shop.changeuserinfo(res.data.data[0])
                } else {
                    this.props.history.push('/accounts/login')
                }
            })



    }


    render() {
        const {
            userinfo
        } = shop
        return (
            <div className='boss'>
                <div className='nav'>
                    <div className='title'>后台管理系统</div>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256, height: '100%', overflow: 'hidden' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>首页</span>
                                </span>
                            }
                        >
                            <Menu.Item key="mine">我的</Menu.Item>
                            <Menu.Item key="user">用户</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>通用</span>
                                </span>
                            }
                        >
                            <Menu.Item key="myproject">我的项目</Menu.Item>
                            <Menu.Item key="subproject">项目列表</Menu.Item>

                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <Icon type="usergroup-delete" />
                                    <span>广场</span>
                                </span>
                            }
                        >
                            <Menu.Item key="mysquare">我发布的题目</Menu.Item>
                            <Menu.Item key="squarelist">广场</Menu.Item>

                        </SubMenu>



                    </Menu>







                </div>
                <div className='content'>
                    <div className='C_head'>
                        <div className='L'></div>
                        <div className='R'>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <a className="ant-dropdown-link" style={{ color: '#fff' }}>
                                    {userinfo.username} <Icon type="down" />
                                </a>
                            </Dropdown>
                            <Avatar
                                src={baseURL + userinfo.avatar}
                                shape="square" size="large" icon="user"
                                style={{ marginLeft: '20px' }} />
                        </div>
                    </div>
                    <div className='view'>
                        <Switch>

                        <Route path="/home" exact render={() => (<Redirect to="/home/mine" />)} />


                            <Route path="/home/mine" component={LazyLoad(() => import("./mine"))} />
                            <Route path="/home/user" component={LazyLoad(() => import("./user"))} />
                            <Route path="/home/myproject" component={LazyLoad(() => import("./myproject"))} />
                            <Route path="/home/subproject" component={LazyLoad(() => import("./subproject"))} />
                            <Route path="/home/mysquare" component={LazyLoad(() => import("./mysquare"))} />
                            <Route path="/home/squarelist" component={LazyLoad(() => import("./squarelist"))} />
                            <Route path="/home/sq/:id" component={LazyLoad(() => import("./sq"))} />
                            <Route path="/home/mysq/:id" component={LazyLoad(() => import("./myqs"))} />

                        </Switch>

                    </div>

                </div>



            </div>
        )
    }
}
export default Home