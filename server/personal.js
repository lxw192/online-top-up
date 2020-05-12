
const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
router = express.Router();
const DB_URL = 'mongodb://127.0.0.1:27017/haha'
var bodyParser = require('body-parser');
// 连接数据库
mongoose.connect(DB_URL, { useNewUrlParser: true ,useUnifiedTopology:true })
//personal_details
const app = express()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const personal_details = mongoose.model('personal', new mongoose.Schema())
const validate_password = mongoose.model('validate_password', new mongoose.Schema())
module.exports = (
  router.get('/personal_details', (req, res) => {
    personal_details.findOne({'sessiontoken' : req.headers.sessiontoken }, (err , data)=>{
      if (data) {
        res.send({ code: 200, ...data._doc })
    } else {
        res.send({ code: 400, 'message': '获取失败' })
    }
    })
  }),
  router.post('/validate_password', (req, res) => {
    validate_password.findOne({'pass_word' : req.body.pass_word }, (err , data)=>{
      if (data) {
        res.send({ code: 200, ...data._doc })
    } else {
        res.send({ code: 400, 'message': '密码不正确' })
    }
    })
  })
)
