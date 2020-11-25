/**
 * @return {Date} December 25th of the current year at 12:00:00.0000 AM
 */
function christmasTime() {
	var currentTime = new Date();
	return new Date(currentTime.getFullYear(), 11, 25, 0, 0, 0, 0);
}

/**
 * @return {boolean} True if the current year is a leap year else False
 */
function isLeapYear() {
	var year = new Date().getFullYear();
	if (year % 400 == 0) {
		return true;
	} else if (year % 4 == 0 && year % 100 != 0) {
		return true;
	} else {
		return false;
	}
}

/**
 *
 * @param {Date} a First Date
 * @param {Date} b Second Date
 * @return TimeDelta object
 */
function difference(a, b) {
	var timeDelta = {};
	timeDelta.month = b.getMonth() - a.getMonth();
	timeDelta.day = b.getDate() - a.getDate();
	timeDelta.hr = b.getHours() - a.getHours();
	timeDelta.min = b.getMinutes() - a.getMinutes();
	timeDelta.s = b.getSeconds() - a.getSeconds();
	timeDelta.ms = b.getMilliseconds() - a.getMilliseconds();

	while (timeDelta.ms < 0) {
		timeDelta.ms += 1000;
		timeDelta.s -= 1;
	}
	while (timeDelta.s < 0) {
		timeDelta.s += 60;
		timeDelta.min -= 1;
	}
	while (timeDelta.min < 0) {
		timeDelta.min += 60;
		timeDelta.hr -= 1;
	}
	while (timeDelta.hr < 0) {
		timeDelta.hr += 24;
		timeDelta.day -= 1;
	}
	if (timeDelta.day < 0) {
		var days = [31, isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		timeDelta.day += days[b.getMonth() - 1];
		timeDelta.month -= 1;
	}
	return timeDelta;
}

/**
 * Update the Display
 */
function updateDisplay() {
	var current = new Date();
	var christmas = christmasTime();
	var cont = document.getElementById("time-container");
	cont.innerHTML = "";

	if (current < christmas) {
		var timeDelta = difference(current, christmas);
		var keys = [
			{ value: timeDelta.month, text: "Months", digits: 2, hideZero: true },
			{ value: Math.floor(timeDelta.day / 7), text: "Weeks", digits: 1, hideZero: true },
			{ value: timeDelta.day % 7, text: "Days", digits: 1, hideZero: true },
			{ value: timeDelta.hr, text: "Hours", digits: 1, hideZero: false },
			{ value: timeDelta.min, text: "Minutes", digits: 2, hideZero: false },
            { value: timeDelta.s, text: "Seconds", digits: 2, hideZero: false }
            // ,
			// { value: timeDelta.ms, text: "Milliseconds", digits: 3, hideZero: false },
		];
		for (index in keys) {
			var key = keys[index];
			var text = format(key.value, key.digits);
			if (key.value == 1) {
				text += " " + key.text.substring(0, key.text.length - 1);
			} else if (key.value == 0 && key.hideZero) {
                text = "";
			} else {
				text += " " + key.text;
			}
			var p = document.createElement("P");
			p.innerHTML = text;
			cont.appendChild(p);
		}
	} else {
		var p = document.createElement("P");
		cont.appendChild(p);
		p.innerHTML = "Merry Christmas! 🎅";
	}
}

document.addEventListener("DOMContentLoaded", () => {
	setInterval(() => {
		updateDisplay();
	}, 100);
});

/**
 * Formats Integers by prepending "0"
 * @param {Integer} num The number to format
 * @param {Integer} digits The minimum number of digits of the formatted output
 * @return {String} The string with the formatted number
 */
function format(num, digits) {
	var out = "" + num;
	while (out.length < digits) {
		out = "0" + out;
	}
	return out;
}
