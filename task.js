const cartProducts = document.querySelector(".cart__products");

const products = document.querySelectorAll(".product");
const cart = document.querySelector(".cart");

const cartList = [];
cart.style.display = "none";

const visibility = function (item) {
  if (item.length > -1) {
    cart.style.display = "block"
  };
};

products.forEach(product => {
  
  const downBtn = Array.from(product.getElementsByClassName("product__quantity-control product__quantity-control_dec"))[0];
  const upBtn = Array.from(product.getElementsByClassName("product__quantity-control product__quantity-control_inc"))[0];
  const prodQuantity = product.querySelector(".product__quantity-value");
  
  const id = product.getAttribute("data-id");
  
  upBtn.addEventListener("click", () => {
    prodQuantity.textContent = Number(prodQuantity.textContent) + 1;
  });
  
  downBtn.addEventListener("click", () => {
    prodQuantity.textContent = Number(prodQuantity.textContent) - 1;
    if (prodQuantity.textContent < 1) {
      prodQuantity.textContent = 1;
    };
  });
  
  const addProduct = Array.from(product.getElementsByClassName("product__add"))[0];
  
  addProduct.addEventListener("click", () => {
    visibility(cartList);
    
     if (cartList.includes(id) && cartList.lenght != 0) {
       
       const idCounts = Array.from(document.querySelectorAll(".cart__product"));
       
       idCounts.forEach(idCount => {    
       if (idCount.getAttribute("data-id") == id) {
          const currCount = idCount.querySelector(".cart__product-count");
          currCount.textContent = Number(currCount.textContent) + Number(prodQuantity.textContent);
        };
         
       }); 
     
     } else {
       const newDiv = document.createElement("div");
       newDiv.classList.add("cart__product");
       newDiv.setAttribute("data-id", id);

       const newImg = document.createElement("img");
       newImg.classList.add("cart__product-image");
       newImg.src = Array.from(product.getElementsByTagName("img"))[0].src;
       newDiv.appendChild(newImg);

       const divCount = document.createElement("div");
       divCount.classList.add("cart__product-count");
       divCount.textContent = Number(divCount.textContent) + Number(prodQuantity.textContent);  
       newDiv.appendChild(divCount);

       cartProducts.appendChild(newDiv);

       cartList.push(id);
     }; 
  });
});