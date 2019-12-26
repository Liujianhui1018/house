import React, {Component} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Spin, Button,} from 'antd';
import 'antd/dist/antd.css';
import CollectionCreateForm from '../Create/Create'
import Myinput from '../Input/Input'; 
import store from '../../store/store';
// import {createFetchAction,deleteAction,SearchAction,ResetAction,EditAction} from '../../action/action';
import {connect} from 'react-redux';
import {
  // BrowserRouter,
  Route,
  // Link,
  // NavLink,
  // Redirect,
  // Switch,
  // withRouter
} from 'react-router-dom';

//把todolist从state中解构出来
let mapSetstateToProps = (state) => {
  return {
    todolist : state.todolist,
  }
}

// let mapDisPatchToprops = (dispatch) => {
//   return {
//     fetch:(res)=>{
//       dispatch(createFetchAction(res))
//     },
//     delete:(_id)=>{
//       dispatch(deleteAction(_id))
//     },
//     search:(name)=>{
//       dispatch(SearchAction(name))
//     },
//     reset:()=>{
//       dispatch(ResetAction())
//     },
//     edit:(_id)=>{
//       dispatch(EditAction(_id))
//     },
//     isEditing:(_id)=>{
//       dispatch(EditAction(_id))
//     },
//   }
// }


const EditableContext = React.createContext();


//修改类
class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(this.getInput())}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    render() {
      return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

//主组件
@connect(mapSetstateToProps)
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editingKey: '',
      visible: false, 
      loading: false,
      dataSource: '',
      list:'',
    };

    //订阅store,监听listening，来设置数据状态
    store.subscribe(this.listening);
    let data = this.props.todolist.data;

    this.handSearch = this.handSearch.bind(this)
    this.handReset = this.handReset.bind(this)


    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '简介',
        dataIndex: 'content',
        editable: true,
      },
      {
        title: '网址',
        dataIndex: 'url',
        editable: true,
      },
      {
        title: '资源',
        dataIndex: 'source',
        editable: true,
      },
      {
        title: '类型',
        dataIndex: 'type',
        editable: true,
      },
      {
        title: '时间',
        dataIndex: 'time',
        editable: true,
      },
      {
        title: '修改',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a 
                    onClick={() => this.save(form, record._id)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消" onConfirm={() => this.cancel(record._id)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record._id)} >
              修改
            </a>
          );
        },
      },
      {
        title: '删除',
        dataIndex: 'delete',

        render: (text, record) =>
          data.length >= 0 ? (
            <Popconfirm title="确定删除" onConfirm={() =>this.deletadata(record._id)}>
              <a href='/'>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
  }

  //改变数据状态方法
  listening = () => {
    this.setState ({
      data:store.getState().todolist.data,
    }) 
  }

  // 删除方法
  deletadata=(_id)=>{
    this.props.dispatch({type:'del',payload:_id })
    this.props.dispatch({type:'selects' })
  }

  //编辑组件四方法
  isEditing = record => record._id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, _id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      row.id=_id
      fetch ('http://localhost:8070/edit',{
        method:'POST',
        body:JSON.stringify(row) 
      })  
    });
    //修改提交后再次查询
    this.props.dispatch({type:'selects' })
    this.setState({ editingKey: "" });
  }

  edit(_id) {
    this.setState({ editingKey: _id });
  }

  
  handleCancel = () => {
    this.setState({ visible: false });
  };

  //添加方法
  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //执行增加
      this.props.dispatch({type:'add' })
      //增加完成后再次查询
      this.props.dispatch({type:'selects' })
      //清空表单数据
      form.resetFields();
      //关闭框
      this.setState({ 
        visible: false 
      });
    });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //搜索方法
  handSearch(value){
    this.props.dispatch({type:'searchs',payload:value })
  }

  //重置方法
  handReset=()=>{
    this.props.dispatch({type:'selects' })
  }

  //生命周期加载后
  componentDidMount(){
    this.props.dispatch({type:'selects' })
  }


  render() {
    let data = this.props.todolist.data;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div>
        { data
          ?<div>
              <Myinput handSearch={this.handSearch} handReset={this.handReset} style={{marginTop:100}}></Myinput>
              {/* 创建 */}
              <Route to="/adddata" component={creates}></Route>

              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
              <EditableContext.Provider value={this.props.form}>
                <Table
                  components={components}
                  bordered
                  dataSource={data}
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: this.cancel,
                  }}
                  rowKey={(data)=>data.key}
                />
              </EditableContext.Provider>
            </div>
          : <Spin style={{marginLeft:'900px',marginTop:'200px'}} tip="加载中..." size='large'/>
        }
      </div>
      
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

const creates = (props) => {
  const click=()=>{
    props.history.replace('/adddata');
  }
  return(
    <Button type='primary' onClick={click}>创建</Button>
  )
}


class Mytable extends Component{ 
    render(){
        return <EditableFormTable />
    }
}

export default Mytable;