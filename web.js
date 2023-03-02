// "use strict";

// ///////////////////////////////////////
// // Modal window

// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".btn--close-modal");
// const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// const openModal = function () {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

// const closeModal = function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// btnCloseModal.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
//     closeModal();
//   }
// });

// ////////////////////PREPEND AND APPEND EXAPMLE//////////

// const header = document.querySelector(".header");
// const maindiv = document.createElement("div");
// maindiv.classList.add("cookie-message");
// maindiv.innerHTML =
//   'this is my book and I am the owner <button class="btn btn--close-cookie">got it </button>';
// // header.prepend(maindiv);
// // header.append(maindiv.cloneNode(true));
// header.after(maindiv);

// header.before(maindiv.cloneNode(true));

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     maindiv.remove();
//   });

///////////////// NAV ELEMENTS BLURIND FUNCTION//////////////

const blurringfunction = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    console.log(siblings);
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((acc) => {
      if (acc !== link) {
        acc.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  blurringfunction(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  blurringfunction(e, 1);
});

//////////////// ON SCROLLING NAVBAR SHOWS//////////

const section2 = document.querySelector("#section--2");
const sect1start = section2.getBoundingClientRect();
window.addEventListener("scroll", function () {
  const scroll = window.scrollY;

  if (scroll > sect1start.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

////////////////// BUTTON LEARN MORE CLICK TO SCROLL DOWN///////

const section1 = document.querySelector("#section--1");
const btnscroll = document.querySelector(".btn--scroll-to");
btnscroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });

  console.log(window.pageYOffset, window.pageXOffset);
  console.log(btnscroll.getBoundingClientRect());
});

/////////////MAKING NAV LINKS CLOECTIVELY TO  SCROLL DOWN WHEN CLICK THERER//////////////////////////

document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log("link");
    /////THIS INDICATE THE el IN UPPER FUNCTOIN
    const id = this.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    e.preventDefault();
  });
});

///////////ANOTHER METHOD OF SMOTH SCROLLING which is not workinh but dont know//////////////////

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classlist.contains(".nav__link")) {
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

//////////////////////WHEN CLICKED OTHER PARA SHOWS///////////////

const buttons = document.querySelectorAll(".operations__tab");
const buttoncontainer = document.querySelector(".operations__tab-container");
const allcontent = document.querySelectorAll(".operations__content");
/// WHEN CLICK ON BUTTON//
buttoncontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  //// WHEN CLICK INSTEAD OF BUTTON PRIVIDES NULL//
  if (!clicked) {
    return;
  }
  ///REMOVING CLASS FROM ALL CONTAINERS
  allcontent.forEach((acc) =>
    acc.classList.remove("operations__content--active")
  );
  ///FOR WACH FOR EVERY BUTTONS
  buttons.forEach((acc) => acc.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  ///ACTVE CONTENT AREA///
  ///DATA SET TAB IS FOR THE 1,2,3 FOR EASINESS OF TRANSFER CLASS//
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    /////THIS ACTIVE CLASS FROM CSS FOR NON HIDDEN PROPERTY
    .classList.add("operations__content--active");
});

///////////////////STICKY NAVIGATION THROUGH INTERSECTIONOBSERVER as example////

// const obsoptions = {
//   root: null,
//   threshold: [0, 1, 0.2],
// };
// const obscallback = function (entries, observer) {
//   entries.forEach((entery) => {
//     console.log(entery);
//   });
// };
// const observer = new IntersectionObserver(obscallback, obsoptions);
// observer.observe(section1);

/////////STICKY NAVIGATION THROUGH INTERSECTION//////////

// const header = document.querySelector(".header");

// const stickynav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);
//   nav.classList.add("sticky");
// };

// const headerobserver = new IntersectionObserver(stickynav, {
//   root: null,
//   threshold: 0,
// });

// headerobserver.observe(header);

////////////// ONSCROLLING ALL THINGS SHOWS SMOOTHLY///
const allsections = document.querySelectorAll(".section");

const revealsecttion = function (entries, observer) {
  const [entery] = entries;
  // console.log(entery);
  if (!entery.isIntersecting) return;

  entery.target.classList.remove("section--hidden");
  observer.unobserve(entery.target);
};

const sectionobserver = new IntersectionObserver(revealsecttion, {
  root: null,
  threshold: 0.3,
});
allsections.forEach(function (acc) {
  sectionobserver.observe(acc);
  // acc.classList.add("section--hidden");
});

//////////LAZY LOADING IMAGES////////

const imgtargets = document.querySelectorAll("img[data-src]");

const loadimg = function (entries, observer) {
  const [entery] = entries;
  console.log(entery);

  if (!entery.isIntersecting) return;

  //replace src eith data-src
  entery.target.src = entery.target.dataset.src;

  entery.target.addEventListener("load", function () {
    entery.target.classList.remove("lazy-img");
  });
  observer.unobserve(entery.target);
};
const imgobsrver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgtargets.forEach((acc) => {
  imgobsrver.observe(acc);
});

///////////////////SLIDER MOUNTAINS /////////////////
const slides = document.querySelectorAll(".slide");
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");
const dotcontainer = document.querySelector(".dots");
const slider = document.querySelector(".slider");

// slider.style.transform = "scale(0.5)";
// slider.style.overflow = "visible";
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const createdots = function () {
  slides.forEach(function (_, i) {
    dotcontainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button> `
    );
  });
};
createdots();

const activatedots = function (slide) {
  document
    .querySelectorAll(".dots")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activatedots(0);

const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

gotoslide(0);

//0% , 100% , 200% , 300%

////next slide
let cuurslide = 0;
const maxslide = slides.length;
const nextslide = function () {
  if (cuurslide === maxslide - 1) {
    cuurslide = 0;
  } else {
    cuurslide++;
  }
  gotoslide(cuurslide);
  activatedots(cuurslide);

  //-100% , 0% , 100% , 200%
};
const prevslide = function () {
  if (cuurslide === 0) {
    cuurslide = maxslide - 1;
  } else {
    cuurslide--;
  }
  gotoslide(cuurslide);
  activatedots(cuurslide);
};

btnright.addEventListener("click", nextslide);
btnleft.addEventListener("click", prevslide);
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevslide();
  e.key === "ArrowRight" && nextslide();
});

dotcontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    gotoslide(slide);
    activatedots(slide);
  }
});
