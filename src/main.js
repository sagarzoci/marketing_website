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


const initilCoordinate = sectionOne.getBoundingClientRect()
console.log(initilCoordinate);

window.addEventListener("scroll", function(){
    console.log(this.window.scrollY);
    
    if (window.scrollY > initilCoordinate.top){
        nav.classList.add("sticky")
    } else nav.classList.remove("sticky")

})