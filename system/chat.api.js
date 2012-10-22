var QB = {
			appId : '1018',
			ownerId : 'deprecated',
			authKey : 'ahmG5htmXkdbMSf',
			authSecret : 'J55pFySMOkY896L'
		};
	
	
	/** 
	 * Script runs main() when when PhoneGap is fully loaded.
	 * http://docs.phonegap.com/en/1.4.1/phonegap_events_events.md.html#deviceready
	 */
	function init() {
		document.addEventListener("deviceready", main, true);
	}
	
	function main() {
		Alert("it's working");
		$('#phoneGapStatus').html("it's working");
	 
		// Show QuickBlox application parameters.
		$('#appId').html(QB.appId);
		$('#ownerId').html(QB.ownerId);
		$('#authKey').html(QB.authKey);
		$('#authSecret').html(QB.authSecret);
		authApp(appHasToken, errorCallback);
	}
	
	
	/**
	 * Authenticate specified QuickBlox application.
	 * Calls successCallback if finished successfully, and errorCallback if not.
	 * @param successCallback
	 * @param errorCallback
	 */
	function authApp(successCallback, errorCallback) {
		var s = getSignature(); // gets signature
	 
		// See more documentation on the wiki -- http://wiki.quickblox.com/Authentication_and_Authorization#API_Session_Creation
		var url = 'https://admin.quickblox.com/auth';
		var data = 'app_id=' + QB.appId + 
				'&auth_key=' + QB.authKey + 
				'&nonce=' + s.nonce + 
				'&timestamp=' + s.timestamp + 
				'&signature=' + s.signature;
	 
		console.log('[DEBUG] Authenticate specified application: POST ' + url + '?' + data);
	 
		$.ajax({
		  type: 'POST',
		  url: url,
		  data: data,
		  success: successCallback,
		  error: errorCallback
		});
	}
	
	
	/**
	 * Calls when QuickBlox application authorize.
	 * @param xml
	 */
	function appHasToken(xml) {
		// Finds token in retrieved xml response.
		var token = $(xml).find('token').text();
	 
		console.log('[DEBUG] Your token: ' + token);
	 
		$('#auth').unbind('click');
		$('#auth').click(function(){
			authUser(token);
		});
	 
		$('#register').unbind('click');
		$('#register').click(function(){
			addUser(token);
		});
	 
		$('#users a').die('click');
		$('#users a').live('click', function(){
			var userId = $(this).attr('id');
			deleteUser(token, userId);
		});
	 
		getAllUsers(token);
	}
	
	/**
	 * Gets all users of QuickBlox application and prints them into the page.
	 * @param token
	 */
	function getAllUsers(token) {
		// See more documentation on the wiki -- http://wiki.quickblox.com/Users#Retrieve_API_Users_for_current_application
		var url = 'https://users.quickblox.com/users.json';
		var data = 'token=' + token;
	 
		console.log('[DEBUG] Getting all users: GET ' + url + '?' + data);
	 
		$.ajax({
			type: 'GET',
			url: url,
			data: data,
			success: function(response) {
				console.log('[DEBUG] Server response:');
				console.log(response);
	 
				// Prints users list into the #users container.
				$('#users').html('');
				$('#usersCount').html(' (' + response.items.length + ')');
				$(response.items).each(function(index, current){
					var element = '<li>[<a href="#" id="' + current.id + '">delete</a>] (' + current.id + ') ' + current.login + '</li>';
					$('#users').append(element);
				});
				if (response.items.length == 0) {
					$('#users').append('<li><i>There are no users in application.</i></li>');
				}
			},
			error: errorCallback
		});
	}
	
	
	/**
	 * Authenticates user.
	 * @param token
	 */
	function authUser(token) {
		var login = $('#login').val();
		var password = $('#password').val();
	 
		// See more documentation on the wiki -- http://wiki.quickblox.com/Authentication_and_Authorization#API_User_Sign_In
		var url = 'https://users.quickblox.com/users/authenticate.json';
		var data = 'user[owner_id]=' + QB.ownerId + 
				'&login=' + login + 
				'&password=' + password +
				'&token=' + token;
	 
		console.log('[DEBUG] Authenticate existing user: POST ' + url + '?' + data);
	 
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			success: function(response) {
				console.log('[DEBUG] User has been successfully authenticated. Server response:');
				alert('[DEBUG] User has been successfully authenticated, user id = ' + response.id);
				console.log(response);
			},
			error: errorCallback
		});
	}
	
	
	/**
	 * Adds new user.
	 * @param token
	 */
	function addUser(token) {
		var login = $('#new_login').val();
		var password = $('#new_password').val();
	 
		// See more documentation on the wiki -- http://wiki.quickblox.com/Users#API_User_Sign_Up
		var url = 'https://users.quickblox.com/users.json';
		var data = 'user[owner_id]=' + QB.ownerId + 
				'&user[login]=' + login + 
				'&user[password]=' + password +
				'&token=' + token;
	 
		console.log('[DEBUG] Add new user: POST ' + url + '?' + data);
	 
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			success: function(response) {
				console.log('[DEBUG] User has been successfully added, server response:');
				console.log(response);
				alert('User has been successfully added, user id = ' + response.id);
				getAllUsers(token);
			},
			error: errorCallback
		});
	}
	
	
	/**
	 * Deletes existing user by id.
	 * @param token
	 * @param id
	 */
	function deleteUser(token, id) {
	 
		// See more documentation on the wiki -- http://wiki.quickblox.com/Users#Delete_API_User_by_identifier
		var url = 'https://users.quickblox.com/users/' + id + '.json';
		var data = 'token=' + token;
	 
		console.log('[DEBUG] Delete user: DELETE ' + url + '?' + data);
	 
		$.ajax({
			type: 'DELETE',
			url: url,
			data: data,
			complete : function(jqXHR, textStatus) {
				console.log(jqXHR);
				alert(jqXHR.statusText + ' ' + jqXHR.status +  ' : ' + jqXHR.responseText);
	 
				if (jqXHR.status == 200) {
					authApp(appHasToken, errorCallback);
				}
			}
		});
	}
	
	
	/**
	 * Gets signature. Signature uses for application authentication.
	 * @returns {Object} signatureObj
	 */
	function getSignature() {
		var nonce = Math.floor(Math.random() * 1000); // Gets random number (0;1000)
		var timestamp = Math.round((new Date()).getTime() / 1000); // Gets unix timestamp (http://en.wikipedia.org/wiki/Unix_time) 
	 
		// Creating message where parameters are sorted by alphabetical order.
		var message = 'app_id=' + QB.appId + '&auth_key=' + QB.authKey + '&nonce=' + nonce + '&timestamp=' + timestamp;
		var secret = QB.authSecret;
		// Encrypting message with secret key from QuickBlox application parameters.
		var hmac = Crypto.HMAC(Crypto.SHA1, message, secret);
	 
		var signatureObj = {
			nonce : nonce,
			timestamp : timestamp,
			signature : hmac
		};
	 
		return signatureObj; 
	}
	
	