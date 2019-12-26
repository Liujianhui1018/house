import { put, takeEvery} from 'redux-saga/effects';
// import { type } from 'os';

//查
function* selects(){
   let res =  yield fetch('http://localhost:8070/select')

    let data = yield res.json();

    for(let i in data){
        data[i].key=data[i]._id
    }

    yield put({type:'fetch',payload:data})
}

//删
function* deletes(action){
    let data = action.payload
    yield fetch('http://localhost:8070/delete',{
        method:'POST',
        body:JSON.stringify(data)
    })
    yield put({type:'delete',payload:data})
 }

 //搜索
function* searchs(action){
    let data = action.payload
    let res =  yield fetch('http://localhost:8070/search',{
        method:'POST',
        body:JSON.stringify(data)
    })

    let datas = yield res.json();
    yield put({type:'search',payload:datas})
}

//增加
function* adds(action){
    let data = action.payload
    yield fetch('http://localhost:8070/add',{
        method:'POST',
        body:JSON.stringify(data)
    })
}

function* mySaga() {
    yield takeEvery("selects", selects);
    yield takeEvery("searchs", searchs);
    yield takeEvery("add", adds);
    yield takeEvery("del", deletes);
}
  
export default mySaga;