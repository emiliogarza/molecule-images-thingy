var elems = document.querySelectorAll(".molecular__molecule");
var currentSlide = 0;
var slideInterval = function() {
    nextMoleculeInterval = setInterval(nextMolecule, 5000);
}

elems.forEach(function(el,i) {
  el.addEventListener("mouseover",function() {
    appendContentToTheMiddleCircle(this.dataset.content);
    goToMolecule(i);
    clearInterval(nextMoleculeInterval);
  });
  el.addEventListener("mouseout", function() {
    slideInterval();
  });
});

/*Get the slider going*/
slideInterval();

function appendContentToTheMiddleCircle(content) {
    document.querySelectorAll(".molecular__innercircle")[0].innerHTML = content;
}

function nextMolecule() {
    elems[currentSlide].className = 'molecular__molecule';
    currentSlide = (currentSlide + 1) % elems.length;
    elems[currentSlide].className = 'molecular__molecule molecular__molecule--selected';
    appendContentToTheMiddleCircle(elems[currentSlide].dataset.content);
}

function goToMolecule(m) {
    elems[currentSlide].className = 'molecular__molecule';
    currentSlide = (m + elems.length) % elems.length;
    elems[currentSlide].className = 'molecular__molecule molecular__molecule--selected';
    appendContentToTheMiddleCircle(elems[currentSlide].dataset.content);
}