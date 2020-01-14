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
class squarelist extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        console.log(123)
        axios.post('/react/t/sqlist', {
            token: localStorage.getItem('token') || sessionStorage.getItem('token')
        })
            .then(res => {
                console.log(res)
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
        return (
            <div>
                <SqList list={this.state.list} goUrl={'sq'}></SqList>
                
            </div>
        );
    }
}

export default squarelist;