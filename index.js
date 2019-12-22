function difference(a, b) {
	var month = b.getMonth() - a.getMonth();
	var day = b.getDate() - a.getDate();
	var hour = b.getHours() - a.getHours();
	var min = b.getMinutes() - a.getMinutes();
	var sec = b.getSeconds() - a.getSeconds();
	var ms = b.getMilliseconds() - a.getMilliseconds();
	if (ms < 0) {
		ms += 1000;
		sec--;
	}
	if (sec < 0) {
		sec += 60;
		min--;
	}
	if (min < 0) {
		min += 60;
		hour--;
	}
	if (hour < 0) {
		hour += 24;
		day--;
	}
	if (day < 0) {
		var yr = b.getFullYear();
		var leapyear = yr % 400 == 0 || (yr % 4 == 0 && yr % 100 != 0);
		var days = [
			31,
			leapyear ? 29 : 28,
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31
		];
		day += days[b.getMonth()] - 1;
		month--;
	}
	return [month, day, hour, min, sec, ms];
}

function time() {
	var now = new Date();
	var final = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0);
	if (now < final) {
		return difference(now, final);
	} else {
		return null;
	}
}
document.addEventListener("DOMContentLoaded", () => {
	setInterval(() => {
		var cont = document.getElementById("time-container");
		cont.innerHTML = "";
		var t = time();
		if (t != null) {
			var nums = [
				t[0],
				Math.floor(t[1] / 7),
				t[1] % 7,
				t[2],
				t[3],
				t[4],
				t[5]
			];
			var key = [
				"Months",
				"Weeks",
				"Days",
				"Hours",
				"Minutes",
				"Seconds",
				"Milliseconds"
			];
			var n = [2, 1, 1, 2, 2, 2, 3];
			for (var i = 0; i < t.length; i++) {
				if (nums[i] != 0) {
					var p = document.createElement("P");
					var str = formatNum(nums[i], n[i]) + " " + key[i];
					if (nums[i] == 1) {
						p.innerHTML = str.substring(0, str.length - 1);
					} else {
						p.innerHTML = str;
					}
					cont.appendChild(p);
				}
			}
		} else {
			var p = document.createElement("P");
			cont.appendChild(p);
			p.innerHTML = "Merry Christmas! 🎅";
		}
	}, 100);
});
function formatNum(num, digits) {
	var out = "" + num;
	while (out.length < digits) {
		out = "0" + out;
	}
	return out;
}
