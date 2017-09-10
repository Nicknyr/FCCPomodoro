var working = true;
var breaking = false;
var workTime = .10;
var breakTime = 32.00;
var minutes;
var seconds;

$(document).ready(function(){
  $('#start').click(function(){
    initializeClock('#clock', minutes, seconds);
  });

  workTime = workTime * 60;
  breakTime = breakTime * 60;
});


function initializeClock(id, minutes, seconds){
  // set up initial display of clock
  var clock = $('#clock');
  clock.text(workTime);

  // update time every second, if time is 0 stop timer
  var timeInterval = setInterval(function(){
      clock.text(minutes, seconds);

      if(working === true) {
        if(updateClock(minutes) < 0 && updateClock(seconds) < 0){
          clearInterval(timeInterval);
          working = false;
          breaking = true;
          alert('Hey this block of code is executing!');
        }
        else if(breaking === true){
          if(updateClock(minutes) === 0 && updateClock(seconds) === 0){
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

  minutes = Math.floor(workTime % 3600 / 60);
  seconds =  workTime % 60;

  // Adds a 0 in front of single digit minutes/seconds
  minutes = ('0' + minutes).slice(-2);
  seconds = ('0' + seconds).slice(-2);

  // update clock
  $('#clock').text(minutes + ':' + seconds);
  console.log(minutes, seconds);

  // If the block is on break time
  if(breaking){

    var minutes = Math.floor(breakTime % 3600 / 60);
    var seconds =  breakTime % 60;

    breakTime--;

    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);

    $('#clock').text(minutes + ':' + seconds);
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
