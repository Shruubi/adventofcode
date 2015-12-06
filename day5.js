var fs = require('fs');
var rl = require('readline');

var lines = [];
var counter = 0;

var rd = rl.createInterface({
    input: fs.createReadStream('day5input.txt')
});

rd.on('line', function (line) {
    lines.push(line);
});

rd.on('close', function () {
    lines.forEach(parseLineTwo);
    console.log(counter);
});

function parseLine(line) {
    var matchDoubleChar = /(.)\1/;
    var vowelMatcher = /[aeiou]/g;
    var cannotContain = ['ab', 'cd', 'pq', 'xy'];
    var contains = false;

    if(matchDoubleChar.test(line)) {
        var matches = line.match(vowelMatcher);
        if(matches !== null && matches.length > 2) {
            for(var i = 0; i < cannotContain.length; i++) {
                var str = cannotContain[i];
                if (line.indexOf(str) > -1) {
                    contains = true;
                }
            }

            if (contains === false) {
                counter += 1;
            }
        }
    }
}

function parseLineTwo(line) {
    var ruleA = /([a-z]{2})[a-z]*(\1)/;
    var ruleB = /([a-z]).(\1)/;

    if(ruleA.test(line) && ruleB.test(line)) {
        counter += 1;
    }
}