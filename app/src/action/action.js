import { FETCH,DELETE,SEARCH,RESET,EDIT,ISEDITING,CANCEL,SAVE } from "../actionType/actionType";
import { action } from "mobx";

//获取数据
export const createFetchAction = () => {
    return {
        type : FETCH,
        payload:action.payload,
    }
}

//删除
export const deleteAction = (key) => {
    return {
        type : DELETE,
        payload:key,
    }
}

//搜索
export const SearchAction = (res) => {
    console.log(res)
    return {
        type : SEARCH,
        payload:res,
    }
}

//重置
export const ResetAction = (res) => {
    return {
        type : RESET,
        payload:res,
    }
}






//编辑开关
export const EditAction = () => {
    return {
        type : EDIT,
    }
}

//编辑进行中
export const isEditingAction = () => {
    return {
        type : ISEDITING,
    }
}

//编辑 取消
export const CancelLAction = () => {
    return {
        type : CANCEL,
    }
}

//编辑保存
export const SaveAction = () => {
    return {
        type : SAVE,
    }
}