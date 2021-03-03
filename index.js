
var http = require('http');  //http的模块;
var url = require('url');    //url模块;
var fs = require('fs');      //fs模块;
var querystring = require('querystring');  
http.createServer(function (req,res) {  
  console.log('req.url:',req.url); 
  var pathname = url.parse(req.url).pathname; 
 
  if(pathname =='/')
  {
     fs.readFile('main.html',function (err,data) {
         res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
         res.end(data);
     });    
  } else if(pathname == '/post' && req.method == 'POST')
  {
      console.log('解析数据');
      var data ='';
      req.on('data',function (chunk) {
          data+=chunk;
          console.log(data);
      }).on('end',function () {
         var tt = querystring.parse(data); 
         console.log(tt);
         fs.writeFile('hello.json',JSON.stringify(tt),'utf8',function (err) {
            if(err){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    return  res.end('failed regerster')
            } else {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    return  res.end('reger success')
            }
         });  
      })
  } else if(pathname == '/login' && req.method == 'GET')   
  {
      fs.readFile('login.html',function (err,data) {
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          res.end(data);
      });  
  } else if(pathname == '/login' && req.method == 'POST')
  {
      fs.readFile('hello.json',function (err,data) { 
  
         data = JSON.parse(data.toString());
         console.log('read',data);
         var temp ='';
         req.on('data',function (chunk){
             temp +=chunk;
         }).on('end',function () {
             var login= querystring.parse(temp);
             if(login.username == data.username && login.password == data.password)
             {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end('login ');
             }else{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end('failed login');
             }
         })
 
    })
  }
}).listen(3000,function () {
  console.log('server on 3000');
});
