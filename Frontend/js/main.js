document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const dobInput = form.querySelector('[name="dateOfBirth"]');
    const ageInput = form.querySelector('[name="age"]');
  
    function calculateAge(birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age.toString();
    }
  
    dobInput.addEventListener('change', (e) => {
      ageInput.value = calculateAge(e.target.value);
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
      // Handle form submission here
    });
  });