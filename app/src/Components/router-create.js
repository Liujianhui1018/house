import React,{useState} from 'react';
import {Button,Input} from 'antd';
// import {render}  from 'react-dom';


const Inputs= function(props) {
    const [name,setName] = useState('');
    const [content,setContent] = useState('');
    const [url,setUrl] = useState('');
    const [source,setSource] = useState('');
    const [type,setType] = useState('');

    //提交
    const click = () => {
        if(name&&content&&url&&source&&type){
            const data = {name,content,url,source,type}
            fetch ('http://localhost:8070/add',{
                method:'POST',
                body:JSON.stringify(data),
            })
            props.history.replace('/');
        }else{
            alert('当前输入值不能为空')
        }
    }

    //取消创建返回根目录
    const cancel = () => {
        props.history.replace('/');
    }

    return (
        <div style={{marginLeft:'auto',marginRight:'auto',width:"300px"}}>
            <Input style={{width:250,marginTop:'30px'}} placeholder="名称" onChange={(e) => {setName(e.target.value)} }/>
            <Input style={{width:250,marginTop:'30px'}} placeholder="简介" onChange={(e) => {setContent(e.target.value)}}/>
            <Input style={{width:250,marginTop:'30px'}} placeholder="网址" onChange={(e) => {setUrl(e.target.value)}}/>
            <Input style={{width:250,marginTop:'30px'}} placeholder="资源" onChange={(e) => {setSource(e.target.value)}}/>
            <Input style={{width:250,marginTop:'30px'}} placeholder="类型" onChange={(e) => {setType(e.target.value)}}/>
            <div>    
                <Button style={{marginTop:'30px',marginLeft:'35px'}} onClick={click} type='primary'>提交</Button>
                <Button style={{marginTop:'30px',marginLeft:'90px',}} onClick={cancel} type='Normal'>取消</Button>
            </div> 
        </div>
    )
}
export default Inputs;