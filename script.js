function calcSouls (start, goal) {
    var total = 0;
    var level;
    var levels = {};
    for (let i=start+1; i < goal+1; i++){
        level = Math.round(0.02*Math.pow(i,3) + 3.06*Math.pow(i,2) + 105.6*i - 895);
        levels[i] = level;
        total += level;
    }
    return {total:total,levels:levels};
}

function genOutput (output,start,goal) {
    var souls = calcSouls(start,goal);
    var total = souls.total;
    var levels = souls.levels;

    var message = '<p>To get from SL <b>'+start.toString()+'</b> to SL <b>'+
        goal.toString()+'</b>, it will take <b>'+total.toString()+
        '</b> Souls.</p><hr>';


    var table = `<table>
                <thead>
                <tr>
                    <th>Level</th>
                    <th>Souls Required</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>`;

    var cumulative = 0;
    for (let level in levels) {
        cumulative += levels[level];
        table += '<tr><th>'+
            level.toString()+'</th><th>'+
            levels[level].toString()+'</th><th>'+
            cumulative.toString()+'</th></tr>';
    }

    table += '</tbody></table>'
        
    output.innerHTML = message+ table;
}

var start_level = document.querySelector('.start_level');
var goal_level = document.querySelector('.goal_level');
var output = document.querySelector('.output');

// console.log(calcSouls('hello',66))

start_level.addEventListener('change', function () {
    genOutput(output,parseInt(start_level.value),parseInt(goal_level.value))
})

goal_level.addEventListener('change', function () {
    genOutput(output,parseInt(start_level.value),parseInt(goal_level.value))
})