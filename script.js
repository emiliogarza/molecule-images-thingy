var elems = document.querySelectorAll(".molecular__molecule");

elems.forEach(function(el,i) {
  el.addEventListener("click",function() {
    appendContentToTheMiddleCircle(this.dataset.content);
  });
});

function appendContentToTheMiddleCircle(content) {
  document.querySelectorAll(".molecular__innercircle")[0].innerHTML = content;
}