var fs = require('fs');
var rl = require('readline');

var collection = [];
var total = 0;

var rd = rl.createInterface({
    input: fs.createReadStream('input.txt')
});

rd.on('line', function (line) {
    var parts = line.split('x');
    var obj = {
        'l': parts[0],
        'w': parts[1],
        'h': parts[2]
    };
    collection.push(obj);
});

rd.on('close', function () {
    collection.map(function (val, i, arr) {
        total += calcRequiredTwo(val.l, val.w, val.h);
    });

    console.log(total);
});

function calcRequired(length, width, height) {
    var sideA = length * width;
    var sideB = width * height;
    var sideC = height * length;

    var min = Math.min(sideA, sideB, sideC);

    var tmp = 2 * sideA + 2 * sideB + 2 * sideC;
    return tmp + min;
}

function calcRequiredTwo(length, width, height) {
    var minA = Math.min(length, width, height);
    var minB = -1;
    
    if(minA == length) {
        minB = Math.min(width, height);
    } else if(minA == width) {
        minB = Math.min(length, height);
    } else {
        minB = Math.min(length, width);
    }


    var bow = length * width * height;
    var other = minA + minA + minB + minB;
    return bow + other;
}