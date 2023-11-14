const slider = document.querySelector(".slider"); 
const sliderThumb = document.querySelector(".slider-thumb");
let x1 = null;
let x2 = null;
let posInit = 0;
let posFinal = 0;
let allowSwipe = false;
let transform = 0;
const sliderLength = () => {
    const blocks = Array.from(document.querySelectorAll(".block"));
    let sum = 0;
    for (item of blocks) {
        sum += +item.offsetWidth;
    }
    return sum;
}

function findNumber(string) {
    const arr = string.split("");
    return  arr.filter((item) => {
        return (item.toUpperCase()===item.toLowerCase() && item!=="(" && item!==")");
    }).join("");
    
} 

function swipeStart(event) {
    const normalno = event.target.closest(".slider")
    if(normalno) {
        allowSwipe = true;
        posInit = x1 = event.clientX;
    }
    
}



function swipeAction(event) {
    if (!allowSwipe) {
        return;
    }
    let middleTransform;
    x2 = posInit - event.clientX;
    posInit = event.clientX;

    transform = transform - x2;
    // if(!middleTransform < 0 || !middleTransform > (slider.offsetWidth - sliderThumb.offsetWidth)){
    //     transform = middleTransform;
    // }
    if (transform > 180) {
        
        transform = 180;
    }

    if (transform < (-sliderLength()+1000)) {
       
        transform = (-sliderLength()+1000);
    }
          
    sliderThumb.style.transform = `translateX(${transform}px)`; 
    
    
}

function swipeEnd(event) {
    let posFinal = posInit - event.clientX;
    posInit = event.clientX;
    transform -= x2;
    if(Math.abs(transform) < slider.offsetWidth*(1.5/3)){
        sliderThumb.style.transform = `translateX(${transform}px)`;
    }
    allowSwipe = false;
    x1 = null; // Сброс x1 после завершения жеста
}

window.addEventListener("mousedown", swipeStart);
window.addEventListener("mousemove", swipeAction);
window.addEventListener("mouseup", swipeEnd);

