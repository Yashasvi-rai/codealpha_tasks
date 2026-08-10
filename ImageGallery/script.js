/*==========================================
  GALAXY GALLERY
==========================================*/

const galleryItems = [...document.querySelectorAll(".gallery-item")];

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const searchInput = document.getElementById("search");

const filters = document.querySelectorAll(".filter");

const themeBtn = document.getElementById("themeBtn");

const scrollTopBtn = document.getElementById("scrollTop");

let currentIndex = 0;

/*==========================================
 CURSOR GLOW
==========================================*/

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (e)=>{

    cursorGlow.style.left = e.clientX + "px";

    cursorGlow.style.top = e.clientY + "px";

});

/*==========================================
 3D CARD TILT
==========================================*/

galleryItems.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height/2)/18;

        const rotateY = (x - rect.width/2)/18;

        card.style.transform =

        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});

/*==========================================
 SCROLL REVEAL
==========================================*/

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.2
});

galleryItems.forEach(item=>{

observer.observe(item);

});

/*==========================================
 FAVORITES
==========================================*/

let favorites =

JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteButtons =

document.querySelectorAll(".favorite");

favoriteButtons.forEach((btn,index)=>{

if(favorites.includes(index)){

btn.classList.add("active");

btn.innerHTML='<i class="fa-solid fa-heart"></i>';

}

btn.addEventListener("click",(e)=>{

e.stopPropagation();

btn.classList.toggle("active");

if(btn.classList.contains("active")){

btn.innerHTML='<i class="fa-solid fa-heart"></i>';

if(!favorites.includes(index)){

favorites.push(index);

}

}else{

btn.innerHTML='<i class="fa-regular fa-heart"></i>';

favorites=favorites.filter(i=>i!==index);

}

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

);

});

});

/*==========================================
 LIGHTBOX OPEN
==========================================*/

galleryItems.forEach((card,index)=>{

card.addEventListener("click",()=>{

currentIndex=index;

showImage();

});

});

function showImage(){

const img=

galleryItems[currentIndex]

.querySelector("img");

const title=

galleryItems[currentIndex]

.querySelector("h3");

lightbox.classList.add("active");

lightboxImage.src=img.src;

lightboxTitle.textContent=

title.textContent;

}
/*==========================================
 LIGHTBOX CONTROLS
==========================================*/

function closeLightbox() {

    lightbox.classList.remove("active");

}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

/*==========================================
 NEXT IMAGE
==========================================*/

function nextImage() {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {

        currentIndex = 0;

    }

    showImage();

}

nextBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    nextImage();

});

/*==========================================
 PREVIOUS IMAGE
==========================================*/

function prevImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryItems.length - 1;

    }

    showImage();

}

prevBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    prevImage();

});

/*==========================================
 KEYBOARD CONTROLS
==========================================*/

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {

        closeLightbox();

    }

    if (e.key === "ArrowRight") {

        nextImage();

    }

    if (e.key === "ArrowLeft") {

        prevImage();

    }

});

/*==========================================
 DOWNLOAD BUTTON
==========================================*/

const downloadBtn = document.getElementById("downloadBtn");

function updateDownload() {

    const img = galleryItems[currentIndex].querySelector("img");

    downloadBtn.href = img.src;

    downloadBtn.download = img.alt || "image";

}

const oldShowImage = showImage;

showImage = function () {

    oldShowImage();

    updateDownload();

};

/*==========================================
 LIVE SEARCH
==========================================*/

searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    galleryItems.forEach(card => {

        const text = card.textContent.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});

/*==========================================
 CATEGORY FILTERS
==========================================*/

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(card => {

            if (

                filter === "all" ||

                card.classList.contains(filter)

            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});

/*==========================================
 DARK MODE
==========================================*/

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem("theme", "light");

    }

});
/*==========================================
 SHUFFLE GALLERY
==========================================*/

const shuffleBtn = document.getElementById("shuffle");

shuffleBtn.addEventListener("click", () => {

    const gallery = document.querySelector(".gallery");

    const cards = [...gallery.children];

    for(let i = cards.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [cards[i], cards[j]] = [cards[j], cards[i]];

    }

    cards.forEach(card => gallery.appendChild(card));

});

/*==========================================
 RANDOM IMAGE
==========================================*/

const randomBtn = document.getElementById("random");

randomBtn.addEventListener("click",()=>{

    currentIndex =

    Math.floor(Math.random()*galleryItems.length);

    showImage();

});

/*==========================================
 LIKE BUTTON
==========================================*/

const likeButtons=

document.querySelectorAll(".like-btn");

likeButtons.forEach(btn=>{

let count=

parseInt(btn.querySelector("span").textContent);

let liked=false;

btn.addEventListener("click",(e)=>{

e.stopPropagation();

if(!liked){

count++;

liked=true;

btn.style.background="#00E676";

}else{

count--;

liked=false;

btn.style.background="";

}

btn.querySelector("span").textContent=count;

});

});

/*==========================================
 SCROLL TO TOP
==========================================*/

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollTopBtn.style.display="flex";

}else{

scrollTopBtn.style.display="none";

}

});

scrollTopBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==========================================
 STAGGER ANIMATION
==========================================*/

galleryItems.forEach((card,index)=>{

card.style.transitionDelay=

`${index*0.08}s`;

});

/*==========================================
 CONFETTI
==========================================*/

function confetti(){

for(let i=0;i<25;i++){

const div=document.createElement("div");

div.className="confetti";

div.style.left=

Math.random()*100+"vw";

div.style.background=

`hsl(${Math.random()*360},
90%,60%)`;

div.style.animationDuration=

2+Math.random()*2+"s";

document.body.appendChild(div);

setTimeout(()=>{

div.remove();

},4000);

}

}

favoriteButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

if(btn.classList.contains("active")){

confetti();

}

});

});

/*==========================================
 MUSIC PLAYER
==========================================*/

const musicBtn=document.querySelector(".music");

const music=new Audio("music.mp3");

music.loop=true;

let playing=false;

musicBtn.addEventListener("click",()=>{

if(!playing){

music.play();

playing=true;

musicBtn.innerHTML=

'<i class="fa-solid fa-pause"></i> Pause';

}else{

music.pause();

playing=false;

musicBtn.innerHTML=

'<i class="fa-solid fa-music"></i> Music';

}

});

/*==========================================
 TOUCH SWIPE
==========================================*/

let startX=0;

lightbox.addEventListener("touchstart",e=>{

startX=e.touches[0].clientX;

});

lightbox.addEventListener("touchend",e=>{

let endX=e.changedTouches[0].clientX;

if(startX-endX>50){

nextImage();

}

if(endX-startX>50){

prevImage();

}

});

/*==========================================
 WELCOME ANIMATION
==========================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

document.querySelector(".hero h1").style.transform=

"scale(1.05)";

setTimeout(()=>{

document.querySelector(".hero h1").style.transform=

"scale(1)";

},400);

},500);

});

/*==========================================
 IMAGE LOADING EFFECT
==========================================*/

document.querySelectorAll(".gallery img").forEach(img=>{

img.onload=()=>{

img.style.opacity="1";

img.style.transform="scale(1)";

};

img.style.opacity="0";

img.style.transform="scale(.95)";

img.style.transition=".8s";

});

/*==========================================
 END
==========================================*/

