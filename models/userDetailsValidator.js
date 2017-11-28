module.exports = {
    emailLength: (email) => {
	if (!email) {
	    return false;
	} else if (email.length < 5 || email.length > 30) {
	    return false;
	}

	return true;
    },
    validEmail: (email) => {
	// Check if e-mail exists
	if (!email) {
	    return false; // Return error
	} else {
	    // Regular expression to test for a valid e-mail
	    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	    return regExp.test(email); // Return regular expression test results (true or false)
	}
    },
    usernameLength: (username) => {
	// Check if username exists
	if (!username) {
	    return false; // Return error
	} else {
	    // Check length of username string
	    if (username.length < 3 || username.length > 15) {
		return false; // Return error if does not meet length requirement
	    } else {
		return true; // Return as valid username
	    }
	}
    },
    validUsername: (username) => {
	// Check if username exists
	if (!username) {
	    return false; // Return error
	} else {
	    // Regular expression to test if username format is valid
	    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
	    return regExp.test(username); // Return regular expression test result (true or false)
	}
    },
    passwordLength: (password) => {
	// Check if password exists
	if (!password) {
	    return false; // Return error
	} else {
	    // Check password length
	    if (password.length < 8 || password.length > 35) {
		return false; // Return error if passord length requirement is not met
	    } else {
		return true; // Return password as valid
	    }
	}
    },
    validPassword: (password) => {
	// Check if password exists
	if (!password) {
	    return false; // Return error
	} else {
	    // Regular Expression to test if password is valid format
	    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
	    return regExp.test(password); // Return regular expression test result (true or false)
	}
    }
}
