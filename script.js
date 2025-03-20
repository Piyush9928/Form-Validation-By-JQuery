$(document).ready(function() {
    // Simulated database of registered users
    const users = [];

    // Toggle between Sign Up and Login forms
    $('#toggle-form').on('click', function() {
        if ($('#signup-form-container').is(':visible')) {
            $('#signup-form-container').hide();
            $('#login-form-container').show();
            $('#toggle-form').text("Don't have an account? Sign Up");
        } else {
            $('#login-form-container').hide();
            $('#signup-form-container').show();
            $('#toggle-form').text("Already have an account? Log In");
        }
    });

    // Sign Up Form Validation and Process
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error and status messages
        $('.error').hide();
        $('#signup-status').hide();

        let valid = true;
        const email = $('#signup-email').val();
        const password = $('#signup-password').val();

        // Validate Email
        if (email.trim() === '') {
            $('#signup-email-error').text('Email is required').show();
            valid = false;
        } else if (!validateEmail(email)) {
            $('#signup-email-error').text('Please enter a valid email address').show();
            valid = false;
        }

        // Validate Password
        if (password.trim() === '') {
            $('#signup-password-error').text('Password is required').show();
            valid = false;
        }

        // If the form is valid, check if the user is already registered
        if (valid) {
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                $('#signup-status').text('Email is already registered').css('color', 'red').show();
            } else {
                users.push({ email, password });
                $('#signup-status').text('Registration successful!').css('color', 'green').show();
                $('#signup-email').val('');
                $('#signup-password').val('');
            }
        }
    });

    // Login Form Validation and Process
    $('#login-form').on('submit', function(e) {
        e.preventDefault();

        // Clear previous error and status messages
        $('.error').hide();
        $('#login-status').hide();

        let valid = true;
        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Validate Email
        if (email.trim() === '') {
            $('#login-email-error').text('Email is required').show();
            valid = false;
        } else if (!validateEmail(email)) {
            $('#login-email-error').text('Please enter a valid email address').show();
            valid = false;
        }

        // Validate Password
        if (password.trim() === '') {
            $('#login-password-error').text('Password is required').show();
            valid = false;
        }

        // If the form is valid, check login credentials
        if (valid) {
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                $('#login-status').text('Login successful!').css('color', 'green').show();
            } else {
                $('#login-status').text('Invalid email or password').css('color', 'red').show();
            }
        }
    });

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
});
