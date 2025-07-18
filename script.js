
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "none";
    }
  
    
    AOS.init({
      duration: 1000,
      once: true,
    });
  
    
    let cartCount = 0;
    const cartCountSpan = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".product-card button");
  
    addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        cartCount++;
        cartCountSpan.textContent = cartCount;
        button.textContent = "Added!";
        button.disabled = true;
  
        setTimeout(() => {
          button.textContent = "Add to Cart";
          button.disabled = false;
        }, 1000);
      });
    });
  
    //  Login / Signup Modal (Optional - Only if modal exists)
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.getElementById("closeModal");
  
    if (loginBtn && loginModal && closeModal) {
      loginBtn.addEventListener("click", () => {
        loginModal.style.display = "block";
      });
  
      closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
      });
  
      window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
          loginModal.style.display = "none";
        }
      });
    }

    //  Login / Signup Button Functionality
const loginBtnSubmit = document.querySelector("#login .modal-btn");
const signupBtnSubmit = document.querySelector("#signup .modal-btn");

loginBtnSubmit.addEventListener("click", () => {
  const email = document.querySelector("#login input[type='email']").value;
  const password = document.querySelector("#login input[type='password']").value;

  if (email && password) {
    alert("Login successful!");
    loginModal.style.display = "none";
  } else {
    alert("Please enter both email and password.");
  }
});

signupBtnSubmit.addEventListener("click", () => {
  const name = document.querySelector("#signup input[type='text']").value;
  const email = document.querySelector("#signup input[type='email']").value;
  const password = document.querySelector("#signup input[type='password']").value;

  if (name && email && password) {
    alert("Signup successful!");
    loginModal.style.display = "none";
  } else {
    alert("Please fill all signup fields.");
  }
});




  
    //  Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTop");
  
    if (scrollToTopBtn) {
      window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
      });
  
      scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  
    //  Toggle between Login and Signup Tabs
    window.showTab = function (tab) {
      const loginTab = document.getElementById("login");
      const signupTab = document.getElementById("signup");
      const tabButtons = document.querySelectorAll(".tab-btn");
  
      if (tab === "login") {
        loginTab.style.display = "block";
        signupTab.style.display = "none";
        tabButtons[0].classList.add("active");
        tabButtons[1].classList.remove("active");
      } else {
        loginTab.style.display = "none";
        signupTab.style.display = "block";
        tabButtons[0].classList.remove("active");
        tabButtons[1].classList.add("active");
      }
    };
  });

  //  Product Search Functionality
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  productCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(searchText)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  let anyVisible = false;

  productCards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(searchText)) {
      card.style.display = "block";
      anyVisible = true;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = anyVisible ? "none" : "block";
});

function displayCartItems() {
    const cartItemsList = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    cartItemsList.innerHTML = '';
  
    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
      return;
    }
  
    emptyCartMessage.style.display = 'none';
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${item.image}" alt="${item.name}" width="50"> ${item.name} - ${item.price}`;
      cartItemsList.appendChild(li);
    });
  }

  document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
    document.getElementById('cartDisplay').style.display = 'block';
    displayCartItems();
  });
  
  function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProduct = cart.find(product => product.name === name);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to cart!");
  }

  // Mock data for cart items
const cartItems = [
    { id: 1, name: "Product 1", price: 100, quantity: 2 },
    { id: 2, name: "Product 2", price: 200, quantity: 1 }
];

// Function to load cart items
function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Clear the cart
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    document.getElementById('total-price').textContent = `₹${totalPrice}`;
}

// Function to remove an item
function removeItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index > -1) {
        cartItems.splice(index, 1);
        loadCartItems(); // Reload the cart after removal
    }
}

loadCartItems(); // Initial load of cart items

  