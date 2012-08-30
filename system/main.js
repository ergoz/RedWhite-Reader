function beep() {
    navigator.notification.beep(1);
}

function vibrate() {
    navigator.notification.vibrate(1000);
}

function deviceReady() {
if(navigator.network && navigator.network.connection.type != Connection.NONE) {
	navigator.notification.vibrate(1);
	} else {
	beep();
	navigator.notification.vibrate(1);
	navigator.notification.vibrate(10);
	}
} 

function onMenuKeyDown() {
    // Handle the back button
	navigator.notification.vibrate(1);
	location.redirect("../options.html");
}

function init() {
    document.addEventListener("deviceready", deviceReady, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
}
