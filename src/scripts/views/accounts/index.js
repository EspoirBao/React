import React, { Component } from 'react'
import "./index.scss"
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import LazyLoad from "&/lazyload";
export default class accounts extends Component {


    render() {
        return (
            <div className='accounts'>
                
                <div className='content'>

                    <Switch>
                        <Route path="/accounts" exact render={() => (<Redirect to="/accounts/login" />)} />
                        <Route path="/accounts/login" component={LazyLoad(() => import("./login"))} />
                        <Route path="/accounts/register" component={LazyLoad(() => import("./register"))} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}
