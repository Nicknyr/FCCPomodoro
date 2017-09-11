var timerInt;
var minutes;
var seconds;

var pomodoro = {
  wTime: .10,
  bTime: .50,
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
    pomodoro.wElem.text(pomodoro.wTime);
    pomodoro.bElem.text(pomodoro.bTime);
	  pomodoro.cElem.text(pomodoro.wTime);

    $('#start').on('click', function(){
      startClock();
    })
  }


  function tick() {

    if(working) {
      totalSecondsWork--;
      minutes = Math.floor(totalSecondsWork % 3600 / 60);
      seconds = totalSecondsWork % 60;
      // Adds a 0 in front of single digit minutes/seconds
      minutes = ('0' + minutes).slice(-2);
      seconds = ('0' + seconds).slice(-2);
      pomodoro.cElem.text(minutes + ':' + seconds);
    }
    else {
      totalSecondsBreak--;
      minutes = Math.floor(totalSecondsBreak % 3600 / 60);
      seconds = totalSecondsBreak % 60;
      // Adds a 0 in front of single digit minutes/seconds
      minutes = ('0' + minutes).slice(-2);
      seconds = ('0' + seconds).slice(-2);
      pomodoro.cElem.text(minutes + ':' + seconds);
    }

    if(pomodoro.cElem.text() == '00:00'){
      working = false;
      changeStatus();
    }
  }



  function startClock(){
    timerInt = window.setInterval(tick, 1000);
  }

  function stopClock(){
    window.clearInterval(timerInt);
  }

  function changeStatus() {
  	stopClock();
  	//pomodoro.cWork = !pomodoro.cWork;
  	if(working) {
  		pomodoro.cElem.text(pomodoro.wTime);
  	}
    else {
  		pomodoro.cElem.text(pomodoro.bTime);
  	}
  	startClock();
  }



   // Add/subtract time to break
  $('#subtractBreakMinute').click(function(){
    if(pomodoro.bTime > 0) {
        pomodoro.bTime -= 1;
        $('#breakDisplay').text(pomodoro.bTime);
        totalSecondsBreak - 60;
        clockInit();
    }
  })

  $('#addBreakMinute').click(function(){
    if(pomodoro.bTime < 60) {
        pomodoro.bTime += 1;
        $('#breakDisplay').text(pomodoro.bTime);
        totalSecondsWork + 60;
        clockInit();
    }
  })

  $('#subtractSessionMinute').click(function(){
    if(pomodoro.wTime > 0){
      pomodoro.wTime -= 1;
      $('#sessionDisplay').text(pomodoro.wTime);
      totalSecondsWork - 60;
       clockInit();
    }
  })

  $('#addSessionMinute').click(function(){
    if(pomodoro.wTime < 60){
      pomodoro.wTime += 1;
      $('#sessionDisplay').text(pomodoro.wTime);
      totalSecondsWork + 60;
       clockInit();
    }
  })


});
