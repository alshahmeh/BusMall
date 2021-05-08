'use strict';
const section=document.getElementById('section');
const button=document.getElementById('button');
const leftImage=document.getElementById('leftImage');
const middleImage=document.getElementById('middleImage');
const rightImage=document.getElementById('rightImage');
const ul=document.getElementById('ul');
let display=0;
let randomArray=[];
let imagesArray = [
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
    'wine-glass'
  ];
  Images.allImages=[];
  function randomNumber(){return Math.floor(Math.random()*(imagesArray.length-1));}
  function Images(name){
this.shown=0;
this.click=0;
this.name=name;
Images.allImages.push(this);
  }
for(let i=0;i<imagesArray.length;i++){
    new Images(imagesArray[i]);
}

let getData=JSON.parse(localStorage.getItem('images'));
if(getData){
    for(let z=0;z<getData.length;z++){
        Images.allImages[z].name=getData[z].name;
        Images.allImages[z].click=getData[z].click;
        Images.allImages[z].shown=getData[z].shown;}}
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
let leftRandom=randomNumber();
let middleRandom=randomNumber();
let rightRandom=randomNumber();
  function renderImages(){
while(leftRandom===middleRandom||leftRandom===rightRandom||middleRandom===rightRandom||randomArray.includes(leftRandom)||randomArray.includes(middleRandom)||randomArray.includes(rightRandom)){
    leftRandom=randomNumber();
    middleRandom=randomNumber();
    rightRandom=randomNumber();}
    randomArray=[];
    randomArray.push(leftRandom);
    randomArray.push(middleRandom);
    randomArray.push(rightRandom);
leftImage.src=`./img/${imagesArray[leftRandom]}.jpg`;
Images.allImages[leftRandom].shown++;
middleImage.src=`./img/${imagesArray[middleRandom]}.jpg`;
Images.allImages[middleRandom].shown++;
rightImage.src=`./img/${imagesArray[rightRandom]}.jpg`;
Images.allImages[rightRandom].shown++;
}
renderImages();
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
section.addEventListener('click',show);
function show(e){if(display<25){
  if(e.target.id==='leftImage'){renderImages();display++;Images.allImages[leftRandom].click++;}
  if(e.target.id==='middleImage'){renderImages();display++;Images.allImages[middleRandom].click++;}
  if(e.target.id==='rightImage'){renderImages();display++;Images.allImages[rightRandom].click++;}
}else{button.addEventListener('click',showResults);section.removeEventListener('click',show); renderChart();localStorage.setItem('images',JSON.stringify(Images.allImages));}}
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/
function showResults(){for(let a=0;a<Images.allImages.length;a++){
    const li=document.createElement('li');
li.textContent=`${Images.allImages[a].name} had a ${Images.allImages[a].click} votes and was seen a ${Images.allImages[a].shown}`;
ul.appendChild(li);
}button.removeEventListener('click',showResults);
}
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
function renderChart(){
    let _names=[];
    let _click=[];
    let _shown=[];
    for(let x=0;x<Images.allImages.length;x++){_names.push(Images.allImages[x].name); _click.push(Images.allImages[x].click); _shown.push(Images.allImages[x].shown);}
    const chartContainer=document.getElementById('chart').getContext('2d');
    let myChart=new Chart(chartContainer,{
type:'bar',
data:{labels:_names,
datasets:[
    {label:'# of clicks',
    data:_click,
    backgroundColor:'red',
    borderColor:'blue',
    borderWidth:1},

    {label:'# of shownes',
        data:_shown,
        backgroundColor:'yellow',
        borderColor:'green',
        borderWidth:1}
]
},
options:{
    scales:{
        y:{
            beginAtZero:true}
    }
}

    });

}
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
