var beep = function() {
    navigator.notification.beep(1);
};


var vibrate = function() {
    navigator.notification.vibrate(1000);
};


var deviceReady = function() {
if(navigator.network && navigator.network.connection.type != Connection.NONE) {
	navigator.notification.vibrate(10);
	} else {
	navigator.notification.vibrate(1);
	navigator.notification.vibrate(10);
	navigator.notification.vibrate(100);
	navigator.notification.vibrate(1000);
	}
};


var onMenuKeyDown = function() {
    // Handle the back button
	navigator.notification.vibrate(1);
    navigator.notification.beep(1);
	navigator.notification.vibrate(1);
    navigator.notification.beep(1);
	navigator.notification.vibrate(1);
	location.redirect("../options.html");
}

var onMenuKeyDown = function() {
    // Handle the back button
	navigator.notification.vibrate(1);
}


function init() {
    document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceReady, true);
	document.addEventListener("menubutton", onMenuKeyDown, true);
	
}
