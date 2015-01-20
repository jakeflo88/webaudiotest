window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

document.getElementById("everything").addEventListener('keydown',function(event){

	var keyPress = "";
	var keyID = "";

	switch (event.keyCode) {

		case 65:
		keyPress = "C4";
		keyID = 'button1';
		break;

		case 87:
		keyPress = "C#4";
		keyID = 'button2';
		break;

		case 83:
		keyPress = "D4";
		keyID = 'button3';
		break;

		case 69:
		keyPress = "D#4";
		keyID = 'button4';
		break;

		case 68:
		keyPress = "E4";
		keyID = 'button5';
		break;

		case 70:
		keyPress = "F4";
		keyID = 'button6';
		break;

		case 84:
		keyPress = "F#4";
		keyID = 'button7';
		break;

		case 71:
		keyPress = "G4";
		keyID = 'button8';
		break;

		case 89:
		keyPress = "G#4";
		keyID = 'button9';
		break;

		case 72:
		keyPress = "A4";
		keyID = 'button10';
		break;

		case 85:
		keyPress = "A#4";
		keyID = 'button11';
		break;

		case 74:
		keyPress = "B4";
		keyID = 'button12';
		break;

		case 75:
		keyPress = "C5";
		keyID = 'button13';
		break;

		case 79:
		keyPress = "C#5";
		keyID = 'button14';
		break;

		case 76:
		keyPress = "D5";
		keyID = 'button15';
		break;

		case 80:
		keyPress = "D#5";
		keyID = 'button16';
		break;

		case 186:
		keyPress = "E5";
		keyID = 'button17';
		break;

		default:
		return
		break;
	}

	//play the note
	makeMusic(keyPress);

	//change key color
	document.getElementById(keyID).style.backgroundColor='Red';
	setTimeout(function() {document.getElementById(keyID).removeAttribute("style");}, 250);
});


//function for playing notes
function makeMusic(keyPlayed) {

	window.frequencies = {
		'C4': 261.626,
		'C#4': 277.183,
		'D4': 293.665,
		'D#4': 311.127,
		'E4': 329.628,
		'F4': 349.228,
		'F#4': 369.994,
		'G4': 391.995,
		'G#4': 415.305,
		'A4': 440.000,
		'A#4': 466.164,
		'B4': 493.883,
		'C5': 523.251,
		'C#5': 554.365,
		'D5': 587.330,
		'D#5': 622.254,
		'E5': 659.255,
	};

	window.playNote = function (note, time, duration) {
		var ctx = window.audioContext;
		var osc = ctx.createOscillator();
		osc.frequency.value = frequencies[note];
		osc.connect(ctx.destination);
		osc.noteOn(ctx.currentTime + time);
		osc.noteOff(ctx.currentTime + time + duration);
		return osc;
	}

	playNote(keyPlayed, 0.0, 0.25);

};

