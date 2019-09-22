function formatNum(num) {
    string = num.toString();
    newstring = '';
    counter = 0;
    for (let i = string.length - 1; i >= 0; i--) {
        if (counter == 3) {
            counter = 0;
            newstring = ',' + newstring;
        }
        counter += 1;
        newstring = string[i] + newstring;
    }
    return newstring;
}

function calcSouls(start, goal) {
    var total = 0;
    var levels = {};
    var level;

    for (let i = start + 1; i <= goal; i++) {
        level = values[i]; //from values.js
        levels[i] = level;
        total += level;
    }
    return { total: total, levels: levels };
}

function genOutput(div, start, goal) {
    if (start < 1) {
        start = 1;
    }
    if (goal > 715) {
        goal = 715;
    }
    var souls = calcSouls(start, goal);
    var total = souls.total;
    var levels = souls.levels;

    if (total > 0) {
        var message = '<p>To get from SL <b>' + start.toString() + '</b> to SL <b>' +
            goal.toString() + '</b>, it will take <b>' + formatNum(total) +
            '</b> Souls.</p>';

        var table = '';

        if (Object.keys(levels).length > 1) {
            table += `<hr class='output_rule'>
                    <table>
                    <thead>
                    <tr>
                        <th>Level</th>
                        <th>Souls</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>`;

            var cumulative = 0;
            for (let level in levels) {
                cumulative += levels[level];
                table += '<tr><th>' +
                    level.toString() + '</th><td>' +
                    levels[level].toString() + '</td><td>' +
                    cumulative.toString() + '</td></tr>';
            }

            table += '</tbody></table>'
        }

        div.innerHTML = message + table;
    } else {
        div.innerHTML = '';
    }
}

function clearOutput(div) {
    div.innerHTML = '';
}

var start_level = document.querySelector('.start_level');
var goal_level = document.querySelector('.goal_level');
var output = document.querySelector('.output');

var started = false;

var startval = NaN;
var goalval = NaN;

setInterval(function () {
    if (startval != parseInt(start_level.value) || goalval != parseInt(goal_level.value)) {
        startval = parseInt(start_level.value);
        goalval = parseInt(goal_level.value);
        if (!isNaN(startval) && !isNaN(goalval)){
            genOutput(output, startval, goalval);
        } else {
            clearOutput(output);
        }
    };
}, 250)