module.exports = {
    titleLengthValidator: (title) => {
	if (!title) {
	    return false;
	} else if (email.length < 5 || title.length > 50) {
	    return false;
	}

	return true;
    },
    bodyLengthValidator: (body) => {
	// Check if username exists
	if (!body) {
	    return false; // Return error
	} else {
	    // Check length of username string
	    if (body.length < 5 || body.length > 2000) {
		return false; // Return error if does not meet length requirement
	    } else {
		return true; // Return as valid username
	    }
	}
    },
    commentLengthValidator: (comment) => {
	// Check if username exists
	if (!comment) {
	    return false; // Return error
	} else {
	    // Check length of username string
	    if (comment[0].length < 5 || comment[0].length > 2000) {
		return false; // Return error if does not meet length requirement
	    } else {
		return true; // Return as valid username
	    }
	}
    }
}
