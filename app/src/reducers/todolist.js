import {FETCH,DELETE,SEARCH,RESET,ISEDITING,CANCEL,SAVE,EDIT} from '../actionType/actionType';

//初始化数据
const initstate = {
    data:'',
}

//最终的数据处理结果
export const todolist = (state=initstate,action) => {
    switch(action.type){

        //获取页面数据
        case FETCH :
            return {
                ...state,
                data: action.payload,
            }

        //删除
        case DELETE :
            return {
                ...state,
                data:action.payload,
            }

        //根据人名搜索
        case SEARCH : 
            return {
                ...state,
                data: action.payload,
            }

        //重置
        case RESET :
            return {
                ...state,
                data: action.payload,
            }





        //编辑开关
        case EDIT :
            return {
                ...state,
                data:action.payload,
            }    
        //编辑进行中
        case ISEDITING :
            return {
                ...state,
                data: action.payload,
            }
        //修改之取消
        case CANCEL :
            return {
                ...state,
                data: action.payload,
            }   
        //修改之保存
        case SAVE :
            return {
                ...state,
                data:action.payload,
            }    
                       













        default:
            return state;
            
    }
}
