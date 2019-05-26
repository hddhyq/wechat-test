var http = require("http");
var API = require("wechat-api");
var config = require("./config");
var api = new API(config.appid, config.appsecret);
var express = require("express");
var app = express();
var wechat = require("wechat");

var OAuth = require("wechat-oauth");
var client = new OAuth(config.appid, config.appsecret);

app.use(express.query());
// app.use(express.static("views"));

// 回复消息
app.use(
  "/",
  wechat(config, function(req, res, next) {
    var message = req.weixin;
    console.log(message);
    res.reply("hello");
  })
);

/*
 * 响应微信测试服务器的连接验证
 **/
app.get("/", function(req, res, next) {
  var auth_callback_url = config.domain + "/oauth/callback";
  var url = client.getAuthorizeURL(auth_callback_url, "", "snsapi_userinfo");
  console.log(url);
  // 重定向请求到微信服务器
  res.redirect(url);
});

app.get("/oauth/callback", function(req, res, next) {
  var code = req.query.code;
  client.getAccessToken(code, function(err, result) {
    console.log(result);
    var accessToken = result.data.access_token;
    var openid = result.data.openid;

    client.getUser(openid, function(err, result) {
      var userInfo = result;
      // save or other opration
      res.json(userInfo);
    });
  });
});

/*
 * 测试获取token命令
 **/
// app.get("/get_token", function(req, res) {
//   api.getLatestToken(function(err, token) {
//     res.send(token);
//   });
// });

// 需要oauth的网页
// app.get("/views/*.html", function(req, res, next) {
//   var auth_callback_url = config.domain + "/oauth/callback";
//   var url = client.getAuthorizeURL(auth_callback_url, "", "snsapi_userinfo");
//   console.log(url);
//   // 重定向请求到微信服务器
//   res.redirect(url);
//   // 传入 code
//   client.getAccessToken("code", function(err, result) {
//     var accessToken = result.data.access_token;
//     var openid = result.data.openid;
//   });
//   // 获取用户信息
//   client.getUser(openid, function(err, result) {
//     var userInfo = result;
//   });
// });

// 创建菜单
api.createMenu(config.menu, function(err, result) {
  console.log(result);
});

app.listen(80);
console.log("Server running at http://127.0.0.1:80/");
