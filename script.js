$(document).ready(function() {
	$('#password').convertToPasswordField();
});

(function($){
   $.fn.convertToPasswordField = function() {
      	$(this).attr("type", "password");
	    var feedback = $(this).attr("feedback");
	    if(feedback) {
      		$(this).bind('input propertychange', function() {
      			var password = $(this).val();
      			var strengthOfPassword = getPasswordStrength(password);
      			$(this).attr('title', strengthOfPassword).tooltip('fixTitle').tooltip('show')
    		});
      	}
   	}; 
})( jQuery );

function getPasswordStrength(password) {
	if (!password) {
		return "Password is required!";
	};
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

	if (countStrength < 3) {
		return "Weak password";
	}
	if (countStrength == 3) {
		return "Good password";
	}
	return "Strong password";
}