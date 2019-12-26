const app  = require("express")();
const mysql = require("mysql");

//连接数据库的配置信息
const connection = mysql.createConnection({
    connectionLimit:10,
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123465',
    database:"react_table1"
})

//连接数据库
connection.connect();

//查询
app.get("/select",(req,res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");

    var sql = 'SELECT * FROM react_table';
    let str = "";
        
    connection.query(sql,function(err,result){
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            return;
        }
        //str是查询的表的数据结果
        str = JSON.stringify(result)
        res.send(str);  
    })
})

// 增加
let data1 ='';
let data2 = '';
app.post ('/add',(req,res)=>{
    //data数据通过add方法的body中传过来
    req.on("data",(data)=>{
        //data数据是buffer格式，需转成字符串格式
        data2 = data.toString()
        data1 = JSON.parse(data2)

        //sql增加数据语句
        let  addSql = 'INSERT INTO react_table(`name`,`content`,`url`,`source`,`type`) VALUES(?,?,?,?,?)';
        let  addSqlParams = [data1.name, data1.content, data1.url, data1.source, data1.type];

        //sql增加数据
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }        
            console.log('数据插入成功！')
        });
    })
    res.setHeader("Access-Control-Allow-Origin", "*");
})

//删除
app.post ('/delete',(req,res)=>{
    req.on('data',(data)=>{
        let data2 = data.toString()
        let data1 = JSON.parse(data2)

        let delSql = 'DELETE FROM react_table where _id='+`${data1}`
        connection.query(delSql, (err, result) => {
            if (err) {
              console.log('[删除失败] - ', err.message);
              return;
            }           
            console.log('id' +'<' +  data1 +'>'+ '删除成功');
          });
    })
})

//修改
app.post ('/edit',(req,res)=>{
    req.on('data',(data)=>{
        let data2 = data.toString()
        let data1 = JSON.parse(data2)
        let editSql = `UPDATE react_table SET name='${data1.name}' , content='${data1.content}',url='${data1.url}',source='${data1.source}',type='${data1.type}' WHERE _id = ${data1.id}`
        connection.query(editSql,(err, result) => {
            if (err) {
              console.log('[数据修改失败] - ', err.message);
              return;
            }
            console.log("数据修改成功!")
          });
    })
})

//搜索
let data3 = '';
let data4 = '';

app.post('/search',(req,res)=>{
    new Promise((resolve)=>{
        req.on('data',(data)=>{
            data3 = data.toString()
            data4 = JSON.parse(data3)

            const selectSql = `SELECT * FROM  react_table where name like '%${data4}%'`;
            //查询人名
            connection.query(selectSql, function (err, result) {
                if(err) {
                    console.log('[SELECT ERROR]', err.message);
                    return;
                }
                console.log('查询成功')
                resolve (result);
            });
        })
    })
    .then((result)=>{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(result);
    })
})
app.listen(8070,function(){
    console.log("连接端口:8070")});