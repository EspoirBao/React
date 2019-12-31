




// import {msg,config} from  "&";

// import pic from "@/assets/images/photo.png";

// import one from "@/assets/images/Pikachu.jpg";

// // import two from "https://zuozhaoxi.com/base/img/3.jpg"

// document.getElementById("app").innerHTML += `<h2>wuhan1910---天道酬勤</h2>`

//     + `<h2>webapck so easy!  </h2>` 
//     + `<h2>热替换 更新JS代码自动刷新浏览器 </h2>` 
//     + `<h2>${msg} </h2>` 
//     + `<h2>${config.baseURL} </h2>` 
//     + `<i class="iconfont  icon-shangpin" >  </i>` 


// document.getElementById("app").style.backgroundImage ="url("+one+")";



import React , {Component} from "react";     // react 核心文件  创建组件  虚拟DOM模型  Diff算法  
import ReactDOM, {render} from "react-dom";  // 操作react 组件 渲染  

// import MainCpt from "./components"
import "./route"


class App extends React.Component{
    render(){
        return (
            <div>
                <h2>这就是 react 基本组件写法 </h2>
                <h1>javascript XML 语法的特点</h1>
                <hr/>
                <Main s="1"></Main>
            </div>
        )
    }
}

class Main extends React.Component{
    render(){
        return (
            <div>
                <h2> main -- main - main  - 组件</h2>
            </div>
        )
    }
}

class Content extends React.Component{
    render(){
        return (
            <div>
                <h2> content -- 内容 --内容页 </h2>
                <Demo/>
                <Menu/>
            </div>
        )
    }
}

class Demo extends Component{
    render(){
        return (
            <div>
                <h2>demo -demo - demo </h2>
            </div>
        )
    }
}

class Menu extends Component{
    render(){
        return (
            <div>
                <h2>Menu - Menu -菜单组件.... </h2>
            </div>
        )
    }
}

// ReactDOM.render(
//     <Content/>,
//     document.getElementById("app")
// )

// render(虚拟DOM,真实DOM)   
// React.createElement()  React内部创建了一个元素  目的就是为了在react里面实现虚拟 DOM
// render(
//     <MainCpt/>,
//     document.getElementById("app")
// )


