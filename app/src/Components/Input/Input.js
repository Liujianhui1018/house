import React from 'react';
import { Input,Button } from 'antd';

const { Search } = Input;

class Myinput extends React.Component{
    constructor(){
        super();
        this.state =({
            value: '',
        })
        this.onSearch = this.onSearch.bind(this);
        this.handResets = this.handResets.bind(this);
        this.handChange = this.handChange.bind(this);
    }

    
    onSearch(value ){
        this.props.handSearch(value);
    }

    //重置
    handResets(){
        this.props.handReset();
        this.setState({
            value: '',
        });
    }
    handChange(e){
        this.setState({
            value: e.target.value,
        });
    }

    render(){
        return (
            <div >
                <Search
                placeholder="输入搜索词"
                enterButton="搜索"
                size="large"
                onSearch={value => this.onSearch(value) }
                value = {this.state.value}
                onChange={e => this.handChange(e)}
                style={{marginLeft:'600px',width:'400px',marginRight:'15px',marginTop:'5px'}}
                />
                <Button onClick={this.handResets} size='large' type='Normal' style={{marginTop:'5px'}}>重置</Button>
            </div>
        )
    }
}
export default Myinput;