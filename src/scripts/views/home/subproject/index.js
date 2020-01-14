import React, { Component } from 'react'
import "./index.scss"
import "./index.scss"
import { axios, baseURL } from "&";
import List from "~/components/list"
export default class subproject extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            

        }
    }
    componentDidMount() {
        axios.post('/react/t/objlist', {
            token: localStorage.getItem('token') || sessionStorage.getItem('token')
        })
            .then(res => {
                res.data.data.map((item, i) => {
                    item.key = i
                })
                this.setState({
                    list: res.data.data
                })


                if (res.data.data.length) {
                    
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
                <div className='head'>
                    <div></div>
                    <div></div>
                </div>
                <div className='content'>
                    <List list={this.state.list}></List>
                </div>

            </div>
        )
    }
}
