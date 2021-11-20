/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Variables Start                                                                                    */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
var $ = jQuery.noConflict();
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Variables End                                                                                      */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/



/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Starts                                                                     */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
jQuery(document).ready(function($){
	
	
	
	// initial settings start
	var showRedirectWindow = 'true'; // set this to 'false' to disable the redirect form, and send users directly to the mobile version
	var redirectToPage = 'false'; // set this to 'true' if you want to redirect from a page to the corresponding mobile page, e.g. www.example.com/page - m.example.com/page
	var redirectProtocol = 'http://'; // set this to  'https://' if you need to
	var redirectLocationName = 'm'; // if 'redirectToFolder' is set to 'false' this value will be used as the sub-domain and the redirect URL will be 'http://m.example.com'. If 'redirectToFolder' is set to 'true' the URL will become 'http://example.com/m'
	var redirectToFolder = 'false'; // set this to true if you are redirecting to a sub-folder and not to a sub-domain
	var redirectDomain = 'example.com'; // set your main domain
	var redirectURL = ''; // do no modify!
	var redirectTitle = 'Mobile device detected';
	var redirectMessage = 'This page is not optimized for mobile devices, would you like to visit our mobile website?';
	var redirectChoice = ''; // do not modify!
	var rememberChoice = 'false'; // do not modify!
	var redirectWindowWidth = 252; // the width of the form without paddings and borders
	var redirectWindowHeight = 280; // the height of the form without paddings and borders
	
	var redirectPath = window.location.pathname; // do not modify!
	
	var cookieLife = 7; // the number of days until the cookie is deleted
	var redirectCookie = ''; // do not modify!
	
	var mobileDevice = (/iphone|ipad|ipod|android|iemobile|windows phone|blackberry|BB10|opera mini/).test(navigator.userAgent.toLowerCase()); // you can add more mobile devices here
	
	var desktopMode = 'false'; // 'true' for tests only, the default value should be 'false'
	// initial settings end
	
	
	
	// cookie functions start
	function createCookie(name,value,days) {
		
		if (days) {
			
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		
		}else {
			
			var expires = "";
			
		};
		
		document.cookie = name+"="+value+expires+"; path=/";
		
	};
	
	function readCookie(name) {
		
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		};
		
		return null;
		
	};

	function eraseCookie(name) {
		
		createCookie(name, "" ,-1);
		
	};
	
	redirectCookie = readCookie('redirectUser');
	// cookie functions end
	
	
	
	// redirect function starts
	if(redirectToFolder == 'false'){
		
		if(redirectToPage == 'false') {
			
			redirectURL = redirectProtocol + redirectLocationName + '.' + redirectDomain;
		
		} else {
			
			redirectURL = redirectProtocol + redirectLocationName + '.' + redirectDomain + redirectPath;
			
		};
		
	} else {
		
		if(redirectToPage == 'false') {
		
			redirectURL = redirectProtocol + redirectDomain + '/' + redirectLocationName;
		
		} else {
			
			redirectURL = redirectProtocol + redirectDomain + '/' + redirectLocationName + redirectPath;
			
		};
		
	};
		
	if(mobileDevice || desktopMode == 'true') {
        
		if(redirectCookie == 'true' || showRedirectWindow == 'false'){
			
			window.location = redirectURL;
			return false;
			
		}else if(redirectCookie === null){
		
			$('<div class="redirectWindowOuterWrapper">\
				<div class="redirectWindowWrapper">\
					<h3 class="redirectWindowTitle">'+ redirectTitle +'</h3>\
					<p class="redirectWindowMessage">'+ redirectMessage +'</p>\
					<div class="redirectWindow">\
						<div class="redirectWindowButtonsWrapper"><a href="" class="redirectWindowButton redirectNoButton">No</a><a href="" class="redirectWindowButton redirectYesButton">Yes</a></div>\
						<div class="redirectWindowRemember"><a href="" class="redirectWindowCheckbox"><span></span></a><p class="redirectWindowCheckBoxLabel">Remember my choice for '+ cookieLife +' days</p></div>\
					</div>\
				</div>\
			</div>').appendTo('body');
		    
			$('.redirectWindowWrapper').css('width', redirectWindowWidth);
			$('.redirectWindowWrapper').css('height', redirectWindowHeight);
			$('.redirectWindowWrapper').css('margin-left', -$('.redirectWindowWrapper').outerWidth()/2);
			$('.redirectWindowWrapper').css('margin-top', -$('.redirectWindowWrapper').outerHeight()/2);

			$('.redirectWindowOuterWrapper').fadeIn(500);
			
		};
		    
    };
	// redirect function ends
	
	
	
	// form functions start
	$('.redirectYesButton').click(function(){
		
		if(rememberChoice == 'true'){
		    
			redirectChoice = 'true';
			createCookie('redirectUser', redirectChoice, cookieLife);
			
		};
		
		window.location = redirectURL;
		
		return false;
		
	});
	
	$('.redirectNoButton').click(function(){
		
		if(rememberChoice == 'true'){
		     
			redirectChoice = 'false';
			createCookie('redirectUser', redirectChoice, cookieLife);
			
		};
		
		$('.redirectWindowOuterWrapper').fadeOut(500);
		
		return false;
		
	});
	
	$('.redirectWindowCheckbox').click(function(){
		
		if(rememberChoice == 'false'){
			
			rememberChoice = 'true';
			$(this).find('span').css('display', 'block');
			
		}else{
			
			rememberChoice = 'false';
			$(this).find('span').css('display', 'none');
			
		}
		
		return false;
		
	});
	
	$('.eraseCookieButton').click(function(){
	
		eraseCookie('redirectUser');
		
	});
	// form functions end

	
	
});
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////// Document Ready Function Ends                                                                       */
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/