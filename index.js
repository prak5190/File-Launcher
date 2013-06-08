var fs = require("fs") , 
	inp = process.stdin , 
	out= process.stdout;

function getInputFromUser (cb) {
	inp.resume();
	inp.on('data', function (data ) {
		console.log("\u001b[32m Input data : \u001b[0m",Number(data));				
		cb(Number(data));
		inp.pause();
	});	
}
(main=function () {
fs.readdir(__dirname, function(err, files){
	if(!err) {		
		console.log('\033[33m Files : ', files,'\033[0m');		
		console.log("Select File ");
		getInputFromUser(function (dat) {
			if ( dat < files.length ) {
				showFileStat(files , dat );
			} else {
				console.log("\u001b[31m INVALID CHOICE",'\033[0m');
			}
		});
	} else {
		console.log('\033[39m Error \033[39m' );		
	} 
});
})();
function showFileStat ( f , choice ) {
	var fname = f[choice];
	var dir = f['dir'] || __dirname ;
	var  i= 0;
	fname = dir + "/" + fname ;
	fs.stat ( fname, function(err , stat ) {
		console.log("\u001b[32mStats " ,stat,'\033[0m');
		console.log(" \u001b[31m Enter 0 to show file content ",'\033[0m');
		getInputFromUser(function(data){
			if ( data ==1 || data ==2) {
				printFileInput(fname,data);
			} else  {
				main();
			}
		});
	});
}

function printFileInput (fname , addPadding) {
	fs.readFile(fname , function (err, data)  {
		console.log(" Data ");
		console.log("\u001b[34m"+(data+"").replace(/(.*)/g , "     $1"));
	});
}
