// Listado de todos los productos para el catalogo
const products = [
  {
    id: 1,
    img: "/img/Laptop_ASUS01.webp",
    title:
      'Monopolio',
    price: "70.99",
  },
  {
    id: 2,
    img: "/img/Laptop_ASUS01.webp",
    title:
      'Ajedrez',
    price: "78.99",
  },
  {
    id: 3,
    img: "/img/Laptop_ASUS01.webp",
    title:
      'Lego',
    price: "100.99",
  },
  {
    id: 4,
    img: "/img/Laptop_ASUS01.webp",
    title:
      'Dama',
    price: "58.50",
  },
  {
    id: 5,
    img: "/img/Laptop_ASUS01.webp",
    title:
      'Laberinto',
    price: "35.00",
  }
];

// Función para la creacion de cartas dinamicas para los productos
function createProductCard(product) {

  return `
      <div class="col-md-6 col-lg-4 mb-4 d-flex">
          <div class="card flex-fill tamano">
              <img src="${product.img}" class="card-img-top" alt="${product.title}" />
              <div class="card-body">
                  <p class="card-title">${product.title}</p>
                  <p class="card-text">S/ ${product.price}</p>
                  <a class="btn btn-secondary" onClick="addCar('${product.id}', '${product.img}', '${product.title}', '${product.price}')">Enviar Carrito</a>
              </div>
          </div>
      </div>
  `;
}

// Aqui se crean las diversas cartas para los producto
document.addEventListener("DOMContentLoaded", function () {
  let container = document.getElementById("product-container");
  products.forEach((product) => {
      container.innerHTML += createProductCard(product);
  });
});

let priceTotal = 0;
let priceDes = 0;

// Función para las cartas para el carrito
function addCar(id, img, title, price) {

  // Crea un nuevo div para el carrito
  let productCar = document.getElementById("product-carrito");
  let newDiv = document.createElement("div");
  newDiv.classList.add("cart-item");

  // Asignamos un id al nuevo div
  let divId = 'div-' + id;
  
  // variable para guardar la cantidad o inicializarlo
  let amount = 0;

  // Verificamos la existencia del div para que no se repita
  if (document.getElementById(divId)) {

    // Si existe el div con el producto en el carrito solo editamos la cantidad
    let divContainer = document.getElementById(divId);
    let pContainer = divContainer.getElementsByTagName('p')[1]
    let amountAct = parseInt(pContainer.textContent.split(':')[1].trim())
    // Se modifica y se agrega un mas al contador
    let newAmount = amountAct + 1;
    // Se actualiza la vista
    pContainer.textContent = `Cantidad : ${newAmount}`

  } else {
    // Si no existe se asigna el id y se crea la carta
    newDiv.id = divId;
    newDiv.innerHTML = `
      <div class="card">
          <img src="${img}" class="card-img-top" alt="${title}" />
          <div class="card-body">
              <p class="card-text">S/ ${price}</p>
              <p id="amount" class="card-text">Cantidad : ${amount+1}</p>
              <a class="btn btn-danger" onClick="deleteProduct('${divId}', '${price}')">-</a>
          </div>
      </div>
    `;
    // Agrega el nuevo div al carrito
    productCar.appendChild(newDiv);
  }

  // Actualiza el monto a pagar al final con todos los precios del carrito
  let divPrice = document.getElementById("price");
  let pContainerPrice = divPrice.getElementsByTagName('p')[2];
  let productPrice = parseFloat(price)
  // Se suma el precio del producto
  
  priceTotal = priceTotal + productPrice;

  let pContainerAmount = divPrice.getElementsByTagName('p')[1];
  let amountAct = parseInt(pContainerAmount.textContent.split(':')[1].trim());
  let newAmount = amountAct + 1

  let discount = 0

  if (0 <= newAmount && newAmount < 10) {
    discount = priceTotal - (priceTotal * (3.5/100));
  } else if (10 <= newAmount && newAmount <= 20) {
    discount = priceTotal - (priceTotal * (7/100));
  } else if (20 < newAmount) {
    discount = priceTotal - (priceTotal * (9.5/100));
  }

  // Redondeamos a dos decimales
  discount = Math.round(discount * 100.0) / 100.0;

  // Se actualiza el monto para la visualizacion
  pContainerPrice.textContent = `Monto : S/ ${discount}`;
  pContainerAmount.textContent = `Cantidad : ${newAmount}`

}

function deleteProduct(divId, price) {
  let divContainer = document.getElementById(divId);
  let pContainer = divContainer.getElementsByTagName('p')[1]
  let amountAct = parseInt(pContainer.textContent.split(':')[1].trim())
  let newAmount = amountAct - 1;
  pContainer.textContent = `Cantidad : ${newAmount}`

  if (newAmount <= 0) {
    let divPrice = document.getElementById("price");
    let pContainerAmount = divPrice.getElementsByTagName('p')[1];
    let pContainerPrice = divPrice.getElementsByTagName('p')[2];
    let amountAct2 = parseInt(pContainerAmount.textContent.split(':')[1].trim());
    let newAmount2 = amountAct2 - 1
    
    pContainerAmount.textContent = `Cantidad : ${newAmount2}`

    let discount = 0

    priceTotal = priceTotal - price

    if (0 <= newAmount && newAmount < 10) {
      discount = priceTotal - (priceTotal * (3.5/100));
    } else if (10 <= newAmount && newAmount <= 20) {
      discount = priceTotal - (priceTotal * (7/100));
    } else if (20 < newAmount) {
      discount = priceTotal - (priceTotal * (9.5/100));
    }

    // Redondeamos a dos decimales
    discount = Math.round(discount * 100.0) / 100.0;

    pContainerPrice.textContent = `Monto : S/ ${discount}`;
    
    divContainer.remove()
  } else {
    let divPrice = document.getElementById("price");
    let pContainerAmount = divPrice.getElementsByTagName('p')[1];
    let pContainerPrice = divPrice.getElementsByTagName('p')[2];
    let amountAct2 = parseInt(pContainerAmount.textContent.split(':')[1].trim());
    let newAmount2 = amountAct2 - 1

    pContainerAmount.textContent = `Cantidad : ${newAmount2}`

    let discount = 0

    priceTotal = priceTotal - price

    if (0 <= newAmount && newAmount < 10) {
      discount = priceTotal - (priceTotal * (3.5/100));
    } else if (10 <= newAmount && newAmount <= 20) {
      discount = priceTotal - (priceTotal * (7/100));
    } else if (20 < newAmount) {
      discount = priceTotal - (priceTotal * (9.5/100));
    }

    // Redondeamos a dos decimales
    discount = Math.round(discount * 100.0) / 100.0;

    pContainerPrice.textContent = `Monto : S/ ${discount}`;
  }

}
