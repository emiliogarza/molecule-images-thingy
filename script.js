/* Var Defaults */
var elems = document.querySelectorAll(".molecular__molecule");
var currentSlide = 0;
/* Something is wrong with this desktopJSLoaded Flad.. will have to investigate further tomorrow. */
var desktopJSLoaded = false;
var slideInterval = function() {
    nextMoleculeInterval = setInterval(nextMolecule, 5000);
}

init();
window.addEventListener('resize', debounced);

/*Controls For Desktop*/
function loadDesktopBindings() {
    elems.forEach(function(el,i) {
        el.addEventListener("mouseover",function() {
            appendContentToTheMiddleCircle(this.dataset.content);
            goToMolecule(i);
            clearInterval(nextMoleculeInterval);
        });
        el.addEventListener("mouseout", function() {
            slideInterval();
        });
        el.addEventListener("click", function(e) {

        });
    });
    slideInterval();
    desktopJSLoaded = true;
}
function unLoadDesktopBindings() {
    elems.forEach(function(el,i) {
        el.removeEventListener("mouseover");
        el.removeEventListener("mouseout");
        el.removeEventListener("click");
    });
}

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

function init() {
    if (getComputedStyle(document.body).getPropertyValue("--device") == "desktop") {
        console.log("Desktop")
        if (desktopJSLoaded == false) {
            console.log("DESKTOP, first time. Such a proud moment.");
            loadDesktopBindings();
        }
    }
    else {
        console.log("You're mobile now son");
        if (desktopJSLoaded) {
            console.log("You used to be desktop, but you have now traded to the dark side...");
            clearInterval(nextMoleculeInterval);
            unLoadDesktopBindings();
        }
    }
}

/* For measuring window resize stuff */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

var debounced = debounce(function() {
    init();
}, 250);