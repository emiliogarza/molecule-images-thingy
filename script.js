/* Var Defaults */
var elems = document.querySelectorAll(".molecular__molecule"),
    currentSlide = 0,
    desktopJSLoaded = false,
    slideInterval = function() {
        nextMoleculeInterval = setInterval(nextMolecule, 5000);
    };

/* Inits */
init();
window.addEventListener('resize', debounce(function() {
    init();
}, 250));

/* Bind Stuff to the little Circles */
function loadDesktopBindings() {
    slideInterval();
    desktopJSLoaded = true;
    elems.forEach(function(el,i) {
        el.addEventListener("mouseover", function(){
            appendContentToTheMiddleCircle(this.dataset.content);
            goToMolecule(i);
            clearInterval(nextMoleculeInterval);
        });
        el.addEventListener("mouseout", slideInterval);
        el.addEventListener("click", function(e) {
            e.preventDefault();
        });
    });
}

/* Fns for auto-rotation and hovers */
function appendContentToTheMiddleCircle(content) {
    document.querySelectorAll(".molecular__innercircle")[0].innerHTML = content;
}

function nextMolecule() {
    elems[currentSlide].className = 'molecular__molecule';
    currentSlide = (currentSlide + 1) % elems.length;
    elems[currentSlide].className = 'molecular__molecule molecular__molecule--selected';
    appendContentToTheMiddleCircle(document.querySelectorAll(".molecular__paragraph")[currentSlide].innerHTML);
}

function goToMolecule(m) {
    elems[currentSlide].className = 'molecular__molecule';
    currentSlide = (m + elems.length) % elems.length;
    elems[currentSlide].className = 'molecular__molecule molecular__molecule--selected';
    appendContentToTheMiddleCircle(document.querySelectorAll(".molecular__paragraph")[currentSlide].innerHTML);
}

function init() {
    if (getComputedStyle(document.body).getPropertyValue("--molecularDevice") == "desktop") {
        /* If we haven't bound to little circles, do so and kick off rotation */
        if (desktopJSLoaded == false) {
            loadDesktopBindings();
        }
        /* If we have already loaded the stuff, just kick off the rotation */
        else {
            slideInterval();
        }
    }
    else {
        /* Stop the rotation on mobile */
        if (typeof nextMoleculeInterval !== 'undefined') {
            clearInterval(nextMoleculeInterval);
        }
    }
}

/* Debounce function for Resize Event.
From underscore.js: https://underscorejs.org/#debounce  */
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