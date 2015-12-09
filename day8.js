var fs = require('fs');
var rl = require('readline');

var rd = rl.createInterface({
    input: fs.createReadStream('day8input.txt')
});

var codeLen = 0;
var strLen = 0;
var input = [];

rd.on('line', function (line) {
    codeLen += line.length;
    strLen += (eval(line)).length;
    input.push(line);
});

rd.on('close', function () {
    console.log(codeLen - strLen);
    var escLength = input.map(str => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')).reduce((memo, str) => memo + str.length + 2, 0);
    console.log(escLength - codeLen);
});