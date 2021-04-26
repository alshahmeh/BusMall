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
Images.lastShown=[];
function Images(name) {
  this.name = name.split('.')[0];
  this.img = `./img/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Images.all.push(this);

}
Images.all=[];
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
  else{renderChart();}
}

function renderImages() {
  let leftIndex =Math.floor( Math.random() * imagesArray.length);
  let middleIndex=Math.floor( Math.random() * imagesArray.length);
  let rightIndex=Math.floor( Math.random() * imagesArray.length);
  while( leftIndex === middleIndex
    || middleIndex === rightIndex
    || leftIndex === rightIndex
    || Images.lastShown.includes(leftIndex)
    || Images.lastShown.includes(middleIndex)
    || Images.lastShown.includes(leftIndex)){
    leftIndex= Math.floor(Math.random()* imagesArray.length);
    middleIndex= Math.floor(Math.random()*imagesArray.length);
    rightIndex= Math.floor(Math.random()* imagesArray.length);
  }

  rightImage.src = Images.all[rightIndex].img;
  middleImage.src = Images.all[middleIndex].img;
  leftImage.src = Images.all[leftIndex].img;

  rightImageIndex = rightIndex;
  middleImageIndex = middleIndex;
  leftImageIndex = leftIndex;

  Images.all[leftIndex].shown++;
  Images.all[rightIndex].shown++;
  Images.all[middleIndex].shown++;


  Images.lastShown=[];
  Images.lastShown.push(leftIndex);
  Images.lastShown.push(middleIndex);
  Images.lastShown.push(rightIndex);
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
function renderChart(){
  let _clicks=[];
  let _names=[];
  let _showes=[];
  for(let b=0;b<Images.all.length;b++){_clicks.push(Images.all[b].clicks);_names.push(Images.all[b].name);_showes.push(Images.all[b].shown);}

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:_names,
      datasets: [{
        label: '# of Votes',
        data: _clicks,
        backgroundColor:
        'rgba(255, 99, 132, 1)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1},


      {

        label: '3 of shoes',
        data: _showes,
        backgroundColor:
            'rgba(54, 162, 235, 0.2)',

        borderColor:
        'rgba(54, 162, 235, 0.2)',
        borderWidth: 1

      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  );
}
