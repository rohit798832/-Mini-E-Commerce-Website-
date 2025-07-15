// Responsive navigation menu for mobile
// This script adds a hamburger menu for small screens

document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    if (hamburger && navUl) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
        // Optional: close menu when a link is clicked
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navUl.classList.remove('active');
            });
        });
    }

    // Dropdown for Deals on mobile/tablet
    const dealsDropdown = document.querySelector('.dropdown');
    const dealsDropbtn = document.querySelector('.dropbtn');
    if (dealsDropdown && dealsDropbtn) {
        dealsDropbtn.addEventListener('click', function (e) {
            if (window.innerWidth <= 800) {
                e.preventDefault();
                dealsDropdown.classList.toggle('show-dropdown');
            }
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 800 && !dealsDropdown.contains(e.target)) {
                dealsDropdown.classList.remove('show-dropdown');
            }
        });
    }

    // Buy button: redirect to payment page with product and price
    Array.from(document.querySelectorAll('.buy-btn')).forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const product = encodeURIComponent(btn.getAttribute('data-product'));
            const price = encodeURIComponent(btn.getAttribute('data-price'));
            window.location.href = `payment.html?product=${product}&price=${price}`;
        });
    });

    // Add to Cart functionality for all .cart-btn buttons
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) cartBadge.textContent = count;
    }
    Array.from(document.querySelectorAll('.cart-btn')).forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').textContent;
            const price = parseInt(card.querySelector('p').textContent.replace(/[^\d]/g, ''));
            const img = card.querySelector('img') ? card.querySelector('img').src : '';
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
        });
    });
    // Initialize cart badge on page load
    updateCartBadge();

    const accountLink = document.getElementById('account-link');
    if (accountLink) {
        accountLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = accountLink.href;
            }, 500);
        });
    }
}); 