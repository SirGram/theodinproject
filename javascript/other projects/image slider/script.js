const slides = document.querySelectorAll(".slide");
const buttonSlider = document.querySelector(".button-slider");

slides.forEach((slide, index) => {
  slide.style.visibility = "hidden";
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    showSlide(index);
  });
  buttonSlider.appendChild(button);
});

let currentSlide = -1;

const buttons = document.querySelectorAll("button");

function showSlide(index) {
    currentSlide = index;
  buttons.forEach((button) => {
    button.style.opacity = 0.2;
  });
  buttons[currentSlide].style.opacity = 1
  slides.forEach((slide) => {
    slide.style.visibility = "hidden";
  });
  slides[index].style.visibility = "visible";  
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function autoAdvance() {
  setInterval(nextSlide, 1500);
}
autoAdvance();
