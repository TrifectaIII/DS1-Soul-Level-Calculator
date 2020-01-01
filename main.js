//formats number with commas
function formatNum(num) {
    before = num.toString();
    after = '';
    counter = 0;
    for (let i = before.length - 1; i >= 0; i--) {
        if (counter == 3) {
            counter = 0;
            after = ',' + after;
        }
        counter += 1;
        after = before[i] + after;
    }
    return after;
}

//calculates the total number to get from start to goal level
function calcSouls(start, goal) {
    var total = 0;
    var levels = {};
    var level;

    for (let i = start + 1; i <= goal; i++) {
        souls = values[i]; //from values.js
        total += souls;
        levels[i] = {
            single:souls,
            cumulative:total,
        }
    }
    return { total: total, levels: levels };
}

//generates output 
function genOutput(div, start, goal, parser) {
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
        //apply level info to parser
        div.innerHTML = parser({
            start_level:start,
            goal_level:goal,
            total_souls:total,
            level_info:levels,
        })
    } else {
        div.innerHTML = '';
    }
}

function clearOutput(div) {
    div.innerHTML = '';
}

//pull from document
var start_level = document.querySelector('.start_level');
var goal_level = document.querySelector('.goal_level');
var reset_button = document.querySelector('.reset_button');
var shift_buttons = document.querySelectorAll('.shift_button');
var output = document.querySelector('.output_section');

//init parser for the template
var output_parser = Handlebars.compile(document.querySelector('.output_template').innerHTML);


var startval = NaN;
var goalval = NaN;

//get cookie data
var saved = cookie.get(['start','goal'],'none');
if (!isNaN(parseInt(saved.start))) {
    start_level.value = saved.start;
}
if (!isNaN(parseInt(saved.goal))) {
    goal_level.value = saved.goal;
}


//Update Output when inputs are valid
setInterval(function () {
    //only check when inputs change
    if (startval != parseInt(start_level.value) || 
        goalval != parseInt(goal_level.value)) {
        
        //reign in out-of-bounds 
        if (parseInt(start_level.value) > 715) {
            start_level.value = 715;
        }
        if (parseInt(start_level.value) < 1) {
            start_level.value = 1;
        }

        if (parseInt(goal_level.value) > 715) {
            goal_level.value = 715;
        }
        if (parseInt(goal_level.value) < 1) {
            goal_level.value = 1;
        }

        //update stored values
        startval = parseInt(start_level.value);
        goalval = parseInt(goal_level.value);

        //save new values to cookie
        cookie.set('start',startval,{expires:7});
        cookie.set('goal',goalval,{expires:7});

        //generate new output if both are ints and goal is higher
        if (!isNaN(startval) && !isNaN(goalval) && startval < goalval){
            genOutput(output, startval, goalval, output_parser);
        } else {
            clearOutput(output);
        }
    };
}, 250);

// reset button setup
reset_button.addEventListener('click', function () {
    start_level.value = '';
    goal_level.value = '';
    start_level.focus();
});

//shift button setup
shift_buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (!isNaN(parseInt(goal_level.value))) {
            start_level.value = parseInt(goal_level.value);
            goal_level.value = '';
            goal_level.focus();
        }
    });
});

//remove buttons from tab order
reset_button.tabIndex = -1;
shift_buttons.forEach(function (button) {
    button.tabIndex = -1;
});

//remove links from tab order
document.querySelectorAll('a').forEach(function (link) {
    link.tabIndex = -1;
});