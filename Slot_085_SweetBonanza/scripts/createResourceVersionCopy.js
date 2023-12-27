var fs = require('fs');
var SVN = require("node.svn");
var EventEmitter = require('events').EventEmitter;
var fileUtils = require("./libs/fileUtils.js");
var fileFilter = require("./createResourceVersionFilter.js");

var config = {
    "cwd" : process.cwd()+"/../",
    "username" : "shellyhbg",
    "password" : "k415263k"
};

var exportFile = config.cwd + "resource/resource_version.json";
var singleExportNum = 100;

var jsonpatharr = [config.cwd + "resource/default.res.json"];
var jsonpathcopyarr = [config.cwd + "resource/default.rescoppy.json"];

//提供了写多个资源json文件的方式，jsonpatharr 和 jsonpathcopyarr对应好就行。
//var jsonpatharr = [config.cwd + "resource/resource.json",config.cwd + "resource/assetresourece.json",config.cwd + "resource/iconsourece.json"];
//var jsonpathcopyarr = [config.cwd + "resource/resourcecopy.json",config.cwd + "resource/assetresourececopy.json",config.cwd + "resource/iconsourececopy.json"];


var svn = new SVN(config);
var ee = new EventEmitter();
var dataarr = [];

var allFiles = [];
var obj = {};
var dirNum = 0;
var dirNum_complate = 0;
function foreachAllFiles(root) {
    dirNum++;
    fs.readdir(root, function(err, files){
        if(err || files.length == 0){
            ee.emit("fileForeachComplate");
            return;
        }

        for(var i = 0, len = files.length; i<len; i++){
            var file = files[i];
            if(file.indexOf(".DS_Store") != -1 || file.indexOf(".svn") != -1){
                continue;
            }

            var filePath = root + "/" + file;
            var exportFilePath = filePath.replace(config.cwd, "");

            if(fileFilter.filterConfig.indexOf(exportFilePath) == -1){
                if(!fileUtils.isDirectory(filePath)) {
                    allFiles.push(filePath);
                }else{
                    foreachAllFiles(filePath);
                }
            }
        }
		ee.emit("fileForeachComplate");
    });
}

loadNum = 0;
function getJsonData()
{
	var len = jsonpatharr.length;
	//console.log(jsonpatharr.length);
	//读取文件: default.res.json
	fs.readFile(jsonpatharr[loadNum], 'utf8', function (err, data) {
	   if (err) throw err;
	   dataarr[loadNum] = data;
	   loadNum ++;
	   //console.log(data);
	   if(loadNum == len)
		{
			foreachAllFiles(config.cwd + "resource");
		}else{
			getJsonData();
		}
	});
}

function writeJosnData()
{
	var len = jsonpathcopyarr.length;
	var data;
	for(var i = 0; i < len; i ++){
		data = dataarr[i];
		fs.writeFile(jsonpathcopyarr[i], data, function (err) {
			if (err) throw err;
			//console.log(jsonpathcopyarr[i] + data + ' It\'s saved!'); //文件被保存
		});
	}
}

function getFileVersion(){
    var dealFiles = allFiles.splice(0, singleExportNum);
    var fileNum = dealFiles.length;
    var fileNumComplate = 0;
    dealFiles.forEach(function(filePath){

		var path = filePath.replace(config.cwd + "resource/", "");
		
		//修改时间版本号start
		//文件最后一次修改的时间戳做为版本号
		var curpath = fs.statSync(filePath);
		var timenum = new Date(curpath.mtime).getTime();
		//console.log(path,timenum);
		changePathVer(path,timenum);
		fileNumComplate++;
			if(fileNumComplate >= fileNum){
				if(allFiles.length == 0){
					 saveConfigFile();
				}else{
					 setTimeout(getFileVersion, 100);
			}
		}
		//修改时间版本号end

		//svn版本号start
        // svn.info(filePath, function (err, info) {
			// console.log(path);
            // if(err == null){
                // console.log(path, info.lastchangedrev);
				// changePathVer(path,info.lastchangedrev);
            // }else{
                // console.log(err);
            // }
            // fileNumComplate++;
            // if(fileNumComplate >= fileNum){
                // if(allFiles.length == 0){
                    // saveConfigFile();
                // }else{
                    // setTimeout(getFileVersion, 100);
                // }
            // }
        // });
		//svn版本号end
    });
}

function changePathVer(path,ver)
{
	var len = jsonpatharr.length;
	var data;
	console.log(path, path.indexOf("gamesetting.txt"));
	for(var i = 0; i < len; i ++){
		data = dataarr[i];
		if (path.indexOf("gamesetting.txt") != -1 || path.indexOf("Bg_H.jpg") != -1 || path.indexOf("Bg_V.jpg") != -1){
			var d = new Date();
			data = data.toString().replace(path,path + "?v=" + d.getFullYear() + (d.getMonth()+1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds());
		}
		else{
			//console.log(path + "?v=" + ver);
			data = data.toString().replace(path,path + "?v=" + ver);
		}
		dataarr[i] = data;
	}
}

function saveConfigFile(){
    //fileUtils.save(exportFile, JSON.stringify(obj));
	writeJosnData();
	console.log("生成成功");//, exportFile);
}

ee.on("fileForeachComplate", function() {
    dirNum_complate++;
    if(dirNum_complate >= dirNum){
        getFileVersion();
    }
});

getJsonData();

//foreachAllFiles(config.cwd + "resource");

console.log("生成中，请稍等。。。");



