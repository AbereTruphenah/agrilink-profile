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

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

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
const chatlog = document.getElementById("chatlog");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const chatbotResponses = `
You are AgriBot, the helpful assistant for AgriLink — a startup founded by Truphenah Abere in 2025.
AgriLink connects small-scale farmers in East Africa directly to buyers, eliminating middlemen and increasing farmer profits by up to 35%.
The platform provides mobile access, logistics scheduling, and fair market prices.

hello: Hello! Welcome to AgriLink. How can I help you today?
hi: Hi there! I'm here to answer questions about AgriLink.
name: AgriLink
Mission: To empower farmers through market data, logistics, and equitable access.
Vision: A future where every farmer thrives through digital tools and direct access to markets.
Origin Story: Founded in 2025 by Truphenah Abere, a daughter of small-scale farmers, AgriLink aims to solve inefficiencies in agricultural markets by directly connecting farmers and buyers.
Services: Produce marketplace, logistics coordination, mobile payment support.
what is agrilink: AgriLink is a digital platform that connects farmers directly to markets, eliminating middlemen and increasing farmer profits by up to 35%.

pricing: Our platform charges a small 3% transaction fee, much lower than traditional middlemen who take 30-40%. Farmers keep 97% of their sale price.
farmers: We currently serve over 15,000 farmers across Kenya, helping them access better markets and fair prices.
countries: We currently operate in Central and Western Kenya, with plans to expand across East Africa
impact: We've helped farmers increase their income by 35% on average, reduced post-harvest losses by 25%, and connected rural farmers to urban markets.
founder:AgriLink was founded by by Truphenah Abere, a daughter of small-scale farmers passionate about empowering smallholder farmers.

Team: Truphenah Abere (Founder & CEO), Felix Maina (CTO), Gilbert Rono (Head of Operations), Stacy Apondi (Head of Partnerships)
how does it work: Farmers list their produce on our mobile platform, buyers place orders directly, and our logistics network handles pickup and delivery. Payments are processed instantly via mobile money.
investment: We're always open to partnerships and investment opportunities. Please contact us through our contact form or email.

Contact: hello@agrilink.co.ke | +254-700-123-456 | https://www.linkedin.com/in/agrilink
`;


function appendQAPair(userText, botText) {
  const qaDiv = document.createElement("div");
  qaDiv.className = "qa-pair";

  const userLine = document.createElement("div");
  userLine.className = "message user-message";
  userLine.textContent = userText;

  const botLine = document.createElement("div");
  botLine.className = "message bot-message";
  botLine.textContent = botText;

  qaDiv.appendChild(userLine);
  qaDiv.appendChild(botLine);
  chatlog.appendChild(qaDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = message;
  chatlog.appendChild(messageDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}

async function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  userInput.value = "";

  appendQAPair(userText, "Thinking...");

  try {
    const prompt = `${chatbotResponses}\n\nUser: ${userText}\nAgriBot:`;
    const response = await puter.ai.chat(prompt);

    
    chatlog.lastChild.remove();
    appendQAPair(userText, response);
    
  }
  catch (error) {
    console.error("Puter AI error:", error);
    chatlog.lastChild.remove(); // remove placeholder
    appendQAPair(userText, "Sorry, something went wrong connecting to our AI.");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});


// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
            
  const submitBtn = this.querySelector('.submit-button');
  const name = this.querySelector("input[type='text']").value;
  const originalText = submitBtn.textContent;
            
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
            
  setTimeout(() => {
    submitBtn.textContent = 'Message Sent!';
    alert("Thank you for contacting us, " + name + "! We'll get back to you soon.");
    submitBtn.style.background = '#28a745';
                
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '#2E8B57';
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  }, 1000);
});
