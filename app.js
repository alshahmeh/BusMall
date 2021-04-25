'use strict';

let allProductNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];
let allProductSrc = [
  './img/bag.jpg',
  './img/banana.jpg',
  './img/bathroom.jpg',
  './img/boots.jpg',
  './img/breakfast.jpg',
  './img/bubblegum.jpg',
  './img/chair.jpg',
  './img/cthulhu.jpg',
  './img/dog-duck.jpg',
  './img/dragon.jpg',
  './img/pen.jpg',
  './img/pet-sweep.jpg',
  './img/scissors.jpg',
  './img/shark.jpg',
  './img/sweep.png',
  './img/tauntaun.jpg',
  './img/unicorn.jpg',
  './img/usb.gif',
  './img/water-can.jpg',
  './img/wine-glass.jpg',
];
let stats=document.getElementById('stats');
let productContainer = document.getElementById('allProducts');
let buttonLinks = document.getElementById('button');
let leftImgTag = document.getElementById('left');
let middleImgTag = document.getElementById('center');
let rightImgTag = document.getElementById('right');

let totalClicks = 0;
//holds all products instantiated
Product.allProducts = [];
//holds 6 values
Product.checkDupes = [];

// //store products already on the page
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.timesShown = 0;
  Product.allProducts.push(this);
}

function instantiateProducts() {
  for (let i = 0; i < allProductNames.length; i++) {
    new Product(allProductNames[i], allProductSrc[i]);
  }
}

function randomNumber() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function displayProducts() {
  //generate array of random # that correlates with each index
  while (Product.checkDupes.length < 6) {
    let number = randomNumber();
    //if the number is not in the array, then that image has not been shown,
    //so push the number into the array
    if (!Product.checkDupes.includes(number)) {
      Product.checkDupes.push(number);
    }
    //do this until the array is at 6 numbers again
    //all 6 numbers are unique
  }
  leftImgTag.src = Product.allProducts[Product.checkDupes[0]].src;
  Product.allProducts[Product.checkDupes[0]].timesShown++;
  leftProduct = Product.allProducts[Product.checkDupes[0]];

  middleImgTag.src = Product.allProducts[Product.checkDupes[1]].src;
  Product.allProducts[Product.checkDupes[1]].timesShown++;
  middleProduct = Product.allProducts[Product.checkDupes[1]];

  rightImgTag.src = Product.allProducts[Product.checkDupes[2]].src;
  Product.allProducts[Product.checkDupes[2]].timesShown++;
  rightProduct = Product.allProducts[Product.checkDupes[2]];

  //only keep the last 3 numbers because the first 3 have been used
  //these 3 nums will now be at the beginning of checkDupes
  Product.checkDupes = Product.checkDupes.slice(3, 6);
}
function renderStats() {
  let h1El = document.createElement('h1');
  stats.appendChild(h1El);
  h1El.textContent = 'Stats';


  for (let i = 0; i < Product.allProducts.length; i++) {
    let liEl = document.createElement('li');
    liEl.textContent =Product.allProducts[i].clicks +' votes for ' +Product.allProducts[i].name;
    liEl.textContent=`${Product.allProducts[i].name} had ${Product.allProducts[i].clicks} votes, and was seen ${Product.allProducts[i].timesShown} times`;
    stats.appendChild(liEl);
  }
}

function checkStorage() {
  if (localStorage.setProducts) {
    let stringifyProducts = localStorage.getItem('setProducts');
    Product.allProducts = JSON.parse(stringifyProducts);
  } else {
    instantiateProducts();
  }
}

let handleClick = function (event) {
  if (event.target === productContainer) {
    return alert('click on an image, please');
  }
  totalClicks++;
  let clickedProduct = event.target;
  let id = clickedProduct.id;
  if (id === 'left') {
    leftProduct.clicks++;
  }
  if (id === 'center') {
    middleProduct.clicks++;
  }
  if (id === 'right') {
    rightProduct.clicks++;
  }

  if (totalClicks === 25) {
    productContainer.removeEventListener('click', handleClick);
    renderStats();

    localStorage.setItem('setProducts', JSON.stringify(Product.allProducts));
  }
  displayProducts();
};

checkStorage();
displayProducts();

productContainer.addEventListener('click', handleClick);
buttonLinks.onclick=document.getElementById('statsContainer').style.display='block';
