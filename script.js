/* IMPROVEMENT IN PROGRESS... */

var quizQuestionCorrect = 0;
var quizQuestions = 0;

$(document).ready(function () {
	$(".navQuestion, .quizPanel, .quizCorrect, .quizFail, .quizContinue").hide();
	quizQuestions = $(".quizPanel").length;

	//start quiz
	$(".quizPlayGame").click(function (e) {
		e.preventDefault();
		$(".quizIntroPanel").hide();
		$($(".quizPanel")[0]).show();
		$(".navQuestion").show();
	});

	//click an option
	$(".question").click(function () {
		$("input:not(:checked)").parent().removeClass("quizSelected");
		$("input:checked").parent().addClass("quizSelected");
	});

	//click validate button
	$(".quizValidate").click(function (e) {
		e.preventDefault();
		quizValidate(this);
	});

	//click continue button
	$(".quizContinue").click(function (e) {
		e.preventDefault();
		quizContinue(this);
	});
});

function quizValidate(element) {
	//find checkbox inputs
	var checkboxButtons = $(element)
		.parent(".quizValidationLayer")
		.parent(".quizPanel")
		.find("input");
	var isCorrect = "0";
	var isError = "0";
	if ($(checkboxButtons).length > 0) {
		//check if there are multiple correct anwers
		var isCorrectDoubleNum = $(element)
			.closest(".quizPanel")
			.find(".question input[data-value='1']").length;
		var isCorrectDoubleChecker = 0;

		$(checkboxButtons).each(function (index, element) {
			//for each checkbox
			if ($(this).is(":checked")) {
				if ($(this).attr("data-value") == "1") {
					isCorrectDoubleChecker++;
					if (isCorrectDoubleNum == isCorrectDoubleChecker) {
						isCorrect = "1";
					}
				} else {
					isError = "1";
					isCorrect = "0";
				}
				if ($(this).attr("data-value") == "1" && isError == "1") {
					$(this).parent().addClass("thisCorrect");
				}
			} else {
				if ($(this).attr("data-value") == "1") {
					$(this).parent().addClass("thisCorrect");
					isCorrect = "0";
				} else {
					//isError = "1";
				}
			}
		});
	}

	if (isError == "1") {
		isCorrect = "0";
		//show error msg
		$(element).parent(".quizValidationLayer").children(".quizFail").show();
		var errorMsg = "";
		$(element)
			.parent(".quizValidationLayer")
			.siblings(".quizResponses")
			.children(".question")
			.children("input[data-value=1]")
			.siblings("label")
			.each(function () {
				errorMsg += $(this).text() + "<br>";
			});
		$(element)
			.parent(".quizValidationLayer")
			.children(".quizFail")
			.html(
				"ERROR<br> <small>Sorry, this wasn't the correct answer.<br>The correct answer is:</small><br> " +
					errorMsg
			);
	}

	if (isCorrect == "1") {
		//show correct msg
		$(element)
			.parent(".quizValidationLayer")
			.children(".quizCorrect")
			.show()
			.html("CORRECT<br> <small>Your answer is correct!</small>");
		quizQuestionCorrect += 1;
	} else {
		/*
        //show error msg
        $(element).parent(".quizValidationLayer").children('.quizFail').show();
        var errorMsg = '';
        $(element).parent(".quizValidationLayer").siblings('.quizResponses').children('.question').children('input[data-value=1]').siblings('label').each(function() {
            errorMsg += $(this).text() + '<br>';
        });
        $(element).parent(".quizValidationLayer").children('.quizFail').html(
            'ERROR<br> <small>Sorry, this wasn\'t the correct answer.<br>The correct answer is:</small><br> ' + errorMsg
        );
        */
	}

	//hide validate button
	$(element).hide();
	//show continue button
	$(element).parent(".quizValidationLayer").children(".quizContinue").show();
	//disable the checkboxes for this question
	$(element)
		.parent(".quizValidationLayer")
		.siblings(".quizResponses")
		.children(".question")
		.children("input")
		.attr("disabled", true);
}

function showErrorMsg() {
	//show error msg
	$(element).parent(".quizValidationLayer").children(".quizFail").show();
	var errorMsg = "";
	$(element)
		.parent(".quizValidationLayer")
		.siblings(".quizResponses")
		.children(".question")
		.children("input[data-value=1]")
		.siblings("label")
		.each(function () {
			errorMsg += $(this).text() + "<br>";
		});
	$(element)
		.parent(".quizValidationLayer")
		.children(".quizFail")
		.html(
			"ERROR<br> <small>Sorry, this wasn't the correct answer. The correct answer is:</small><br> " +
				errorMsg
		);
}

//go to next question
function quizContinue(element) {
	var currentPanel = $(element)
		.parent(".quizValidationLayer")
		.parent(".quizPanel");
	var nextPanel = $(currentPanel).next(".quizPanel");
	if ($(nextPanel).length > 0) {
		$(currentPanel).hide();
		$(nextPanel).show();
		changeSelectedQuestion(nextPanel);
	} else {
		$(currentPanel).hide();
		$(".navQuestion").hide();
		$(".quizPanelResult").show();
		$(".quizTextResult")
			.delay(2000)
			.html(
				"You have " +
					((quizQuestionCorrect * 100) / quizQuestions).toFixed(0) +
					"%" +
					" correct answers !"
			);
	}
}

