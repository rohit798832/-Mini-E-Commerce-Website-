// Handle sign-in form submission
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const remember = document.getElementById('remember-me').checked;
    alert(`Sign in attempted for: ${email}\nRemember me: ${remember}`);
});

// Handle order lookup form submission
const orderLookupForm = document.getElementById('orderLookupForm');
orderLookupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const orderNumber = document.getElementById('order-number').value;
    const orderEmail = document.getElementById('order-email').value;
    alert(`Order lookup for:\nOrder #: ${orderNumber}\nEmail: ${orderEmail}`);
}); 