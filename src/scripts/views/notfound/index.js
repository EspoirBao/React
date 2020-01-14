import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class notFound extends Component {
    render() {
        return (
            <div style={{textAlign:'center',marginTop:'150px'}}>
                <h1 style={{fontSize:'24px',fontWeight:'600'}} >页面被狗狗叼走啦～～～</h1>
                <p style={{fontSize:'16px',fontWeight:'400',textAlign:'center'}}><Link to={'/'}>点我</Link>返回主页</p>
            </div>
        )
    }
}
