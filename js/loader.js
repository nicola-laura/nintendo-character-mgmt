// LOADING ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").style.visibility = "hidden";
  document.querySelector(".loader").style.visibility = "visible";

  setTimeout(function() {
      document.querySelector(".loader").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
  }, 1000);
});