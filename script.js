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

// Dark and Light mode
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;

themeSwitch.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeSwitch.checked = true;
  }
});

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

 // Audience Toggle Functionality
const audienceToggle = document.getElementById('audienceToggle');
const farmerContent = document.getElementById('farmerContent');
const buyerContent = document.getElementById('buyerContent');
const farmerLabel = document.getElementById('farmerLabel');
const buyerLabel = document.getElementById('buyerLabel');

let isToggled = false;

audienceToggle.addEventListener('click', function() {
    isToggled = !isToggled;
            
    // Toggle switch animation
    this.classList.toggle('active', isToggled);
            
    // Toggle labels
    farmerLabel.classList.toggle('active', !isToggled);
    buyerLabel.classList.toggle('active', isToggled);
            
    // Toggle content with smooth transition
    if (isToggled) {
        farmerContent.classList.remove('active');
        setTimeout(() => {
            buyerContent.classList.add('active');
            }, 200);
     }
     else {
        buyerContent.classList.remove('active');
            setTimeout(() => {
                farmerContent.classList.add('active');
            }, 200);
        }
});

// Accordion functionality
const toggles = document.querySelectorAll('.accordion-toggle');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
    toggle.classList.toggle('open');
  });
});

// AI Chatbot using Puter.js
const chatlog = document.getElementById('chatlog');
const userInput = document.getElementById('userInput');

const systemPrompt = `
You are AgriBot, the virtual assistant for AgriLink — AgriLink is a digital platform that connects farmers directly to markets, eliminating middlemen and increasing farmer profits by up to 35%.

**Origin Story**: Founded in 2025 by Truphenah Abere, a daughter of small-scale farmers, AgriLink aims to solve inefficiencies in agricultural markets by directly connecting farmers and buyers.

**Mission**: To empower farmers through accessible market data, logistics tools, and fair trade connections.

**Services**:
1. Coordinated pickup and delivery system.
2. Direct buyer-farmer matching
3. Instant Payments
4. Produce delivery and logistics planning
5. Free Pickup Service
6. Fresh Direct from Farm
7. Consistent supply with our network of verified farmers. 

**Vision**: A future where every farmer has equal access to profitable markets and agriculture is fully digitized and equitable.

**Team**: Truphenah Abere (Founder & CEO), Felix Maina (CTO), Gilbert Rono (Head of Operations), Stacy Apondi (Head of Partnerships)

You should answer questions about AgriLink’s story, services, founder, how to get involved, and future goals in a friendly, helpful tone.
`;

const puterChat = puter.ai.chat({
  systemPrompt: systemPrompt,
});

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage('You', input);
  userInput.value = '';

  const reply = await puterChat.send(input);
  appendMessage('AgriBot', reply.text);
}

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.classList.add('chat-message');
  div.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatlog.appendChild(div);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function setSampleQuestion(text) {
  userInput.value = text;
  userInput.focus();
}