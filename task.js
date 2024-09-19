const cartProducts = document.querySelector(".cart__products");
const products = document.querySelectorAll(".product");
const cart = document.querySelector(".cart");

cart.style.display = "none";

const visibility = function () {
  const productsInCart = document.querySelectorAll(".cart__product");
  if (productsInCart.length > 0) {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
};

products.forEach(product => {

  const downBtn = product.querySelector(".product__quantity-control_dec");
  const upBtn = product.querySelector(".product__quantity-control_inc");
  const prodQuantity = product.querySelector(".product__quantity-value");

  const id = product.getAttribute("data-id");

  upBtn.addEventListener("click", () => {
    prodQuantity.textContent = Number(prodQuantity.textContent) + 1;
  });

  downBtn.addEventListener("click", () => {
    prodQuantity.textContent = Math.max(1, Number(prodQuantity.textContent) - 1);
  });

  const addProduct = product.querySelector(".product__add");

  addProduct.addEventListener("click", () => {
    visibility();

    const cartItems = Array.from(document.querySelectorAll(".cart__product"));
    
    const productInCart = cartItems.find(item => item.getAttribute("data-id") === id);

    if (productInCart) {

      const currCount = productInCart.querySelector(".cart__product-count");
      currCount.textContent = Number(currCount.textContent) + Number(prodQuantity.textContent);
    } else {

      const newDiv = document.createElement("div");
      newDiv.classList.add("cart__product");
      newDiv.setAttribute("data-id", id);

      const newImg = document.createElement("img");
      newImg.classList.add("cart__product-image");
      newImg.src = product.querySelector("img").src;
      newDiv.appendChild(newImg);

      const divCount = document.createElement("div");
      divCount.classList.add("cart__product-count");
      divCount.textContent = prodQuantity.textContent;
      newDiv.appendChild(divCount);

      cartProducts.appendChild(newDiv);
    }

    visibility(); 
  });
});