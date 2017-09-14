var timerInt;
var minutes;
var seconds;

var pomodoro = {
  wTime: 1.00,
  bTime: 1.00,
  cElem: $('#clock'),
  cWork: true,
  cTicking: false,
  wElem: $('#sessionDisplay'),
  bElem: $('#breakDisplay'),
};

var working = true;
var totalSecondsWork = pomodoro.wTime * 60;
var totalSecondsBreak = pomodoro.bTime * 60;

$(document).ready(function(){

  clockInit();

  function clockInit(){
    // Displays initial time on clock and break/session buttons
    pomodoro.wElem.text(pomodoro.wTime);
    pomodoro.bElem.text(pomodoro.bTime);
	  pomodoro.cElem.text(pomodoro.wTime + ':00');
  }

  $('#start').on('click', function(){
    startClock();
  })

  function tick() {
    if(working) {
      totalSecondsWork--;
      // Converts total seconds of work left to minutes/seconds
      minutes = Math.floor(totalSecondsWork % 3600 / 60);
      seconds = totalSecondsWork % 60;
      // Adds a 0 in front of single digit minutes/seconds
      minutes = ('0' + minutes).slice(-2);
      seconds = ('0' + seconds).slice(-2);
      // Displays minutes/seconds of work left
      pomodoro.cElem.text(minutes + ':' + seconds).css( { color: 'green' } );
    }
    else {
      totalSecondsBreak--;
      // Converts total seconds of break left to minutes/seconds
      minutes = Math.floor(totalSecondsBreak % 3600 / 60);
      seconds = totalSecondsBreak % 60;
      // Adds a 0 in front of single digit minutes/seconds
      minutes = ('0' + minutes).slice(-2);
      seconds = ('0' + seconds).slice(-2);
      // Displays minutes/seconds of break left
      pomodoro.cElem.text(minutes + ':' + seconds).css( { color: 'red' } );
      if(pomodoro.cElem.text() == '00:00'){
        done();
        stopClock();
      }
    }

    if(pomodoro.cElem.text() == '00:00'){
      bell();
      changeStatus();
    }
  }

  function done(){
    bell();
    pomodoro.cElem.text('DONE').css( { color: 'white' } );
  }


  function startClock(){
    timerInt = window.setInterval(tick, 1000);
  }

  function stopClock(){
    window.clearInterval(timerInt);
  }

  function changeStatus() {
  	stopClock();
  	working = !working;
  	if(working) {
  		pomodoro.cElem.text('0' + pomodoro.wTime + ':00').slice(-2);
  	}
    else {
  		pomodoro.cElem.text('0' + pomodoro.bTime + ':00').slice(-2).css( { color: 'red' } );
  	}
  	startClock();
  }

  function bell(){
    var audio = new Audio();
    audio.src = "bell.mp3";
    audio.play();
  }



   // Add/subtract time to break
  $('#subtractBreakMinute').click(function(){
    if(pomodoro.bTime > 0) {
        pomodoro.bTime -= 1;
        $('#breakDisplay').text(pomodoro.bTime);
        totalSecondsBreak -= 60;
        clockInit();
    }
  })

  $('#addBreakMinute').click(function(){
    if(pomodoro.bTime < 60) {
        pomodoro.bTime += 1;
        $('#breakDisplay').text(pomodoro.bTime);
        totalSecondsBreak += 60;
        clockInit();
    }
  })

  $('#subtractSessionMinute').click(function(){
    if(pomodoro.wTime > 0){
      pomodoro.wTime -= 1;
      $('#sessionDisplay').text(pomodoro.wTime);
      totalSecondsWork -= 60;
       clockInit();
    }
  })

  $('#addSessionMinute').click(function(){
    if(pomodoro.wTime < 60){
      pomodoro.wTime += 1;
      $('#sessionDisplay').text(pomodoro.wTime);
      //Changes clock to new amount but also decrements by that amount per second instead of 1 seconds per second
      totalSecondsWork += 60;
      clockInit();
    }
  })

  $('#stop').click(function(){
    stopClock();
    if(working) {
      pomodoro.cElem.text(minutes + ':' + seconds);
      stopClock();
    }
    else {
      pomodoro.cElem.text(minutes + ':' + seconds);
      stopClock();
    }
  })

  // Resets the clock amount but also have decrementation problems i.e. decrements seconds too quickly
  $('#reset').click(function(){
    stopClock();
    totalSecondsWork = pomodoro.wTime * 60;
    totalSecondsBreak = pomodoro.bTime * 60;
    clockInit();
  })



});
