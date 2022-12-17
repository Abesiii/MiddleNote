// 모든 라우터 js 파일을 컨트롤하는 컨트롤러 

var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체

var main = require('./main/main');
var join = require('./join/join');
var login = require('./login/login');
var product = require('./product/product');
var regist = require('./regist/regist');
var comment = require('./comment/comment');
var mypage = require('./mypage/mypage');
var notice= require('./notice/notice');
var admin = require('./admin/admin');



router.use('/main', main);
router.use('/join', join);
router.use('/login', login);
router.use('/product', product);
router.use('/regist', regist);
router.use('/comment', comment);
router.use('/mypage', mypage);
router.use('/notice', notice);
router.use('/admin', admin);


router.get('/', function(req, res){
  res.render('index.ejs');
})

module.exports = router;






/**
 * @swagger
 *  /product/create:
 *    post:
 *      tags:
 *      - product
 *      description: 글 작성
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: true
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 글 작성 성공
 */





