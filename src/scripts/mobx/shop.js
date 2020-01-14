import {observable, action, computed, autorun} from  "mobx"
import {axios} from "&"



class Shop {

    @observable userinfo = {}

    @action getuserinfo = async (url,token )  => {
        const res = await axios.post(url,{
            token,
        });
        if(res.data.code=='1'){
            this.userinfo = res.data.data[0] ;
        } 
    }
    @action changeuserinfo = payload=>{
        this.userinfo = payload;
    }





}

export default new Shop()