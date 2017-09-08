var working = true;
var breaking = false;
var workTime = 25.00;
var breakTime = 5.00;

$(document).ready(function(){
  initializeClock('#clock', workTime);
  workTime = workTime * 60;
  updateClock(workTime);

});


function initializeClock(id, endtime){
  // set up initial display of clock
  var clock = $('#clock');
  clock.text(workTime + ':00');

  // update time every second, if time is 0 stop timer
  var timeInterval = setInterval(function(){
      clock.text(workTime);
      if(working === true) {
        if(updateClock(endtime) === 0){
          clearInterval(timeInterval);
          working = false;
          breaking = true;
        }
        else if(breaking === true){
          if(updateClock(endtime) === 0){
            clearInterval(timeInterval);
            breaking = false;
            working = true;
        }
      }
    }

  }, 1000);

}


function updateClock(time){
  // subtract time from current time,

  workTime--;
  console.log(workTime);
  // update clock
  $('#clock').text(time);
}

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
