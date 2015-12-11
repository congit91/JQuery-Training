$(document).ready(function() {
	$('#password').convertToPasswordField();
  $('#re-password').convertToPasswordField();
});

(function($){
   $.fn.convertToPasswordField = function() {
      	$(this).attr("type", "password");
	    var feedback = $(this).attr("feedback");
	    if(feedback) {
    		$(this).bind('input propertychange', function() {
    			var password = $(this).val();
    			var strengthOfPassword = getPasswordStrength(password);
    			if (isNaN(strengthOfPassword)) {
    				removeProgessBarInformPasswordStrength();
    				$(this).tooltip('enable');
    				$(this).attr('title', strengthOfPassword).tooltip('fixTitle').tooltip('show');
    			} else {
    				$(this).attr('title', strengthOfPassword).tooltip('fixTitle').tooltip('hide');
    				$(this).tooltip('disable');
    				removeProgessBarInformPasswordStrength();
    				addProgessBarInformPasswordStrength($(this), strengthOfPassword);
    			}
  		  });
      }
      var passwordMatchId = $(this).attr("match");
      if (passwordMatchId != null && passwordMatchId != undefined) {
        var messagePasswordMatch;

        $(this).bind('input propertychange', function() {

          messagePasswordMatch = getMessagePasswordMatch($(this), passwordMatchId);
          $(this).attr('title', messagePasswordMatch).tooltip('fixTitle').tooltip('show');
        });
      }
   	}; 
})( jQuery );

function addProgessBarInformPasswordStrength(id, strengthValue) {
    var div = document.createElement('div');

    div.className = 'progress pwd-process-bar';

    var classProcessColor;
    var strengthName;

    if(isPasswordWeak(strengthValue)) {
    	strengthValue = 30;
    	classProcessColor = 'progress-bar-info';
    	strengthName = "Weak";
    } else if (isPasswordGood(strengthValue)) {
    	strengthValue = 65;
    	classProcessColor = 'progress-bar-success';
    	strengthName = "Good";
    } else {
    	strengthValue = 100;
    	classProcessColor = 'progress-bar-danger';
    	strengthName = "Strong";
    }

    var html = '<div class="progress-bar '+ classProcessColor +' progress-bar-striped" role="progressbar"'
    			+ 'aria-valuenow="'+ strengthValue +'" aria-valuemin="0" aria-valuemax="100" style="width:'+ strengthValue +'%">'+ strengthName +'</div>';

    div.innerHTML = html;

     $(id).after(div);
}

function removeProgessBarInformPasswordStrength() {
    $( ".progress" ).remove();
}

function getPasswordStrength(password) {
	if (!password) {
		return "Password is required!";
	};
	if (password.length < 8) {
		return "Password at least 8 characters!";
	}

	var countStrength = 0;
	var hasUppercaseLetterRegex = new RegExp("[A-Z]");
	var hasLowercaseLetterRegex = new RegExp("[a-z]");
	var hasSpecialLetter = new RegExp("[!@#$&*]");
	var hasDigit = new RegExp("[0-9]");
	var strengthLength = 16;

	if (hasUppercaseLetterRegex.test(password)) {
		countStrength++;
	}
	if (hasLowercaseLetterRegex.test(password)) {
		countStrength++;
	}
	if (hasSpecialLetter.test(password)) {
		countStrength++;
	}
	if (hasDigit.test(password)) {
		countStrength++;
	}
	if (password.length >= strengthLength) {
		countStrength++;
	}

	return countStrength;
}

function getMessagePasswordMatch(id, passwordMatchId) {
  var passwordVal = $('#'+ passwordMatchId).val();
  var rePasswordVal = id.val();
  if (passwordVal == rePasswordVal) {
    id.removeClass("red-tooltip");
    id.addClass("blue-tooltip");
    return "Re-password is match with password";
  } 
  id.removeClass("blue-tooltip");
  id.addClass("red-tooltip");
  return "Re-password isn't match with password";  
}

function isPasswordWeak(strengthValue) {
	return strengthValue < 3;
}
function isPasswordGood(strengthValue) {
	return strengthValue == 3;
}