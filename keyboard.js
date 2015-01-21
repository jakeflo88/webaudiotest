/*
Need to complete the range of frequencies so that everything works again.
Also need to fix the mouse clicking to make it the same the keyboard.
After that need to add in key commands for changing octaves
*/



//audio context for output
window.audioContext = new (window.AudioContext || window.webkitAudioContext)();


//for playing with the computer keys
document.getElementById("everything").addEventListener('keydown',function(event){

	//info for notes
	var keyPress = "";
	var keyID = "";

	//determine the note
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
	setOctave(keyPress);

	//change key color
	document.getElementById(keyID).style.backgroundColor='Red';
	setTimeout(function() {document.getElementById(keyID).removeAttribute("style");}, 250);
});


//function for playing notes
function makeMusic(keyPlayed) {

	window.frequencies = {

		'C2': 65.4064, 'C#2': 69.2957, 'D2': 73.4162, 'D#2': 77.7817, 'E2': 82.4069, 'F2': 87.3071,
		'F#2': 92.4986, 'G2': 97.9989, 'G#2': 103.826, 'A2': 110.000, 'A#2': 116.541, 'B2': 123.471,

		'C3': 130.813, 'C#3': 138.591, 'D3': 146.832, 'D#3': 155.563, 'E3': 164.814, 'F3': 174.614,
		'F#3': 184.997, 'G3': 195.998, 'G#3': 207.652, 'A3': 220.000, 'A#3': 233.082, 'B3': 246.942,

		'C4': 261.626, 'C#4': 277.183, 'D4': 293.665, 'D#4': 311.127, 'E4': 329.628, 'F4': 349.228,
		'F#4': 369.994, 'G4': 391.995, 'G#4': 415.305, 'A4': 440.000, 'A#4': 466.164, 'B4': 493.883,

		'C5': 523.251, 'C#5': 554.365, 'D5': 587.330, 'D#5': 622.254, 'E5': 659.255, 'F5': 698.456,
		'F#5':739.989, 'G5': 783.991, 'G#5': 830.609, 'A5': 880.000, 'A#5': 932.328,'B5': 987.767,
		
		'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91,
		'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
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

//function for checking octave
function setOctave(keyAdjust) {
	var octaves = document.getElementsByName('octave');
	var octaveSet = "";

	//find which octave button is selected
	for(var i = 0; i < octaves.length; i++){
	    if(octaves[i].checked){
	        octaveSet = octaves[i].value;
	    }
	}
	
	//if it's a positive octave change (octave up)
	if (octaveSet.substring(0,1) === '+') {
		//find value of change
		var octaveUpAmount = octaveSet.substring(1,2);

		//change string to number for manipulation
		var octaveUp = parseInt(octaveUpAmount);

		//find original value
		var calcUpOctave = parseInt(keyAdjust.charAt(keyAdjust.length-1));

		//add both value to make the octave change
		var octaveUpChange = octaveUp + calcUpOctave;

		//convert back to string for freq conversion
		keyAdjust = keyAdjust.substring(0, keyAdjust.length-1) + octaveUpChange.toString();
		
		makeMusic(keyAdjust);
	};

	//octave down
	if (octaveSet.substring(0,1) === '-') {
		//find value of change
		var octaveDownAmount = octaveSet.substring(1,2);

		//change string to number for manipulation
		var octaveDown = parseInt(octaveDownAmount);

		//find original value
		var calcDownOctave = parseInt(keyAdjust.charAt(keyAdjust.length-1));

		//add both value to make the octave change
		var octaveDownChange = octaveDown - calcDownOctave;

		//remove the negative sign
		var octaveDownChangeStr = octaveDownChange.toString();

		//convert back to string for freq conversion and remove '-'
		keyAdjust = keyAdjust.substring(0, keyAdjust.length-1) + octaveDownChangeStr.charAt(octaveDownChangeStr.length-1);

		console.log(keyAdjust);
		
		makeMusic(keyAdjust);
		
	}

	//for no octave change
	else {
		makeMusic(keyAdjust);
	}

};

