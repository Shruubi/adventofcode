var fs = require('fs');
var rl = require('readline');

const TYPE_BINARY = 'binary';
const TYPE_UNARY = 'unary';
const TYPE_IDENTITY = 'identity';

const OP_AND = "AND";
const OP_OR = "OR";
const OP_RSHIFT = "RSHIFT";
const OP_LSHIFT = "LSHIFT";
const OP_NOT = "NOT";
const OP_STORE = "STORE";

const OPERATOR_TABLE = {
    AND: function (lhs, rhs) {
        return toUint16(lhs & rhs);
    },
    OR: function (lhs, rhs) {
        return toUint16(lhs | rhs)
    },
    RSHIFT: function (lhs, shiftAmount) {
        var val = toUint16(lhs >> shiftAmount);
        return val;
    },
    LSHIFT: function (lhs, shiftAmount) {
        var val = toUint16(lhs << shiftAmount);
        return val;
    },
    STORE: function (lhs) {
        return toUint16(lhs)
    },
    NOT: function (lhs) {
        return toUint16(~ lhs)
    }
};

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
    actions.forEach(function (action) {
        parse(action);
    });

    console.log(wires['a']);
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
        node.operator = 'STORE';
    }

    return node;
}

function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
function modulo(a, b) {
    return a - Math.floor(a/b)*b;
}
function toUint16(x) {
    return modulo(ToInteger(x), Math.pow(2, 16));
}

function parse(action) {
    var val = 0;

    var lhs = action.node.lhs;
    var rhs = action.node.rhs;
    var storeKey = action.nodeDestination;

    if(lhs !== null && isNaN(lhs) === false) {
        lhs = parseInt(lhs);
    } else {
        lhs = toUint16(wires[lhs]);
    }

    if(rhs !== null && isNaN(rhs) === false) {
        rhs = parseInt(rhs);
    } else {
        rhs = toUint16(wires[rhs]);
    }

    switch (action.node.operator) {
        case OP_AND:
            val = OPERATOR_TABLE[OP_AND](lhs, rhs);
            break;
        case OP_OR:
            val = OPERATOR_TABLE[OP_OR](lhs, rhs);
            break;
        case OP_RSHIFT:
            val = OPERATOR_TABLE[OP_RSHIFT](lhs, rhs);
            break;
        case OP_LSHIFT:
            val = OPERATOR_TABLE[OP_LSHIFT](lhs, rhs);
            break;
        case OP_NOT:
            val = OPERATOR_TABLE[OP_NOT](lhs);
            break;
        case OP_STORE:
            val = OPERATOR_TABLE[OP_STORE](lhs);
            break;
        default:
            break;
    }

    console.log(wires['a']);
    wires[storeKey] = val;
}