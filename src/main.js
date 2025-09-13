import './style.css'
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll(".nav__link")
const allsections = document.querySelectorAll(".section");



btnScrollTo.addEventListener('click', function(e){
    e.preventDefault();
    let s1coordinate = sectionOne.getBoundingClientRect()
    console.log(s1coordinate);
    
    // old method
    // window.scrollTo({
    //     left: s1coordinate.left + window.pageXOffset, 
    //     top: s1coordinate.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    sectionOne.scrollIntoView({behavior: 'smooth'})
})

navLinks.forEach(function(el){
    el.addEventListener("click",function(e){
        e.preventDefault()
        const id = this.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
        
    })
})

tabsContainer.addEventListener("click", function(el){
    el.preventDefault()
   const clicked = el.target.closest(".operations__tab");

   if (clicked.classList.contains('btn')){
   const num = clicked.getAttribute("data-tab");
   tabs.forEach(t =>{t.classList.remove(`operations__content--active`)});
   tabsContent.forEach(t => {t.classList.remove('operations__content--active')})
    clicked.classList.add(`operations__content--active`)
document.querySelector(`.operations__content--${num} `).classList.add(`operations__content--active`);
   }
});

const hoverHandle =  function(e, opacity){
  e.preventDefault();
  if (e.target.classList.contains("nav__link")){
  const link = e.target;
  const sibbling = link.closest(".nav").querySelectorAll(".nav__link");
  const logo = link.closest(".nav").querySelector("img");
  sibbling.forEach(el => { if (el !== link) el.style.opacity = opacity;})
    logo.style.opacity = opacity
  }
};

nav.addEventListener('mouseover',function(e){
    hoverHandle(e, 0.5)
})

nav.addEventListener('mouseout', function(e){
    hoverHandle(e, 1)
})


// const initilCoordinate = sectionOne.getBoundingClientRect()
// console.log(initilCoordinate);

// window.addEventListener("scroll", function(){
//     console.log(this.window.scrollY);
    
//     if (window.scrollY > initilCoordinate.top){
//         nav.classList.add("sticky")
//     } else nav.classList.remove("sticky")

// })

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();

let stickyNav = function(entries){
    console.log(entries);
    const [entry] = entries;
    if (!entry.isIntersecting) {nav.classList.add('sticky')} else {nav.classList.remove("sticky")}
    ;
    
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight.height}px`
});
headerObserver.observe(header);

const sectionRevel = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target)

};

const sectionObserver = new IntersectionObserver(sectionRevel, {
    root: null,
    threshold: 0.15,
})

allsections.forEach(sections=>{
sectionObserver.observe(sections)
sections.classList.add("section--hidden")
});

//lazy loading images
const allImg = document.querySelectorAll("img[data-src]");


const revelImg = function(entries,observer){
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    const Att = entry.target.getAttribute("data-src")
    entry.target.src = `${Att}`;
    entry.target.addEventListener('load',function() {
        entry.target.classList.remove("lazy-img")        
    });

    observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(revelImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
});

allImg.forEach(img => {
    imageObserver.observe(img);
});


// Slider

const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dots = document.querySelector(".dots");
const slides = document.querySelectorAll(".slide");
const sliders = document.querySelectorAll(".slider");


let currSlide = 0;
const maxSlide = slides.length -1;
console.log(maxSlide);

const creatDot = function(){
    slides.forEach(function(_,i){
        dots.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    }) 
}
    creatDot()
let activeDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(s => s.classList.remove('dots__dot--active'))
    document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
    
}
activeDot(0)

const goSlide = function(slide){
slides.forEach((s,i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
})
};

goSlide(0)


const rightBtn = function(){
    if (currSlide === maxSlide){
        currSlide = 0;
    } else {
        currSlide++
    } 

    goSlide(currSlide)
    activeDot(currSlide)
};

const leftBtn = function(){
    if (currSlide === 0){
        currSlide = maxSlide
    } else {
        currSlide--
    } 

    goSlide(currSlide)
    activeDot(currSlide)
}

btnLeft.addEventListener('click', leftBtn);
btnRight.addEventListener('click', rightBtn);

document.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight') rightBtn();
    e.key === 'ArrowLeft' && leftBtn();
});

dots.addEventListener('click', function(e){
    if (e.target.classList.contains("dots__dot")){
        let no = e.target.dataset.slide;
        goSlide(no);
        activeDot(no)
    }
})

