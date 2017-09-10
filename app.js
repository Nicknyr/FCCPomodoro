var timerInt;

var pomodoro = {
  wTime: 3.00,
  bTime: 5.00,
  cElem: $('#clock'),
  cWork: true,
  cTicking: false,
  wElem: $('#sessionDisplay'),
  bElem: $('#breakDisplay'),

};


var minutes;
var seconds;


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

  pomodoro.wTime = pomodoro.wTime * 60;
  pomodoro.bTime = pomodoro.bTime * 60;

  function tick(){

    pomodoro.wTime--;

    minutes = Math.floor(pomodoro.wTime % 3600 / 60);
    seconds = pomodoro.wTime % 60;

    // Adds a 0 in front of single digit minutes/seconds
    minutes = ('0' + minutes).slice(-2);
    seconds = ('0' + seconds).slice(-2);

    pomodoro.cElem.text(minutes + ':' + seconds);

    if(pomodoro.cElem.text() == '00:00'){
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
  	pomodoro.cWork = !pomodoro.cWork;
  	if(pomodoro.cWork) {
  		pomodoro.cElem.text(pomodoro.wTime);
  	}
    else {
  		pomodoro.cElem.text(pomodoro.bTime);
  	}
  	startClock();
  }


});
