// Navigation bar scroll effect
window.addEventListener('scroll', function(){
    const navBar = document.getElementById('navbar');
    if(window.scrollY > 50){
        navBar.classList.add('scrolled');
    }
    else{
        navBar.classList.remove('scrolled');
    }
})

// Feature carousel functionality
let currentslideIndex = 0;
const slides = document.querySelectorAll('.feature-slide');
const dots = document.querySelectorAll('.carousel-dot');

function showSlide(index){
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function currentSlide(index) {
    currentslideIndex = index - 1;
    showSlide(currentslideIndex);
}

// Advance carousel
setInterval(() => {
    currentslideIndex = (currentslideIndex + 1) % slides.length;
    showSlide(currentslideIndex);
}, 4000);

