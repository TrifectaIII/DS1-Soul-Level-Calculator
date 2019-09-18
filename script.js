function calcSouls (start, goal) {
    var total = 0;
    var level;
    var levels = {};

    var lowlevels = {
        2:673,
        3:690,
        4:707,
        5:724,
        6:741,
        7:758,
        8:775,
        9:793,
        10:811,
        11:829,
        12:847
    }

    for (let i=start+1; i < goal+1; i++){
        if (i <= 1){
            //no souls before 1 -> 2
            level = 0;
        } else if (i <= 12) {
            //formula not accurate below 12
            level = lowlevels[i];
        } else {
            level = Math.round(0.02*Math.pow(i,3) + 3.06*Math.pow(i,2) + 105.6*i - 895);
        }
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
        goal.toString()+'</b>, it will take <b>&asymp;'+total.toString()+
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