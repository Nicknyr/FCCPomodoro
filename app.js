var workTime = 25.00;
var breakTime = 5.00;

$(document).ready(function(){


// Initialize the clock
function initializeClock(time){
  var clock = $('#timeRemaining');

  var minutes = ('.minutes');
  var seconds = ('.seconds');

}

console.log(initializeClock(workTime));


// Add/subtract time to break
$('#subtractBreakMinute').click(function(){

  if(breakTime > 0) {
    breakTime -= 1;
    $('#breakDisplay').text(breakTime);
  }
})


$('#addBreakMinute').click(function(){

  if(breakTime < 59) {
    breakTime += 1;
    $('#breakDisplay').text(breakTime);
  }
})

// Add/subtract time to workTime
$('#subtractSessionMinute').click(function(){

  if(workTime > 0) {
    workTime -= 1;
    $('#sessionDisplay').text(workTime);
  }
})

$('#addSessionMinute').click(function(){

  if(workTime < 59) {
    workTime += 1;
    $('#sessionDisplay').text(workTime);
  }
})

});
