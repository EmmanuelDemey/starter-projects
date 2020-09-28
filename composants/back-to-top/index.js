function initBackToTop() {
  window.onload = function () {
    document.addEventListener(
      "scroll",
      function (e) {
        if (!document.querySelector(".back-to-top")) {
          return;
        }
        if (window.pageYOffset > 100) {
          document.querySelector(".back-to-top").style.display = "block";
        } else {
          document.querySelector(".back-to-top").style.display = "none";
        }
      },
      false
    );
  };

  document.querySelector(".back-to-top").addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
initBackToTop();
