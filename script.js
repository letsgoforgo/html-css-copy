document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const firstNameInput = document.getElementById('fname');
    const lastNameInput = document.getElementById('lname');
    const cardNumberInput = document.getElementById('rg_Cardno');
    const expiryMonthInput = document.getElementById('expiryMonth');
    const expiryYearInput = document.getElementById('expiryYear');
    const securityCodeInput = document.getElementById('cvv');
    const errorContainer = document.getElementById('error-container');
    const nameInputsContainer = document.querySelector('.name-inputs');
    
    // Populate years for expiry year dropdown
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 19; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        expiryYearInput.appendChild(option);
    }
    
    // Show/hide error container based on validation
    function updateErrorContainer() {
        const errors = getValidationErrors();
        
        // Clear previous error messages
        errorContainer.innerHTML = '';
        
        // Add new error messages
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error;
            errorContainer.appendChild(errorDiv);
        });
        
        // Show/hide container
        errorContainer.style.display = errors.length > 0 ? 'block' : 'none';
    }
    
    // Get validation errors
    function getValidationErrors() {
        const errors = [];
        
        if (!firstNameInput.value || firstNameInput.value.length < 3) {
            errors.push('First Name is too short');
        }
        
        if (!lastNameInput.value || lastNameInput.value.length < 3) {
            errors.push('Last Name is too short');
        }
        
        if (!cardNumberInput.value || !isValidCreditCard(cardNumberInput.value.replace(/\s/g, ''))) {
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
    
    // Credit card validation using Luhn algorithm
    function isValidCreditCard(cardNumber) {
        if (!cardNumber || !/^\d+$/.test(cardNumber)) return false;
        
        let sum = 0;
        let shouldDouble = false;
        
        // Loop through values starting from the rightmost digit
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return sum % 10 === 0;
    }
    
    // Format card number with spaces
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
        
        // Update validation state
        updateInputValidation(cardNumberInput, isValidCreditCard(value.replace(/\s/g, '')));
    });
    
    // Handle blur events for showing mandatory messages
    function handleBlur(input, container) {
        const mandatoryMessage = container.querySelector('.mandatory-message');
        if (!input.value.trim()) {
            mandatoryMessage.style.display = 'block';
            if (input === firstNameInput || input === lastNameInput) {
                nameInputsContainer.classList.add('invalid');
            } else {
                input.classList.add('error');
            }
            
            if (container.querySelector('.invalid-icon')) {
                container.querySelector('.invalid-icon').style.display = 'block';
            }
            if (container.querySelector('.valid-icon')) {
                container.querySelector('.valid-icon').style.display = 'none';
            }
        } else {
            mandatoryMessage.style.display = 'none';
        }
    }
    
    // Handle focus events for hiding mandatory messages
    function handleFocus(container) {
        const mandatoryMessage = container.querySelector('.mandatory-message');
        mandatoryMessage.style.display = 'none';
    }
    
    // Update input validation state
    function updateInputValidation(input, isValid) {
        let container;
        
        if (input === firstNameInput) {
            container = firstNameInput.closest('.input-container');
        } else if (input === lastNameInput) {
            container = lastNameInput.closest('.input-container');
        } else if (input === cardNumberInput) {
            container = cardNumberInput.closest('.card-number-container');
        } else if (input === securityCodeInput) {
            container = securityCodeInput.closest('.security-code-container');
        } else if (input === expiryMonthInput || input === expiryYearInput) {
            container = input.closest('.select-container');
        }
        
        if (container) {
            const validIcon = container.querySelector('.valid-icon');
            const invalidIcon = container.querySelector('.invalid-icon');
            
            if (isValid) {
                if (input === firstNameInput || input === lastNameInput) {
                    input.style.borderColor = '#00c853';
                } else {
                    input.classList.remove('error');
                }
                
                if (validIcon) validIcon.style.display = 'block';
                if (invalidIcon) invalidIcon.style.display = 'none';
            } else {
                if (input === firstNameInput || input === lastNameInput) {
                    input.style.borderColor = '#e53935';
                } else {
                    input.classList.add('error');
                }
                
                if (validIcon) validIcon.style.display = 'none';
                if (invalidIcon) invalidIcon.style.display = 'block';
            }
        } else {
            if (isValid) {
                input.classList.remove('error');
            } else {
                input.classList.add('error');
            }
        }
    }
    
    // Set up blur and focus events for first name
    firstNameInput.addEventListener('blur', function() {
        handleBlur(this, this.closest('.input-container'));
    });
    
    firstNameInput.addEventListener('focus', function() {
        handleFocus(this.closest('.input-container'));
    });
    
    firstNameInput.addEventListener('input', function() {
        const isValid = this.value.length >= 3;
        updateInputValidation(this, isValid);
    });
    
    // Set up blur and focus events for last name
    lastNameInput.addEventListener('blur', function() {
        handleBlur(this, this.closest('.input-container'));
    });
    
    lastNameInput.addEventListener('focus', function() {
        handleFocus(this.closest('.input-container'));
    });
    
    lastNameInput.addEventListener('input', function() {
        const isValid = this.value.length >= 3;
        updateInputValidation(this, isValid);
    });
    
    // Set up blur and focus events for card number
    cardNumberInput.addEventListener('blur', function() {
        const container = this.closest('.card-number-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        if (!this.value.trim() || !isValidCreditCard(this.value.replace(/\s/g, ''))) {
            mandatoryMessage.style.display = 'block';
            this.classList.add('error');
        } else {
            mandatoryMessage.style.display = 'none';
            this.classList.remove('error');
        }
    });
    
    cardNumberInput.addEventListener('focus', function() {
        const container = this.closest('.card-number-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        mandatoryMessage.style.display = 'none';
    });
    
    // Set up blur and focus events for security code
    securityCodeInput.addEventListener('blur', function() {
        const container = this.closest('.security-code-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        if (!this.value.trim() || this.value.length < 3) {
            mandatoryMessage.style.display = 'block';
            this.classList.add('error');
        } else {
            mandatoryMessage.style.display = 'none';
            this.classList.remove('error');
        }
    });
    
    securityCodeInput.addEventListener('focus', function() {
        const container = this.closest('.security-code-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        mandatoryMessage.style.display = 'none';
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
        const container = this.closest('.select-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        if (!this.value) {
            mandatoryMessage.style.display = 'block';
            this.classList.add('error');
        } else {
            mandatoryMessage.style.display = 'none';
            this.classList.remove('error');
        }
    });
    
    expiryMonthInput.addEventListener('focus', function() {
        const container = this.closest('.select-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        mandatoryMessage.style.display = 'none';
    });
    
    // Set up blur and focus events for expiry year
    expiryYearInput.addEventListener('blur', function() {
        const container = this.closest('.select-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        if (!this.value) {
            mandatoryMessage.style.display = 'block';
            this.classList.add('error');
        } else {
            mandatoryMessage.style.display = 'none';
            this.classList.remove('error');
        }
    });
    
    expiryYearInput.addEventListener('focus', function() {
        const container = this.closest('.select-container');
        const mandatoryMessage = container.querySelector('.mandatory-message');
        mandatoryMessage.style.display = 'none';
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show error messages
        updateErrorContainer();
        
        // Check all fields
        const firstNameValid = firstNameInput.value && firstNameInput.value.length >= 3;
        const lastNameValid = lastNameInput.value && lastNameInput.value.length >= 3;
        const cardNumberValid = cardNumberInput.value && isValidCreditCard(cardNumberInput.value.replace(/\s/g, ''));
        const securityCodeValid = securityCodeInput.value && securityCodeInput.value.length >= 3;
        const expiryMonthValid = expiryMonthInput.value !== '';
        const expiryYearValid = expiryYearInput.value !== '';
        
        // Update validation state for all fields
        updateInputValidation(firstNameInput, firstNameValid);
        updateInputValidation(lastNameInput, lastNameValid);
        
        // Show mandatory messages for invalid fields
        if (!firstNameValid) {
            const container = firstNameInput.closest('.input-container');
            container.querySelector('.mandatory-message').style.display = 'block';
            container.querySelector('.invalid-icon').style.display = 'block';
        }
        
        if (!lastNameValid) {
            const container = lastNameInput.closest('.input-container');
            container.querySelector('.mandatory-message').style.display = 'block';
            container.querySelector('.invalid-icon').style.display = 'block';
        }
        
        if (!cardNumberValid) {
            const container = cardNumberInput.closest('.card-number-container');
            container.querySelector('.mandatory-message').style.display = 'block';
        }
        
        if (!securityCodeValid) {
            const container = securityCodeInput.closest('.security-code-container');
            container.querySelector('.mandatory-message').style.display = 'block';
        }
        
        if (!expiryMonthValid) {
            const container = expiryMonthInput.closest('.select-container');
            container.querySelector('.mandatory-message').style.display = 'block';
        }
        
        if (!expiryYearValid) {
            const container = expiryYearInput.closest('.select-container');
            container.querySelector('.mandatory-message').style.display = 'block';
        }
        
        // If all fields are valid, submit the form
        if (firstNameValid && lastNameValid && cardNumberValid && securityCodeValid && expiryMonthValid && expiryYearValid) {
            // In a real application, you would send the data to a server here
            console.log('Form submitted successfully!');
            console.log({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                cardNumber: cardNumberInput.value,
                expiryMonth: expiryMonthInput.value,
                expiryYear: expiryYearInput.value,
                securityCode: securityCodeInput.value,
                subscription: document.getElementById('subscription').checked
            });
        }
    });
});