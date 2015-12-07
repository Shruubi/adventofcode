var fs = require('fs');
var rl = require('readline');

var instructions = [];
var grid = [];
var X_MAX = 1000;
var Y_MAX = 1000;

for(var i = 0; i < Y_MAX; i++) {
    grid.push([]);
    for(var j = 0; j < X_MAX; j++) {
        grid[i].push(0);
    }
}

var rd = rl.createInterface({
    input: fs.createReadStream('day6input.txt')
});

rd.on('line', function (line) {
    var parts = line.split(' ');
    var instruction = {};
    var coordsA, coordsB;

    if(parts[0] === 'turn') {
        instruction.op = parts[1];
        coordsA = parts[2];
        coordsB = parts[4];
    } else {
        instruction.op = 'toggle';
        coordsA = parts[1];
        coordsB = parts[3];
    }

    var splitA = coordsA.split(',');
    var splitB = coordsB.split(',');

    instruction.bottomLeft = {
        x: parseInt(splitA[0]),
        y: parseInt(splitA[1])
    };

    instruction.topRight = {
        x: parseInt(splitB[0]),
        y: parseInt(splitB[1])
    };

    instructions.push(instruction);
});

rd.on('close', function () {
    runInterpreter();
});

function runInterpreter () {
    instructions.forEach(function (instruction) {
        var op = null;
        switch(instruction.op) {
            case "toggle":
                op = toggle;
                break;
            case "on":
                op = switchOn;
                break;
            case "off":
                op = switchOff;
                break;
            default:
                break;
        }

        performOperationAcross(op, 
            instruction.bottomLeft.x, 
            instruction.bottomLeft.y,
            instruction.topRight.x,
            instruction.topRight.y
        );
    });

    console.log(countSwitchedOn());
}

function toggle(y, x) {
    var nextVal = grid[y][x] + 2;
    grid[y][x] = nextVal;
}

function switchOn(y, x) {
    var nextVal = grid[y][x] + 1;
    grid[y][x] = nextVal;
}

function switchOff(y, x) {
    var nextVal = grid[y][x] - 1;
    grid[y][x] = nextVal;
    if(grid[y][x] < 0) {
        grid[y][x] = 0;
    }
}

function performOperationAcross(op, x1, y1, x2, y2) {
    for(var i = y1; i <= y2; i++)
        for(var j = x1; j <= x2; j++)
            op(i, j);
}

function countSwitchedOn() {
    var counter = 0;
    for(var i = 0; i < Y_MAX; i++)
        for(var j = 0; j < Y_MAX; j++) {
            var val = grid[i][j];
            counter += val;
        }

    return counter;
}












