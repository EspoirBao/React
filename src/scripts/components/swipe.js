// 封装 Swiper  组件  
// 1. 引入
// 2. html 结构
// 3. 实例化   new Swiper 

export class MySwipe extends Component{

    state = {
        flag:true
    }

    render(){
        const {
            id,
            options,
            children
        } = this.props;
        console.log(children);
        return(
            <div className="swiper-container" id={id} >
                <div className="swiper-wrapper">
                    {
                        children
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        const {
            id,
            options,
            children
        } = this.props;
        if(children.length>0){
            let thisSwiper = new Swiper("#"+id,options);
        }
        
    }

    componentDidUpdate(){
        const {
            id,
            options,
            children
        } = this.props;
        if(children.length>0&&this.state.flag){
            let thisSwiper = new Swiper("#"+id,options);
            this.setState({flag:false})  // 避免多次 实例化 
        }
    }
}

// 静态属性 
MySwipe.Item = (props)=>{
    return (
        <div className="swiper-slide">
            {props.children}
        </div>
    )
}

// {
//     children.map((item,i)=>(
//         <div key={i} className="swiper-slide">
//             <img style={{width:'100%',height:300}} src={item.default} alt=""/>
//         </div>
//     ))
// }