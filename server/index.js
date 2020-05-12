const express = require('express')
const moment = require('moment')
const mongoose = require('mongoose')
var multer = require('multer');
var path = require("path")
var url = require('url')
var fs = require("fs");
const DB_URL = 'mongodb://127.0.0.1:27017/haha'
var bodyParser = require('body-parser');


let personal = require('./personal')
// const uploadImg = require('./img')
// 连接数据库
mongoose.connect(DB_URL, { useNewUrlParser: true ,useUnifiedTopology:true })
//用户表
const User = mongoose.model('user', new mongoose.Schema({
    phone: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})
)
const Customer = mongoose.model('customer', new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
})
)

//房子列表 表
const House_list = mongoose.model('house_list', new mongoose.Schema({
    price: { type: String, required: true },
    univalence: { type: String, required: true },
    area: { type: String, required: true },
    rate: { type: String, required: true },
    acreage: { type: String, required: true },
    floor: { type: String, required: true },
    tower_age: { type: String, required: true },
    decoration: { type: String, required: true },
    purpose: { type: String, required: true },
    ownership: { type: String, required: true },
    orientation: { type: String, required: true },
    img_url: { type: String, required: true },
    title_name: { type: String, required: true },
    creat_time: { type: Number, required: true , default:moment().unix() },
}))


//新建app
const app = express()
// app.use(express.static("../src/static"))
app.use(express.static(path.join(__dirname, '/../src/static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/',personal);
async function getPostData(req) {
    let postData = '';
    await req.on('data', function (postDataChunk) {
        postData += postDataChunk;
    })
    return postData
}



var upload = multer({ dest: path.join(__dirname, '/../src/static/house_img/') }) // 文件储存路径
// var upload = multer({ dest: path.join(__dirname, '/../../img/') }) // 文件储存路径

app.post('/uploader', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    const newname = req.file.path + path.parse(req.file.originalname).ext
    fs.rename(req.file.path, newname, function (err) {
        if (err) {
            res.send({ code: 400, message: '上传失败' })
        } else {
            res.send({ code: 200, url: req.file.filename + path.parse(req.file.originalname).ext })
        }
    })
});




app.post('/file_upload', function (req, res) {
    fs.readFile('./2.jpg', (err, data) => {
        console.log('err', err, ' data', data.toString())
    })
})

// 注册接口
app.post('/register', (req, res) => {
    if (req.method == 'POST') {
        User.findOne({ 'phone': req.body.phone }, (err, data) => {
            if (data == null) {
                User.create({
                    'phone': req.body.phone,
                    'password': req.body.password,
                    'name': req.body.name,
                }, (err, doc) => {
                    if (err) {
                        res.send({ code: 400, 'message': '注册失败' })
                    } else {
                        res.send({ code: 200, 'message': '注册成功' })
                    }
                })
            } else {
                res.send({ code: 400, 'message': '手机号冲突，注册失败' })
            }
        })
    }
})
//登陆接口
app.post('/login', (req, res) => {
    if (req.method == 'POST') {
        User.findOne({ 'phone': req.body.phone }, (err, data) => {
            if (data == null) {
                res.send({ code: 300, 'message': '该手机号还未注册，请先注册' });
            } else if (data) {
                if (req.body.password == data.password) {
                    res.json({ code: 200, 'message': '登陆成功', ...data._doc });
                } else {
                    res.send({ code: 400, 'message': '账号密码错误' });
                }
            }
            if (err) {
                console.log(err)
            }
        })
    }
})
//登陆接口

app.get('/loadinfo', (req, res) => {
    var arg = url.parse(req.url, true).query
    if (arg.phone) {
        User.findOne({ phone: arg.phone }, (err, data) => {
            if (!err) {
                res.json({ code: 200, ...data._doc })
            }
        })
    }

})

//
app.put('/personal/information/:id', (req, res) => {
    User.findOne({ '_id': req.params.id }, (err, data) => {
        User.updateOne({ '_id': req.params.id }, { $set: { ...JSON.parse(req.body) } }, (err, doc) => {
            console.log(err, doc)
            if (!err) {
                User.findOne({ '_id': req.params.id }, (err, data) => {
                    res.json({ code: 200, 'message': '成功', ...data._doc });
                })
            } else {
                res.json({ code: 400, 'message': '失败' });
            }
        })
    })
})

app.get('/', (req, res) => {
    res.send('hello node.js')
})
app.get('/add', (req, res) => {
    User.create({
        name: '小明67',
        age: 22
    }, (err, doc) => {
        if (!err) {
            console.log('增加成功')
        } else {
            console.log(err)
        }
    })
})
app.get('/delete', (req, res) => {
    User.remove({ age: 26 }, (err, data) => {
        console.log(data)
        return res.send(data)
    })
})
app.get('/update', (req, res) => {
    User.update({ age: 30 }, { '$set': { age: 25 } }, (err, data) => {
        return res.send(data)
    })
})
app.post('/register', (req, res) => {
    if (req.method == 'POST') {
        var postData = "";
        // 数据块接收中
        req.on('data', function (postDataChunk) {
            postData += postDataChunk;
        });
        req.on("end", function () {
            Customer.create({ name: JSON.parse(postData).name, password: JSON.parse(postData).password }, (err, doc) => {
                if (!err) {
                    res.send({})
                }
            })
        });
    }

})
async function getData(req ,res , Schema ){
    let allObj = url.parse(req.url, true).query
    var offset = Number(url.parse(req.url, true).query.offset)
    let obj = {}, totals = 0 , result={};
    for (let item in allObj) {
        if (item != 'offset' && item != 'limit') {
            obj[item] = url.parse(req.url, true).query[item]
        }
    }
    await Schema.aggregate([
        { $match: { ...obj } },
        { $group: { _id: null, 'total': { $sum: 1 } } },
    ]).exec((err, values) => {
        if (!err) {
            totals = values && values.length > 0 ? values[0].total : 0
        } else {
            totals = 0
        }
    })
    result = await Schema.aggregate([
        { $match: { ...obj } },
        { $skip: offset },
        { $limit: 10 },
    ])
    return await  new Promise((resolve, reject)=>{
       resolve({data:result , totals: totals , code:200 })
       reject({data:[] , totals: 0 , code:400 })
    })
}

app.get('/house_list', (req, res) => {
  getData(req, res ,House_list ).then(data=>{
      res.send(data)
  })
})
app.post('/house_list/creat', (req, res) => {
    House_list.create(req.body, (err , doc)=>{
        console.log(err , doc)
        if(!err){
            res.send({code:200,message:'添加成功'})
        }
    })
})

//==================个人信息开始===========================================================

// app.get('/personal_details', (req, res) => {
//     console.log(req.body , req.header , req.headers)
//     // House_list.create(req.body, (err , doc)=>{
//     //     console.log(err , doc)
//     //     if(!err){
//     //         res.send({code:200,message:'添加成功'})
//     //     }
//     // })
// })



















//================个人信息结束=============================================================

//监听事件 及 监听端口
app.listen(8888, (err) => {
    if (!err) {
        console.info('listen to 8888')
    }
})