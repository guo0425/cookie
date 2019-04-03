var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/getdata', function(req, res, next) {
    let { kw } = req.query;
    console.log(kw)
    if (!kw) {
        return res.send({ code: 2, msg: "参数错误" })
    }
    mongo.find('H5', 'cook', { name: new RegExp(kw) }, function(rs) {
        if (!rs) {
            res.send({ code: 0, msg: "没有查找到相关的内容" })
        } else {
            res.send({ code: 1, data: rs })
        }
    })
});
module.exports = router;