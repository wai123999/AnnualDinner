var fs = require("fs");
var express = require('express');
var http = require('http');
var app = express();
var obj;



fs.readFile("抽獎名單.txt",{encoding:"utf-8"},function(err,data){
	//console.log(data);
	//read utf8 something error,need cut the position 0
	//data = data.slice(1);
	obj = JSON.parse(data);
	//console.log(obj);
});

app.use(express.static(__dirname+'/public'));

var httpServer = http.createServer(app);
httpServer.listen(4000,function(req,res){
		console.log('server create,listen on 4000');
});

app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('main');
});

app.get('/getstaff',function(req,res){
	 //var objStr = JSON.stringify(obj);
	 res.json(obj);
});

app.get('/win',function(req,res){
	fs.writeFile('中獎名單.txt',req.query.winnerDept +"-" + req.query.winnerName + "\r\n",{encoding:"utf-8",flag:"a+"},function(err){
		if ( err ){
			return console.log(err);
		}
  		console.log("Winner is " + req.query.winnerDept +"-" + req.query.winnerName+ " save..");
	});
	for ( var k = 0; k < obj.length ; k++)
	{
		if ( (obj[k].dept == req.query.winnerDept) && ( obj[k].name == req.query.winnerName ))
		{
						//browser重新整理也沒關係..因為obj存在server...
			       obj.splice(k,1);
		}
	}
	//console.log(obj);
	var jsonStr = JSON.stringify(obj);
	fs.writeFile('抽獎名單.txt', jsonStr , {encoding:"utf-8",flag:"w"},function(err){
		if ( err ){
			return console.log(err);
		}
		console.log("抽獎名單己更新..");
		console.log("------------")
		res.json("{sucess:true}");
	});
});
