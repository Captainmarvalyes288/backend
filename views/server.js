document.querySelectorAll('.blog').forEach(function(item) {
    item.addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(this);
    });
});

document.addEventListener("keypress", function(event) {
    if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
        makeSound(event.key);
        buttonAnimation(document.querySelector('.blog')); 
    }
});

document.addEventListener("click", function(event) {
    if (event.target.closest('.blog')) {
        var key = event.target.textContent.trim().toLowerCase();
        makeSound(key);
        buttonAnimation(event.target.closest('.blog')); 
    }
});

function makeSound(key) {
    var tom1 = new Audio("sounds/snare.mp3");
    tom1.play();
}

function buttonAnimation(element) {
    element.classList.add("pressed");
    setTimeout(function() {
        element.classList.remove("pressed");
    }, 100);
}