let text = document.querySelector("h1");

text.onclick = function updateText() {
    text.textContent = "Great job setting up your Github!"
    text.style = "Color: red";
}