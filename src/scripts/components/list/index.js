import React, { Component } from 'react';
import "./index.scss"
import { Table, Divider, Tag, Avatar, Pagination, Popconfirm, message } from 'antd';
import { axios, baseURL } from "&";
import 'antd/dist/antd.css';
import shop from "~/mobx/shop"
const { Column, ColumnGroup } = Table;

class list extends Component {
    del = (text) => {
        console.log(text._id)
        axios.post('/react/delobj', {
            _id: text._id
        })
            .then(res => {
                if (res.data.code == '1') {
                    window.location.reload()
                }
            })
    }
    page = (page, pageSize) => {
        console.log(page, pageSize)
    }

    confirm = (e) => {
        console.log(e);
        axios.post('/react/delobj', {
            _id: e._id
        })
            .then(res => {
                if (res.data.code == '1') {
                    message.success('Click on Yes');
                    window.location.reload()
                }
            })
       
    }
    cancel = (e) => {
        console.log(e);
    }
    render() {
        const {
            list,
            button,
        } = this.props;


        return (
            <div>
                <Table dataSource={list}>

                    <Column title="用户名" dataIndex="username" key="username" width={150} />
                    <Column
                        title="头像"
                        dataIndex="avatar"
                        key="avatar"
                        width={100}
                        render={tags => (
                            <Avatar src={baseURL + tags} />
                        )}
                    />
                    <Column title="项目类型" dataIndex="objtype" key="objtype" width={150} />
                    <Column title="班级" dataIndex="classnum" key="classnum" width={150} />
                    <Column title="项目名称" dataIndex="objname" key="objname" width={150} />
                    <Column title="项目地址" dataIndex="objaddress" key="objaddress" width={250} />
                    <Column title="项目亮点" dataIndex="objinfo" key="objinfo"
                        width={350} />
                    <Column title="备注" dataIndex="objPrecautions" key="objPrecautions"
                        width={350} />
                    <Column
                        className={button ? '' : 'none'}
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <span>
                                {/* <a onClick={() => this.del(text)}>delete
                                </a> */}

                                <Popconfirm
                                    title="确认删除这条项目吗"
                                    onConfirm={()=>this.confirm(text)}
                                    onCancel={this.cancel}
                                    okText="是"
                                    cancelText="否"
                                >
                                    <a href="#">Delete</a>
                                </Popconfirm>
                            </span>
                        )}
                    />
                </Table>


            </div>
        );
    }
}

export default list;