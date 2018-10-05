var express = require('express');
var app = new express();
var path = require('path');
var bodyParser = require('body-parser')
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static(path.join(__dirname, './')));
app.use(express.static('src'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// 登录接口
app.post('/api/login', async function(req,res) {
    var data = req.body;
    var result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(validate(data))
        }, 3000)
    })
    res.send(result)
})

function validate(data) {
    let result =  
    {
        status: 200,
        message: 'success',
        data: {
            msg: '',
            author: 'scholar',
            age: '25'
        }
    };
    if(data.username == 'admin' && data.password == '123456') {
        result.data.msg = '登录成功！'
    } else if(data.username == 'admin') {
        result.message = 'error'
        result.data.msg = '密码不正确!'
    } else {
        result.message = 'error'
        result.data.msg = '账号不存在！'
    }
    return result
}

app.listen(3030);




