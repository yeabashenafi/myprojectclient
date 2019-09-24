var http = require('http')
var formidable = require('formidable')
var fs = require('fs')

http.createServer(function(req,res){
    if (req.url == '/fileUpload'){
        var form = new formidable.IncomingForm()
        form.parse(req,function(err,fields,files){
            var oldPath = files.filetoupload.path;
            var newPath = 'C:/Users/Jerry'+ files.filetoupload.name;
            fs.rename(oldPath, newPath, function(err){
                if(err) throw err;
                res.write('File uploaded and moved')
                res.end();
            });
        });
    }
    else{
        res.write("hey bitch")
    }
}).listen(9000);