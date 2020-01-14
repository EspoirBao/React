import React, { Component } from 'react';
import "./index.scss"
import { Table, Divider, Tag, Avatar, Pagination } from 'antd';
import { axios, baseURL } from "&";
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
const { Column, ColumnGroup } = Table;
class sqlist extends Component {
   
    render() {
        const {
            list,
            goUrl,
        } = this.props;
        return (
            <div>
                <Table dataSource={list}>

                    <Column title="用户名" dataIndex="username" key="username" width={150} />
                    <Column
                        title="头像"
                        dataIndex="useravatar"
                        key="useravatar"
                        width={100}
                        render={tags => (
                            <Avatar src={baseURL + tags} />
                        )}
                    />
                    <Column title="主题" dataIndex="title" key="title" width={400} />
                    
                    
                    <Column title="时间" dataIndex="time" key="time" width={250} />
                   
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <Link to={'/home/'+goUrl+'/'+text._id}>
                                Details
                                </Link>
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default sqlist;