// Age calculation based on Date of Birth
document.getElementById('dob').addEventListener('change', function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    document.getElementById('age').value = age;
});

// Form validation and submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let formIsValid = true;

    // Check if all required fields are filled
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
            formIsValid = false;
            field.style.borderColor = 'red'; // Mark invalid fields
        } else {
            field.style.borderColor = ''; // Reset border if valid
        }
    });

    if (formIsValid) {
        // If the form is valid, process the form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Replace with API submission or form data processing logic
        console.log('Form submitted successfully:', data);
        alert('Form submitted successfully!');
    } else {
        alert('Please fill in all required fields.');
    }
});
