// script.js
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-card button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Product added to cart!");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-card button  ");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const clearCartButton = document.getElementById("clear-cart");

    let cart = [];

    // Function to add product to cart
    const addToCart = (productName, productPrice) => {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        renderCart();
    };

    // Function to render cart items
    const renderCart = () => {
        cartItemsContainer.innerHTML = ""; // Clear current cart display

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        updateTotal();
    };

    // Function to update total price
    const updateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalPrice.textContent = total.toFixed(2);
    };

    // Clear cart
    clearCartButton.addEventListener("click", () => {
        cart = [];
        renderCart();
    });

    // Attach event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-card");
            const bioCard = event.target.closest(".bio-card");

            const productName = productCard.querySelector("h3").textContent;
            const productPrice = parseFloat(productCard.querySelector("p").textContent.replace("$", ""));

            addToCart(productName, productPrice);
        });
    });
});
