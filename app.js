var working = true;
var breaking = false;
var workTime = 2.00;
var breakTime = 5.00;

$(document).ready(function(){

  $('#start').click(function(){
    initializeClock('#clock', workTime);
  });

  workTime = workTime * 60;
  updateClock(workTime);


});


function initializeClock(id, endtime){
  // set up initial display of clock
  var clock = $('#clock');
  clock.text(workTime);

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

  var minutes = Math.floor(workTime % 3600 / 60);
  var seconds = workTime % 60;

  // update clock
  $('#clock').text(minutes + ':' + seconds);

  // If numbers or minutes are single digits add a 0 in front of them so the clock looks right
  if(seconds < 10){
    $('#clock').text(minutes + ':0' + seconds );
  }

  if(minutes < 10){
      $('#clock').text('0' + minutes + ':' + seconds );
  }

  if(minutes < 10 && seconds < 10){
    $('#clock').text('0' + minutes + ':0' + seconds );
  }

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
