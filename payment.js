// Get query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', function () {
    const productName = getQueryParam('product') || 'Product';
    const productPrice = getQueryParam('price') || '';
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = productPrice ? `₹${productPrice}` : '';

    const form = document.getElementById('payment-form');
    const payBtn = form.querySelector('.pay-btn');
    const successMsg = document.getElementById('success-message');
    const cardInput = document.getElementById('card');

    // Add focus effect to inputs (handled by CSS, but can add JS if needed)
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 2px #0071e3';
        });
        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
        });
    });

    function showPopup(message) {
        let popup = document.createElement('div');
        popup.className = 'popup-message';
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 2000);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Card number validation
        const cardValue = cardInput.value.replace(/\D/g, '');
        if (cardValue.length < 16) {
            showPopup('Invalid card number');
            cardInput.focus();
            return;
        }
        // Disable form and show loading spinner
        payBtn.disabled = true;
        payBtn.innerHTML = '<span class="spinner"></span> Processing...';
        form.querySelectorAll('input').forEach(input => input.disabled = true);
        // Simulate payment processing
        setTimeout(() => {
            form.style.display = 'none';
            successMsg.textContent = 'Payment successful! Thank you for your purchase.';
            successMsg.style.display = 'block';
        }, 1800);
    });
}); 