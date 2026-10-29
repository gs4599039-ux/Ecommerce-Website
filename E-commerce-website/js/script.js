// Scroll Button

let topBtn = document.getElementById("topBtn");

if(topBtn){

    window.onscroll = function(){

        if(document.documentElement.scrollTop > 200){
            topBtn.style.display = "block";
        }else{
            topBtn.style.display = "none";
        }

    }

    topBtn.onclick = function(){

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}
//

const products = [

{
    id:2,
    name:"Headphone",
    price:"₹999",
    image:"images/products/product2.jpg",
    description:"High quality wireless headphone with bass and long battery backup.",
    stock:"In Stock"
},

{
    id:1,
    name:"Smart Watch",
    price:"₹1999",
    image:"images/products/product1.jpg",
    description:"Premium smart watch with fitness tracking and heart rate monitor.",
    stock:"In Stock"
},

{
    id:3,
    name:"Shoes",
    price:"₹1499",
    image:"images/products/product3.jpg",
    description:"Comfortable running shoes for daily use.",
    stock:"Only 5 Left"
},

{
    id:4,
    name:"Bag",
    price:"₹899",
    image:"images/products/product4.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:5,
    name:"Smart Phone",
    price:"₹100999",
    image:"images/products/product5.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:6,
    name:"Smart Refrigerator",
    price:"₹22999",
    image:"images/products/product6.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:7,
    name:"Men T-shirt",
    price:"₹499",
    image:"images/products/product7.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:8,
    name:"",
    price:"₹899",
    image:"images/products/product4.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:9,
    name:"Chili Powder",
    price:"₹199",
    image:"images/products/product9.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:10,
    name:"Java Programming",
    price:"₹599",
    image:"images/products/product10.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:11,
    name:"Gunaho Ka Devta",
    price:"₹299",
    image:"images/products/product11.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:12,
    name:"Poem Book",
    price:"₹199",
    image:"images/products/product12.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:13,
    name:"Children's Book MockUp",
    price:"₹599",
    image:"images/products/product13.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:14,
    name:"Cooking Oil",
    price:"₹199",
    image:"images/products/product14.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:15,
    name:"Rice",
    price:"₹399",
    image:"images/products/product15.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
},

{
    id:16,
    name:"Cheese Sauce",
    price:"₹299",
    image:"images/products/product16.jpg",
    description:"Stylish backpack with spacious storage.",
    stock:"In Stock"
}
];

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

if(productId){

    const product = products.find(item => item.id === productId);

    if(product){

        document.getElementById("product-image").src = product.image;

        document.getElementById("product-name").innerText = product.name;

        document.getElementById("product-price").innerText = product.price;

        document.getElementById("product-description").innerText = product.description;

        document.getElementById("product-stock").innerText = product.stock;

        let cartBtn = document.querySelector(".add-cart");
        let wishBtn = document.querySelector(".wishlist-btn");

        cartBtn.dataset.name = product.name;
        cartBtn.dataset.price = product.price.replace("₹","");
        cartBtn.dataset.image = product.image;

        wishBtn.dataset.name = product.name;
        wishBtn.dataset.price = product.price.replace("₹","");
        wishBtn.dataset.image = product.image;

    }

}

// Hero Slider

let slides = document.querySelectorAll(".slide");

if(slides.length > 0){

    let currentSlide = 0;

    setInterval(function(){

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if(currentSlide >= slides.length){

            currentSlide = 0;

        }

        slides[currentSlide].classList.add("active");

    },3000);

}






// Add To Cart

let cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        let product={

            name:button.dataset.name,

            price:button.dataset.price,

            image:button.dataset.image,

            quantity:1

        };

        let cart=JSON.parse(localStorage.getItem("cart")) || [];

        let existing = cart.find(item => item.name === product.name);

        if(existing){

         existing.quantity++;

        }else{

          cart.push(product);
        }

        localStorage.setItem("cart",JSON.stringify(cart));

        updateCartCount();

        alert("Product Added Successfully!");

    });

});



// Dynamic Cart


let cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

    function displayCart() {

         cart = JSON.parse(localStorage.getItem("cart")) || [];

         cartContainer.innerHTML = "";

         let total = 0;

        if(cart.length==0){

          cartContainer.innerHTML="<h3>Your Cart is Empty</h3>";

          document.getElementById("total-price").innerText="0";

          return;

        }

        cart.forEach((product, index) => {

            total += product.price * product.quantity;

            cartContainer.innerHTML += `

            <div class="cart-item">

                <img src="${product.image}" alt="${product.name}">

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>₹${product.price}</p>

                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">-</button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

                <h3>₹${product.price * product.quantity}</h3>

                <button class="remove-btn"
                onclick="removeProduct(${index})">

                Remove

                </button>

            </div>

            `;

        });

        document.getElementById("total-price").innerText = total;

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

    }

       window.increaseQuantity = function(index){

       cart[index].quantity++;

       localStorage.setItem("cart", JSON.stringify(cart));

       displayCart();

    }

       window.decreaseQuantity = function(index){

       if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

      localStorage.setItem("cart", JSON.stringify(cart));

      displayCart();

    }

      window.removeProduct = function(index){

      cart.splice(index,1);

      localStorage.setItem("cart", JSON.stringify(cart));

      displayCart();

    }

}


// Cart Count


function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(product=>{

        count += product.quantity;

    });

    let cartCount = document.getElementById("cart-count");

    if(cartCount){

        cartCount.innerText = count;

    }

}

updateCartCount();


// Search Product


let searchInput=document.getElementById("search-input");

if(searchInput){

    searchInput.addEventListener("keyup",function(){

        let value=searchInput.value.toLowerCase();

        let products=document.querySelectorAll(".search-product-card");

        products.forEach(function(product){

            let name=product.querySelector("h3").innerText.toLowerCase();

            if(name.includes(value)){

            product.style.removeProperty("display");

            }else{

            product.style.display = "none";

            }

        });

    });

}


// Category Filter

let filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0) {

    let products = document.querySelectorAll(".category-product-card");

    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            let category = this.dataset.category;

            products.forEach(function(product) {

                if (category === "all" || product.dataset.category === category) {

                    product.style.display = "block";

                } else {

                    product.style.display = "none";

                }

            });

        });

    });

}

// Checkout Order Summary

let checkoutItems=document.getElementById("checkout-items");

if(checkoutItems){

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    let total=0;

    cart.forEach(product=>{

        total+=product.price*product.quantity;

        checkoutItems.innerHTML+=`

        <div class="order-item">

            <span>${product.name} x ${product.quantity}</span>

            <span>₹${product.price*product.quantity}</span>

        </div>

        `;

    });

    document.getElementById("checkout-total").innerText=total;

}

// Checkout Validation


let checkoutForm = document.getElementById("checkout-form");

if(checkoutForm){

    checkoutForm.addEventListener("submit",function(e){

        e.preventDefault();

        let name=document.getElementById("name").value.trim();

        let email=document.getElementById("email").value.trim();

        let phone=document.getElementById("phone").value.trim();

        let address=document.getElementById("address").value.trim();

        if(name=="" || email=="" || phone=="" || address==""){

            alert("Please Fill All Fields");

            return;

        }

        if(phone.length!=10){

            alert("Enter Valid Mobile Number");

            return;

        }

       alert("Order Placed Successfully!");

          let number = "ORD" + Math.floor(100000 + Math.random() * 900000);

          localStorage.setItem("orderNumber", number);

          localStorage.removeItem("cart");

          window.location.href = "order-confirmation.html";

    });

}





// Contact Form Validation (jQuery)

$(document).ready(function () {

    $("#contact-form").submit(function (e) {

        e.preventDefault();

        let name = $("#contact-name").val().trim();
        let email = $("#contact-email").val().trim();
        let subject = $("#contact-subject").val().trim();
        let message = $("#contact-message").val().trim();

        if (name == "") {
            alert("Please Enter Name");
            $("#contact-name").focus();
            return;
        }

        if (email == "") {
            alert("Please Enter Email");
            $("#contact-email").focus();
            return;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Enter Valid Email");
            $("#contact-email").focus();
            return;
        }

        if (subject == "") {
            alert("Please Enter Subject");
            $("#contact-subject").focus();
            return;
        }

        if (message == "") {
            alert("Please Enter Message");
            $("#contact-message").focus();
            return;
        }

        alert("Message Sent Successfully!");

        $("#contact-form")[0].reset();

    });

});


       
// Product Sorting


let sortSelect = document.getElementById("sort-products");

if(sortSelect){

    sortSelect.addEventListener("change",function(){

        let container=document.querySelector(".products-list");

        let products = Array.from(document.querySelectorAll(".products-card"));

        if(this.value === "low"){

            products.sort((a,b)=>{

                return Number(a.dataset.price) -  Number(b.dataset.price);

            });

        }

        else if(this.value==="high"){

            products.sort((a,b)=>{

                return Number(b.dataset.price) - Number(a.dataset.price);

            });

        }
          // re-appending sorted products to the container
        products.forEach(product=>{

            container.appendChild(product);

        });

    });

}

