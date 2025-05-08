document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    const cardNumberInput = document.getElementById('card-number');
    const expiryMonthInput = document.getElementById('expiry-month');
    const expiryYearInput = document.getElementById('expiry-year');
    const securityCodeInput = document.getElementById('security-code');
    
    // Format card number with spaces
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });
    
    // Limit expiry month to 2 digits and validate (01-12)
    expiryMonthInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2);
        }
        if (value.length === 2 && (parseInt(value) < 1 || parseInt(value) > 12)) {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
        e.target.value = value;
    });
    
    // Limit expiry year to 4 digits
    expiryYearInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        e.target.value = value;
    });
    
    // Limit security code to 4 digits
    securityCodeInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        e.target.value = value;
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const requiredFields = [
            document.getElementById('first-name'),
            document.getElementById('last-name'),
            cardNumberInput,
            expiryMonthInput,
            expiryYearInput,
            securityCodeInput
        ];
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            alert('Form submitted successfully!');
            // In a real application, you would send the data to a server here
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });
});