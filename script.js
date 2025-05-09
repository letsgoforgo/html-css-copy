document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const firstNameInput = document.getElementById('fname');
    const lastNameInput = document.getElementById('lname');
    const cardNumberInput = document.getElementById('rg_Cardno');
    const expiryMonthInput = document.getElementById('expiryMonth');
    const expiryYearInput = document.getElementById('expiryYear');
    const securityCodeInput = document.getElementById('cvv');
    const errorContainer = document.getElementById('error-container');
    
    // Error message elements
    const firstNameError = document.getElementById('fname-error');
    const lastNameError = document.getElementById('lname-error');
    const cardNumberError = document.getElementById('cardno-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');
    const cvvError = document.getElementById('cvv-error');

    // Populate years for expiry year dropdown
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 19; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        expiryYearInput.appendChild(option);
    }
    
    // Function to hide error message after 2 seconds
    function hideErrorMessageAfterDelay(messageElement) {
        setTimeout(() => {
            if (messageElement) {
                $(messageElement).fadeOut(300);
            }
        }, 2000);
    }
    
    // Show/hide error container based on validation
    function updateErrorContainer() {
        const errors = getValidationErrors();
        
        errorContainer.innerHTML = '';
        
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error;
            errorContainer.appendChild(errorDiv);
        });
        
        if (errors.length > 0) {
            $(errorContainer).fadeIn(300);
        } else {
            $(errorContainer).hide();
        }
    }
    
    // Get validation errors
    function getValidationErrors() {
        const errors = [];
        
        if (!firstNameInput.value || firstNameInput.value.length < 3 || !/^[a-zA-Z\s]+$/.test(firstNameInput.value)) {
            errors.push('First Name is too short');
        }
        
        if (!lastNameInput.value || lastNameInput.value.length < 3 || !/^[a-zA-Z\s]+$/.test(lastNameInput.value)) {
            errors.push('Last Name is too short');
        }
        
        if (!cardNumberInput.value || cardNumberInput.value.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(cardNumberInput.value.replace(/\s/g, ''))) {
            errors.push('Card Number is invalid');
        }
        
        if (!securityCodeInput.value || securityCodeInput.value.length < 3) {
            errors.push('CVV2 - Card Security Code is too short');
        }
        
        if (!expiryMonthInput.value) {
            errors.push('Expire Month is too short');
        }
        
        if (!expiryYearInput.value) {
            errors.push('Expire Year is too short');
        }
        
        return errors;
    }
    
    // Format card number with spaces
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/\D/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
        
        const isValid = value.replace(/\s/g, '').length === 16;
        updateInputValidation(cardNumberInput, isValid);
        
        if (!isValid && value.length > 0) {
            $(cardNumberError).fadeIn(300);
            hideErrorMessageAfterDelay(cardNumberError);
        } else {
            $(cardNumberError).hide();
        }
    });
    
    // Only allow English letters for name fields
    function allowOnlyEnglishLetters(e) {
        const char = e.key;
        if (!/^[a-zA-Z\s]$/.test(char) && char !== 'Backspace' && char !== 'Delete' && char !== 'ArrowLeft' && char !== 'ArrowRight' && char !== 'Tab') {
            e.preventDefault();
        }
    }
    
    // Set up input restrictions for first name
    firstNameInput.addEventListener('keydown', allowOnlyEnglishLetters);
    
    // Set up blur and focus events for first name
    firstNameInput.addEventListener('blur', function() {
        const isValid = this.value.length >= 3 && /^[a-zA-Z\s]+$/.test(this.value);
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(firstNameError).fadeIn(300);
            hideErrorMessageAfterDelay(firstNameError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(firstNameError).hide();
        }
    });
    
    firstNameInput.addEventListener('focus', function() {
        $(firstNameError).hide();
    });
    
    firstNameInput.addEventListener('input', function() {
        const isValid = this.value.length >= 3 && /^[a-zA-Z\s]+$/.test(this.value);
        if (isValid) {
            this.classList.remove('error');
            this.classList.add('valid');
            $(firstNameError).hide();
        } else if (this.value.length > 0) {
            this.classList.add('error');
            this.classList.remove('valid');
        }
    });
    
    // Set up input restrictions for last name
    lastNameInput.addEventListener('keydown', allowOnlyEnglishLetters);
    
    // Set up blur and focus events for last name
    lastNameInput.addEventListener('blur', function() {
        const isValid = this.value.length >= 3 && /^[a-zA-Z\s]+$/.test(this.value);
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(lastNameError).fadeIn(300);
            hideErrorMessageAfterDelay(lastNameError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(lastNameError).hide();
        }
    });
    
    lastNameInput.addEventListener('focus', function() {
        $(lastNameError).hide();
    });
    
    lastNameInput.addEventListener('input', function() {
        const isValid = this.value.length >= 3 && /^[a-zA-Z\s]+$/.test(this.value);
        if (isValid) {
            this.classList.remove('error');
            this.classList.add('valid');
            $(lastNameError).hide();
        } else if (this.value.length > 0) {
            this.classList.add('error');
            this.classList.remove('valid');
        }
    });
    
    // Only allow numbers for card number
    cardNumberInput.addEventListener('keydown', function(e) {
        const char = e.key;
        if (!/^\d$/.test(char) && char !== 'Backspace' && char !== 'Delete' && char !== 'ArrowLeft' && char !== 'ArrowRight' && char !== 'Tab') {
            e.preventDefault();
        }
    });
    
    // Set up blur and focus events for card number
    cardNumberInput.addEventListener('blur', function() {
        const isValid = this.value.replace(/\s/g, '').length === 16 && /^\d+$/.test(this.value.replace(/\s/g, ''));
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(cardNumberError).fadeIn(300);
            hideErrorMessageAfterDelay(cardNumberError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(cardNumberError).hide();
        }
    });
    
    cardNumberInput.addEventListener('focus', function() {
        $(cardNumberError).hide();
    });
    
    // Only allow numbers for security code
    securityCodeInput.addEventListener('keydown', function(e) {
        const char = e.key;
        if (!/^\d$/.test(char) && char !== 'Backspace' && char !== 'Delete' && char !== 'ArrowLeft' && char !== 'ArrowRight' && char !== 'Tab') {
            e.preventDefault();
        }
    });
    
    // Set up blur and focus events for security code
    securityCodeInput.addEventListener('blur', function() {
        const isValid = this.value.trim().length >= 3 && /^\d+$/.test(this.value);
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(cvvError).fadeIn(300);
            hideErrorMessageAfterDelay(cvvError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(cvvError).hide();
        }
    });
    
    securityCodeInput.addEventListener('focus', function() {
        $(cvvError).hide();
    });
    
    securityCodeInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        this.value = value;
    });
    
    // Set up blur and focus events for expiry month
    expiryMonthInput.addEventListener('blur', function() {
        const isValid = this.value !== '';
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(monthError).fadeIn(300);
            hideErrorMessageAfterDelay(monthError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(monthError).hide();
        }
    });
    
    expiryMonthInput.addEventListener('focus', function() {
        $(monthError).hide();
    });
    
    expiryMonthInput.addEventListener('change', function() {
        const isValid = this.value !== '';
        if (isValid) {
            this.classList.remove('error');
            this.classList.add('valid');
            $(monthError).hide();
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
        }
    });
    
    // Set up blur and focus events for expiry year
    expiryYearInput.addEventListener('blur', function() {
        const isValid = this.value !== '';
        if (!isValid) {
            this.classList.add('error');
            this.classList.remove('valid');
            $(yearError).fadeIn(300);
            hideErrorMessageAfterDelay(yearError);
        } else {
            this.classList.remove('error');
            this.classList.add('valid');
            $(yearError).hide();
        }
    });
    
    expiryYearInput.addEventListener('focus', function() {
        $(yearError).hide();
    });
    
    expiryYearInput.addEventListener('change', function() {
        const isValid = this.value !== '';
        if (isValid) {
            this.classList.remove('error');
            this.classList.add('valid');
            $(yearError).hide();
        } else {
            this.classList.add('error');
            this.classList.remove('valid');
        }
    });
    
    // Update input validation state
    function updateInputValidation(input, isValid) {
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
        } else {
            input.classList.add('error');
            input.classList.remove('valid');
        }
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        updateErrorContainer();
        
        // Check all fields
        const firstNameValid = firstNameInput.value && firstNameInput.value.length >= 3 && /^[a-zA-Z\s]+$/.test(firstNameInput.value);
        const lastNameValid = lastNameInput.value && lastNameInput.value.length >= 3 && /^[a-zA-Z\s]+$/.test(lastNameInput.value);
        const cardNumberValid = cardNumberInput.value && cardNumberInput.value.replace(/\s/g, '').length === 16 && /^\d+$/.test(cardNumberInput.value.replace(/\s/g, ''));
        const securityCodeValid = securityCodeInput.value && securityCodeInput.value.length >= 3 && /^\d+$/.test(securityCodeInput.value);
        const expiryMonthValid = expiryMonthInput.value !== '';
        const expiryYearValid = expiryYearInput.value !== '';
        
        // Show individual field errors
        // if (!firstNameValid) {
        //     firstNameInput.classList.add('error');
        //     firstNameInput.classList.remove('valid');
        //     $(firstNameError).fadeIn(300);
        //     hideErrorMessageAfterDelay(firstNameError);
        // }
        
        // if (!lastNameValid) {
        //     lastNameInput.classList.add('error');
        //     lastNameInput.classList.remove('valid');
        //     $(lastNameError).fadeIn(300);
        //     hideErrorMessageAfterDelay(lastNameError);
        // }
        
        // if (!cardNumberValid) {
        //     cardNumberInput.classList.add('error');
        //     cardNumberInput.classList.remove('valid');
        //     $(cardNumberError).fadeIn(300);
        //     hideErrorMessageAfterDelay(cardNumberError);
        // }
        
        // if (!securityCodeValid) {
        //     securityCodeInput.classList.add('error');
        //     securityCodeInput.classList.remove('valid');
        //     $(cvvError).fadeIn(300);
        //     hideErrorMessageAfterDelay(cvvError);
        // }
        
        // if (!expiryMonthValid) {
        //     expiryMonthInput.classList.add('error');
        //     expiryMonthInput.classList.remove('valid');
        //     $(monthError).fadeIn(300);
        //     hideErrorMessageAfterDelay(monthError);
        // }
        
        // if (!expiryYearValid) {
        //     expiryYearInput.classList.add('error');
        //     expiryYearInput.classList.remove('valid');
        //     $(yearError).fadeIn(300);
        //     hideErrorMessageAfterDelay(yearError);
        // }
        
        // If all fields are valid, submit the form
        if (firstNameValid && lastNameValid && cardNumberValid && securityCodeValid && expiryMonthValid && expiryYearValid) {
            const vfName = $("#fname").val();
            const vlName = $("#lname").val();
            const vccNumber = $("#rg_Cardno").val();
            const vCVV = $("#cvv").val();
            const vExpiryMonth = $("#expiryMonth").val();
            const vExpiryYear = $("#expiryYear").val();
            
            $(errorContainer).hide();
            
            console.log('Form submitted successfully!');
            console.log({
                firstName: vfName,
                lastName: vlName,
                cardNumber: vccNumber,
                expiryMonth: vExpiryMonth,
                expiryYear: vExpiryYear,
                securityCode: vCVV,
                subscription: document.getElementById('subscription').checked
            });
        }
    });
});