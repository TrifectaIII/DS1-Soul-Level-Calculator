function calcSouls (start, goal) {
    var total = 0;
    var levels = {};
    var level;

    for (let i=start+1; i < goal+1; i++){
        level = values[i]; //from values.js
        levels[i] = level;
        total += level;
    }
    return {total:total,levels:levels};
}

function genOutput (output,start,goal) {
    if (start < 1){
        start = 1;
    }
    if (goal > 713){
        goal = 713;
    }
    var souls = calcSouls(start,goal);
    var total = souls.total;
    var levels = souls.levels;

    if (total > 0){
        var message = '<p>To get from SL <b>'+start.toString()+'</b> to SL <b>'+
        goal.toString()+'</b>, it will take <b>'+total.toString()+
        '</b> Souls.</p>';

        var table = '';

        if (Object.keys(levels).length > 1) {
            table += `<hr><table>
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
            table += '<tr><td>'+
                level.toString()+'</td><td>'+
                levels[level].toString()+'</td><td>'+
                cumulative.toString()+'</td></tr>';
        }

        table += '</tbody></table>'
        }
            
        output.innerHTML = message+table;
    } else {
        output.innerHTML = '';
    }
}

var start_level = document.querySelector('.start_level');
var goal_level = document.querySelector('.goal_level');
var output = document.querySelector('.output');

var started = false;

var startval = NaN;
var goalval = NaN;

setInterval(function () {
    if (startval != parseInt(start_level.value) || goalval != parseInt(goal_level.value)){
        startval = parseInt(start_level.value);
        goalval = parseInt(goal_level.value);
        genOutput(output,parseInt(start_level.value),parseInt(goal_level.value));
    }; 
},250)