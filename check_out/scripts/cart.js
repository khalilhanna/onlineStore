let carts = document.querySelectorAll(".add_to_cart");
let items = document.querySelectorAll("input");
let cartSatus = document.querySelector(".cart_no span");
let itemsNumbers = 0;
let products = [];
let names = [];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    let itemName = carts[i].name;
    let itemValue = carts[i].value;
    let product;

    if (products === undefined || products.length == 0) {
      product = {
        name: itemName,
        price: itemValue,
        inCart: 1,
      };
      setproducts(product);
      products.push(product);
    } else {
      if (findProduct(itemName)) {
        product = {
          name: itemName,
          price: itemValue,
          inCart: 0,
        };
        setproducts(product);
        products.push(product);
      }
    }
    console.log(itemName);
    console.log(itemValue);
    cartNumbers(product);
  });
}
function onLoadcartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    cartSatus.textContent = " " + productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    cartSatus.textContent = " " + (productNumbers + 1);
  } else {
    localStorage.setItem("cartNumbers", 1);
    cartSatus.textContent = " " + 1;
  }
  // setItems(itemName, itemValue);
}

function findProduct(prodName) {
  for (var i = 0; i < products.length; i++) {
    if (products[i]["name"] === prodName) {
      products[i].inCart += 1;
      setproducts(products[i]);
      return false;
    }
  }

  return true;
}

function setproducts(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    cartItems = {
      [product.name]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function displyCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let total;
  let totals = 0;

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      total = (item.price * item.inCart).toFixed(2);
      totals = parseFloat(totals);
      totals += parseFloat(total);
      productContainer.innerHTML += `<div class="product">
      
      <span>${item.name}</span>
    </div>
    <div class="price">$${item.price}</div>
    <div class="quantity">
      <i class="fas fa-angle-left"></i>
      <span>${item.inCart}</span>
      <i class="fas fa-angle-right"></i>
    </div>
    <div class="total">
      $${total}
    </div>
    <div class="icon">
      <i class="fas fa-trash-alt"></i>
    </div>`;
    });

    productContainer.innerHTML += `
    <div class="cartTotalContainer">
      <div class="cartTotalTitle">
        <h4>
          Order Total
        </h4>
      </div>
      <div class="cartTotal">
        <h4>
          $${totals.toFixed(2)}
        </h4>
      </div>`;
  }
}

onLoadcartNumbers();
displyCart();
