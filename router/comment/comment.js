var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');


/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'middlenote'        //데이터베이스 이름
});
connection.connect();       //mysql 연동






router.post('/create', function(req, res){ //댓글 작성


  var commentData=req.body;
  var userId="'"+commentData.userId+"'";
  var commentContent="'"+commentData.commentContent+"'";
  var productId="'"+commentData.productId+"'";


  var sql=`INSERT INTO comment(userId, productId, commentContent)
  VALUES(${userId}, ${productId}, ${commentContent})`;   //댓글 입력하는 쿼리

  connection.query(sql, function(err, data){
    if(err) throw err;
    else{
      return res.redirect(`/product/detail/${commentData.productId}`);
    }
  })


})


router.post('/delete',function(req,res){    //댓글 삭제
  var productId=req.body.productId;
 
  var commentId="'"+req.body.commentId+"'";



  var sql=`DELETE FROM comment 
  WHERE commentId=${commentId}`;

  connection.query(sql, function(err, data){
    if(err) throw err;
    else{
      return res.redirect(`/product/detail/${productId}`);
    }
  })
})

router.post('/edit/:commentId',function(req,res){ //댓글 수정 페이지로 넘어가기

  var commentId=req.params.commentId;

  var sql=`SELECT *
  FROM comment
  WHERE commentId=${commentId}`;

  connection.query(sql, function(err, data){
    if(err) throw err;
    else{
      res.render('comment_edit', {comment: data});
    }
  })


})

router.post('/edit',function(req,res){  //댓글 수정
    var commentId="'"+req.body.commentId+"'";
    var commentContent="'"+req.body.commentContent+"'";
    var productId=req.body.productId;

    var sql=`UPDATE comment SET commentContent=${commentContent}
    WHERE commentId=${commentId}`;

    connection.query(sql,function(err, data){
      if(err) throw err;
      else{
        return res.redirect(`/product/detail/${productId}`);
      }
    })
})


router.post('/search', function(req,res){
  console.log(req.body)
  res.sendFile(path.join(__dirname, '../../html/index.html'));
  console.log("hey");
})



module.exports = router;