// 
//
// var express = require('express')
// var path = require('path')
// var serveStatic = require('serve-static')
// var touch = require('touch')
// var app = express()
// var listener = process.env.PORT || 8000
//
// app.use(serveStatic(path.join(__dirname, 'dist')))
//
// app.get('*',function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
//
//
// app.listen(listener)
//
// console.log('server started ' + listener)
// touch('/tmp/app-initialized')
// console.log('nginx notified to start traffic.')

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
