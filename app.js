var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/controller');
var passport = require('passport');
var localStratege = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var port = 3000;
app.listen(3000, function(){
  // console.log(`${port}포트로 서버 시작`);
  console.log('3000포트로 서버 시작');
})

app.use(express.static('html'));      //html이 static 디렉토리 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    //인코딩된 url
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,                //매 request마다 세션을 다시 저장
  saveUninitialized: true       
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);      //라우터. index.js가 모든 라우팅을 컨트롤함. 