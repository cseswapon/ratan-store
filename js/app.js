console.clear();
// start spiner section //
setTimeout(() => {
  document.getElementById('spiner').style.display = 'none';
  document.getElementById('main-section').style.display = 'block';
}, 3500);

//search custom

const searchProduct = () => {
  const inputField = document.getElementById('input-field');
  const category = inputField.value;
  if (!category) {
    alert('please valid category');
    return;
  }
  const url = `https://fakestoreapi.com/products/category/${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => searchingProduct(data));
  inputField.value = '';
}

// show search product //

const searchingProduct = products => {
  if (products.length === 0) {
    alert('not found this result ! please enter your valid category');
    return;
  }
  document.getElementById("all-products").textContent = '';
  for (const product of products) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product", "custom-border");
    div.innerHTML = `
    <div class="single-product">
      <div>
      <img class="product-image" src=${image}></img><br>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <strong class="count"><i class="fas fa-male"> Total-Rateing </i> : ${product.rating.count}</strong>
      <strong class="rate"><i class="fas fa-star-half-alt"> Average-Rateing </i> : ${product.rating.rate}</strong>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success me-2">add to cart</button>
      <button onclick="details(${product.id})" id="details-btn" class="btn btn-danger"data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
}

// show all product //
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product", "custom-border");
    div.innerHTML = `
    <div class="single-product">
      <div>
      <img class="product-image" src=${image}></img><br>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <strong class="count"><i class="fas fa-male"> Total-Rateing </i> : ${product.rating.count}</strong>
      <strong class="rate"><i class="fas fa-star-half-alt"> Average-Rateing </i> : ${product.rating.rate}</strong>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success me-2">add to cart</button>
      <button onclick="details(${product.id})" id="details-btn" class="btn btn-danger"data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//details//
const details = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url).then(res => res.json()).then(data => showModal(data));
}
const showModal = card => {
  // console.log(card);
  // alert(card.title)
  const divFiled = document.getElementById('single');
  divFiled.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="single-product" id="single-card">
      <div>
        <img class="product-image" src=${card.image}></img><br>
      </div>
      <h4><strong style="color:#337ab7">${card.title}</strong></h4>
      <p style="color:rgb(169 68 66)">${card.description.slice(0, 100)}</p>
      <h2 style="color:rgb(51 122 183)">Price: $ ${card.price}</h2>
    </div>
  `;
  divFiled.appendChild(div);
}
let count = 0;
const addToCart = (price) => {
  // console.log(id);
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (name) => {
  const element = document.getElementById(name).innerText;
  const converted = parseFloat(element);
  // console.log(converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  // console.log(id);
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// buy now //

const buynow = () => {
  const buy = confirm('are you sure !')
  if (buy === true) {
    print();
  }
}