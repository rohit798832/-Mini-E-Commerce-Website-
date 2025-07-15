document.addEventListener('DOMContentLoaded', function () {
    const cartItemsDiv = document.getElementById('cart-page-items');
    const cartTotal = document.getElementById('cart-page-total');
    const cartBadge = document.getElementById('cart-badge');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    function updateCartBadge() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = count;
    }
    function renderCart() {
        const cart = getCart();
        cartItemsDiv.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<div style="text-align:center;color:#888;margin-top:2rem;">Your cart is empty.</div>';
        } else {
            cart.forEach(item => {
                total += item.price * item.qty;
                cartItemsDiv.innerHTML += `
                <div class="cart-page-item">
                    <img src="${item.img}" class="cart-page-item-img" alt="${item.name}">
                    <div class="cart-page-item-details">
                        <div class="cart-page-item-title">${item.name}</div>
                        <div class="cart-page-item-price">₹${item.price}</div>
                        <div class="cart-page-item-qty">Qty: ${item.qty}</div>
                    </div>
                    <button class="remove-cart-item" data-name="${encodeURIComponent(item.name)}" title="Remove">&times;</button>
                </div>`;
            });
        }
        cartTotal.textContent = cart.length ? `Total: ₹${total}` : '';
        // Add event listeners for remove buttons
        Array.from(document.querySelectorAll('.remove-cart-item')).forEach(btn => {
            btn.addEventListener('click', function() {
                const name = decodeURIComponent(btn.getAttribute('data-name'));
                let cart = getCart();
                cart = cart.filter(item => item.name !== name);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartBadge();
                renderCart();
            });
        });
        return total;
    }
    updateCartBadge();
    renderCart();

    // Checkout button functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = `payment.html?product=Cart%20Checkout&price=${total}`;
        });
    }
}); 