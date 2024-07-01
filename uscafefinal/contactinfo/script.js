document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields.');
        } else {
            // You can perform further actions, like AJAX form submission, here.
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
});
