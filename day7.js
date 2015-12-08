var fs = require('fs');
var rl = require('readline');

const TYPE_BINARY = 'binary';
const TYPE_UNARY = 'unary';
const TYPE_IDENTITY = 'identity';

var actions = [];
var wires = {};

var rd = rl.createInterface({
    input: fs.createReadStream('day7input.txt')
});

rd.on('line', function (line) {
    var sides = line.split(" -> ");
    var lhs = sides[0];
    var rhs = sides[1];

    var action = {};

    action.node = getNode(lhs);
    action.nodeDestination = rhs;

    var key = null;
    if(!wires.hasOwnProperty(action.nodeDestination)) {
        key = action.nodeDestination;
        wires[key] = 0;
    }

    if(action.node.lhs !== null && isNaN(action.node.lhs) && !wires.hasOwnProperty(action.node.lhs)) {
        key = action.node.lhs;
        wires[key] = 0;
    }

    if(action.node.rhs !== null && isNaN(action.node.rhs) && !wires.hasOwnProperty(action.node.rhs)) {
        key = action.node.rhs;
        wires[key] = 0;
    }

    actions.push(action);
});

rd.on('close', function () {
    console.log(wires);
});

function getNode(lhs) {
    var parts = lhs.split(' ');
    var node = {};

    if(parts.length === 3) {
        node.lhs = parts[0];
        node.rhs = parts[2];
        node.opType = TYPE_BINARY;
        node.operator = parts[1];
    } else if(parts.length === 2) {
        node.lhs = parts[1];
        node.rhs = null;
        node.opType = TYPE_UNARY;
        node.operator = parts[0];
    } else if(parts.length === 1) {
        node.lhs = parts[0];
        node.rhs = null;
        node.opType = TYPE_IDENTITY;
        node.operator = null;
    }

    return node;
}

function parse(action) {

}