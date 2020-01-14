import React, { Component } from 'react'
import "./index.scss"
import { Table, Divider, Tag, Avatar } from 'antd';
import { axios, baseURL } from "&";
import { Link } from 'react-router-dom';
import shop from "~/mobx/shop"
import { observer } from "mobx-react"
import 'antd/dist/antd.css';
const { Column, ColumnGroup } = Table;

@observer
class user extends Component {


    constructor() {
        super()
        this.state = {
            userlist: [],
            dataSource: [],
        }
    }
    componentDidMount() {
        const {
            userinfo
        } = shop
        axios.post('/react/userlist', {
            username: userinfo.username
        })
            .then(res => {
                res.data.data.map((item, i) => {
                    item.key = i
                })
                this.setState({
                    dataSource: res.data.data
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
            <div className='user'>
                <Table dataSource={this.state.dataSource}>

                    <Column title="用户名" dataIndex="username" key="username" />

                    <Column
                        title="头像"
                        dataIndex="avatar"
                        key="avatar"
                        render={tags => (
                            <Avatar src={baseURL + tags} />
                        )}
                    />
                    <Column title="个人介绍" dataIndex="userinfo" key="userinfo" />
                    <Column title="班级" dataIndex="classnum" key="classnum" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a>Invite {record.lastName}</a>
                                <Divider type="vertical" />
                                <a>Delete</a>
                            </span>
                        )}
                    />
                </Table>,
            </div>
        )
    }
}
export default user