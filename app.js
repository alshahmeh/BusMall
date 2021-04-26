'use strict';
let imagesArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
const showResults = document.getElementById('button');
const resultContainer = document.getElementById('resultContainer');
const rightImage = document.getElementById('rightImage');
const middleImage = document.getElementById('middleImage');
const leftImage = document.getElementById('leftImage');
const imageSection = document.getElementById('imageSection');
let clickNumber=0;
let rightImageIndex=0;
let leftImageIndex=0;
let middleImageIndex=0;

function Images(name) {
  this.name = name.split('.')[0];
  this.img = `./img/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Images.all.push(this);

}
Images.all = [];

for (let i = 0; i < imagesArray.length; i++) {
  new Images(imagesArray[i]);
}

function eventHandler(e) {
  if ((e.target.id === 'leftImage' || e.target.id === 'rigthImage' || e.target.id === 'middleImage') && clickNumber < 25) {

    if (e.target.id === 'leftImage') { Images.all[leftImageIndex].clicks++; }
    if (e.target.id === 'rightImage') { Images.all[rightImageIndex].clicks++; }
    if (e.target.id === 'middleImage') { Images.all[middleImageIndex].clicks++; }
    clickNumber++;
    renderImages();
  }
}
function renderImages() {
  let leftIndex = randomNumber(0, imagesArray.length - 1);
  let middleIndex;
  let rightIndex;
  do {
    rightIndex = randomNumber(0, imagesArray.length - 1);
    middleIndex = randomNumber(0, imagesArray.length - 1);
  }while (leftIndex === rightIndex || leftIndex === middleIndex || rightIndex === middleIndex);
  rightImage.src = Images.all[rightIndex].img;
  middleImage.src = Images.all[middleIndex].img;
  leftImage.src = Images.all[leftIndex].img;

  rightImageIndex = rightIndex;
  middleImageIndex = middleIndex;
  leftImageIndex = leftIndex;

  Images.all[leftIndex].shown++;
  Images.all[rightIndex].shown++;
  Images.all[middleIndex].shown++;
}

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}

imageSection.addEventListener('click', eventHandler);
renderImages();


function viewResults( ) {
  let ul = document.createElement('ul');
  resultContainer.appendChild(ul);
  for (let a = 0; a < Images.all.length; a++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Images.all[a].name} had a ${Images.all[a].clicks} votes and was seen a ${Images.all[a].shown}`;
  }
  showResults.removeEventListener('click', viewResults);
}


showResults.addEventListener('click', viewResults);