//highlight selected question
function changeSelectedQuestion(pos) {
	var x = pos.index() - 3;
	//$('.navQuestion').children('span').removeClass('quizActiveQuestion').eq(x).addClass('quizActiveQuestion');
	$(".navQuestion")
		.children("span")
		.removeAttr("class")
		.eq(x)
		.addClass("quizActiveQuestion");
}



let hour = 0;
let hour2 = 0;
let hour3 = 0;

let minute = 0;
let minute2 = 0;
let minute3 = 0;

let second = 0;
let second2 = 0;
let second3 = 0;

let millisecond = 0;
let millisecond2 = 0;
let millisecond3 = 0;

let cron;
let cron2;
let cron3;


document.getElementById('start1').onclick = () => start();
document.getElementById('pause1').onclick = () => pause();
document.getElementById('reset1').onclick = () => reset();

document.getElementById('start2').onclick = () => start2();
document.getElementById('pause2').onclick = () => pause2();
document.getElementById('reset2').onclick = () => reset2();

document.getElementById('start3').onclick = () => start3();
document.getElementById('pause3').onclick = () => pause3();
document.getElementById('reset3').onclick = () => reset3();



function start() {
  pause();
  set1_1();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
	set1_2();
	clearInterval(cron);
  }


  function reset() {
	set1_3();
	document.getElementById('hour1').innerText = '00';
	document.getElementById('minute1').innerText = '00';
	document.getElementById('second1').innerText = '00';
	document.getElementById('millisecond1').innerText = '000';
  }



function start2() {

	pause2();
	cron2 = setInterval(() => { timer2(); }, 10);
  }


  function pause2() {
	
	clearInterval(cron2);
  }
  
  function reset2() {
	
	document.getElementById('hour2').innerText = '00';
	document.getElementById('minute2').innerText = '00';
	document.getElementById('second2').innerText = '00';
	document.getElementById('millisecond2').innerText = '000';
  }




function start3() {
	set3_1();
	pause3();
	cron3 = setInterval(() => { timer3(); }, 10);
  }



function pause3() {
	set3_2();
	clearInterval(cron3);
  }
  

  function reset3() {
	set3_3();
	document.getElementById('hour3').innerText = '00';
	document.getElementById('minute3').innerText = '00';
	document.getElementById('second3').innerText = '00';
	document.getElementById('millisecond3').innerText = '000';
  }
  


function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour1').innerText = returnData(hour);
  document.getElementById('minute1').innerText = returnData(minute);
  document.getElementById('second1').innerText = returnData(second);
  document.getElementById('millisecond1').innerText = returnData(millisecond);
}

function timer2() {
	if ((millisecond2 += 10) == 1000) {
	  millisecond2 = 0;
	  second2++;
	}
	if (second2 == 60) {
	  second2 = 0;
	  minute2++;
	}
	if (minute2 == 60) {
	  minute2 = 0;
	  hour2++;
	}
	document.getElementById('hour2').innerText = returnData2(hour2);
	document.getElementById('minute2').innerText = returnData2(minute2);
	document.getElementById('second2').innerText = returnData2(second2);
	document.getElementById('millisecond2').innerText = returnData2(millisecond2);
  }

  function timer3() {
	if ((millisecond3 += 10) == 1000) {
	  millisecond3 = 0;
	  second3++;
	}
	if (second3 == 60) {
	  second3 = 0;
	  minute3++;
	}
	if (minute3 == 60) {
	  minute3 = 0;
	  hour3++;
	}
	document.getElementById('hour3').innerText = returnData3(hour3);
	document.getElementById('minute3').innerText = returnData3(minute3);
	document.getElementById('second3').innerText = returnData3(second3);
	document.getElementById('millisecond3').innerText = returnData3(millisecond3);
  }
function returnData(input) {
  return input >= 10 ? input : `0${input}`
}
function returnData2(input) {
	return input >= 10 ? input : `0${input}`
  }
  function returnData3(input) {
	return input >= 10 ? input : `0${input}`
  }

  function kembali(){
	location.reload();
  }

//set 1
function set1_1(){
	firebase.database().ref().update({
		'set1_1' :'1'
	});
}
function set1_2(){
	firebase.database().ref().update({
		'set1_1' :'2'
	});
}
function set1_3(){
	firebase.database().ref().update({
		'set1_1' :'3'
	});
}

//set2
function set2_1(){
	firebase.database().ref().update({'set2_1' :'1'});
}
function set2_2(){
	firebase.database().ref().update({'set2_1' :'2'});
}
function set2_3(){
	firebase.database().ref().update({'set2_1' :'3'});
}

//set3
function set3_1(){
	firebase.database().ref().update({
		'set3_1' :'1'
	});
}
function set3_2(){
	firebase.database().ref().update({
		'set3_1' :'2'
	});
}
function set3_3(){
	firebase.database().ref().update({
		'set3_1' :'3'
	});
}
