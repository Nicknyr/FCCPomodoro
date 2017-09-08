var workTime = 25.00;
var breakTime = 5.00;
var breaking = false;
var working = true;


$(document).ready(function(){

function getTimeRemaining(endtime){
    var minutes = endtime;
    var seconds = endtime * 60;
    var secondsCounter = 0;

    return {
      'minutes': minutes,
      'seconds': seconds
    };

}

// Initialize the clock
function initializeClock(id, endtime){
  var clock = $('#timeRemaining');
  clock.text(workTime);

  var minutesDiv = $('.minutes');
  var secondsDiv = $('.seconds');

  // Should display the updated time every second
  function updateClock(){

    var t = getTimeRemaining(endtime);

    // These should display the time in the clock, but aren't working
    clock.text = ('0' + t.minutes).slice(-2);
    clock.text = ('0' + t.seconds).slice(-2);


    console.log(t.seconds);

    if (t.seconds <= 0) {
      clearInterval(timeInterval);
    }
  }
  updateClock();
  var timeInterval = setInterval(updateClock, 1000);

}

  initializeClock('#timeRemaining', workTime);

if(workTime === 0){
  breaking = true;

  initializeClock('#timeRemaining', breakTime);
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


});
