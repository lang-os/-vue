
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('/pubilc/'))
// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend: false}));

app.use((req, res, next) => {
    // 设置是否运行客户端设置 withCredentials
    // 即在不同域名下发出的请求也可以携带 cookie
    res.header("Access-Control-Allow-Credentials",true)
    // 第二个参数表示允许跨域的域名，* 代表所有域名  
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
    // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
    res.header('Access-Control-Allow-Headers','mytoken', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
})

app.get('/data',(req,res) => {
    res.send('1234')
})
app.get('/fdata',(req,res) => {
    res.send('1234')
})

//fetch调用
app.get('/books/',(req,res) => {
    res.send('传统URL传递参数'+req.query.id)
})
app.get('/books/:id',(req,res) => {
    res.send('Resful方式URL传递参数'+req.params.id)
})
app.delete('/books/:id',(req,res) => {
    res.send('delete请求URL传递参数'+req.params.id)
})
app.post('/books',(req,res) => {
    res.send('post请求URL传递参数'+req.body.uname+'------'+req.body.pwd)
})
app.put('/books/:id',(req,res) => {
    res.send('put请求URL传递参数'+req.params.id+'------'+req.body.uname+'------'+req.body.pwd)
})

app.get('/json',(req,res) => {
    res.json({
        uname: 'aaa',
        age: 55,
        gender: 'male'
    })
})


//axios调用

//get
app.get('/adata',(req,res) => {
    res.send('axios调用')
})
app.get('/axios',(req,res) => {
    res.send('axios调用 get传参'+req.query.name)
})
app.get('/axios/:id',(req,res) => {
    res.send('axios调用 (Restful)get传参'+req.params.id)
})

//delete
app.delete('/axios',(req,res) => {
    res.send('axios调用 delete传参'+req.query.id)
})
//post
app.post('/axios',(req,res) => {
    res.send('axios调用 post传参'+req.body.id+'----'+req.body.name)
})
//put
app.put('/axios/:id',(req,res) => {
    res.send('axios调用 post传参'+req.params.id+'===='+req.body.id+'----'+req.body.name)
})


// async测试

app.get('/asycn1',(req,res) => {
    res.send('hello')
})
app.get('/asycn2',(req,res) => {
    if(req.query.info==='hello') {
        res.send('world')
    }else{
        res.send('gun!')
    }
    res.send('hello')
})


app.listen(3000, () => {
	console.log('sever running')
})




