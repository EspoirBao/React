

import React, {Component} from "react"

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

import LazyLoad from "&/lazyload";
import PropTypes from "prop-types"
// import Guide from "./guide";   
// import Login from "./login";

// 所有的路由  在这里配置 
export default class MainLayout extends Component{
    getChildContext(){
        return {
            history:this.props.history,
            location:this.props.location
        }
    }
    render(){
        return (
            <div className="main" style={{width:'100%',overflow:'hidden'}}>
              
                <Switch>
                    <Route path="/" exact render={()=>(<Redirect to="/home" /> )}  />

                    <Route path="/home" component={LazyLoad(()=>import("./home"))} />

                    <Route path="/accounts" component={LazyLoad(()=>import("./accounts"))} />

                    <Route path="/*" component={LazyLoad(()=>import("./notfound"))} />


                </Switch>  
                 
            </div>
        )
    }
}

MainLayout.childContextTypes = {
    history:PropTypes.object,
    location:PropTypes.object,

}