// price range filter

let priceRange = document.getElementById("price-range");

if(priceRange){

    let priceValue = document.getElementById("price-value");

    priceRange.addEventListener("input",function(){

        priceValue.innerText=this.value;

        let products=document.querySelectorAll(".products-card");
           let maxPrice = Number(this.value);

        products.forEach(function(product){

            let price= Number(product.dataset.price);

            if(price<= maxPrice){

                product.style.display="";// show product

            }else{

                product.style.display="none"; // hide product

            }

        });

    });

}


// responsive navbar


const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}

// Dark Mode

let themeBtn = document.getElementById("theme-toggle");

if(themeBtn){

    if(localStorage.getItem("theme") === "dark"){

        document.body.classList.add("dark");

        themeBtn.innerHTML = "☀️";

    }

    themeBtn.addEventListener("click",function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            themeBtn.innerHTML = "☀️";

        }

        else{

            localStorage.setItem("theme","light");

            themeBtn.innerHTML = "🌙";

        }

    });

}

 // Wishlist

let wishlistBtns=document.querySelectorAll(".wishlist-btn");

wishlistBtns.forEach(button=>{

    button.addEventListener("click",()=>{

        let product={

            name:button.dataset.name,

            price:button.dataset.price,

            image:button.dataset.image

        };

        let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

        let exists = wishlist.find(item => item.name === product.name);

        if(exists){

        alert("Product Already In Wishlist");

         return;

}

wishlist.push(product);

        localStorage.setItem("wishlist",JSON.stringify(wishlist));

        alert("Added To Wishlist");

    });

});




// Wishlist Page

let wishlistContainer=document.getElementById("wishlist-items");

if(wishlistContainer){

    let wishlist=JSON.parse(localStorage.getItem("wishlist")) || [];

    if(wishlist.length==0){

        wishlistContainer.innerHTML="<h3>Your Wishlist is Empty</h3>";

    }

    else{

        wishlist.forEach((product,index)=>{

            wishlistContainer.innerHTML+=`

            <div class="wishlist-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="removeWishlist(${index})">

                    Remove

                </button>

            </div>

            `;

        });

    }

    window.removeWishlist=function(index){

        wishlist.splice(index,1);

        localStorage.setItem("wishlist",JSON.stringify(wishlist));

        location.reload();

    }

}

// rating

let ratings = document.querySelectorAll(".rating");

ratings.forEach(function(rating){

    let stars = rating.querySelectorAll(".star");
    let text = rating.querySelector(".rating-text");

    stars.forEach(function(star){
        star.addEventListener("click",function(){

            let value = Number(this.dataset.value);

            stars.forEach(function(s){

                if(Number(s.dataset.value) <= value){

                    s.classList.add("active");
                }else{
                    s.classList.remove("active");
                }
            });
            text.innerHTML = value + "/ 5 Rating";
        });
    });
});



// Order Number


let orderNumber = document.getElementById("order-number");

if(orderNumber){

    let number = localStorage.getItem("orderNumber");

    if(!number){

        number = "ORD" + Math.floor(100000 + Math.random() * 900000);

        localStorage.setItem("orderNumber", number);

    }

    orderNumber.innerText = number;

}

// Product Reviews

let reviewForm = document.getElementById("review-form");

if(reviewForm){

    let reviewList = document.getElementById("review-list");

    // Product id
    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    // Reviews load
    function loadReviews(){

        let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

        let productReviews = reviews[productId] || [];

        reviewList.innerHTML = "";

        productReviews.forEach(function(review){

            reviewList.innerHTML += `

            <div class="review-card">

                <h4>${review.name}</h4>

                <p>${review.message}</p>

            </div>

            `;

        });

    }

    loadReviews();

    // Review submit
    reviewForm.addEventListener("submit",function(e){

        e.preventDefault();

        let name = document.getElementById("review-name").value.trim();

        let message = document.getElementById("review-message").value.trim();

        if(name=="" || message==""){

            alert("Please Fill All Fields");

            return;

        }

        let reviews = JSON.parse(localStorage.getItem("reviews")) || {};

        if(!reviews[productId]){

            reviews[productId] = [];

        }

        reviews[productId].push({

            name:name,
            message:message

        });

        localStorage.setItem("reviews",JSON.stringify(reviews));

        reviewForm.reset();

        loadReviews();

        alert("Review Submitted Successfully!");

    });

}

