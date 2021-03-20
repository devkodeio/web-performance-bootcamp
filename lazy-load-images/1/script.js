document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = [...document.querySelectorAll("img.lazy")];
  const inAdvance = 300;

  const _throttle = (func, delay) => {
    let inThrottle;
    return function () {
      if (!inThrottle) {
        func.apply(this, arguments);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, delay);
      }
    };
  };

  function lazyLoad() {
    lazyImages.forEach((image) => {
      if (
        image.offsetTop <
        window.innerHeight + window.pageYOffset + inAdvance
      ) {
        if (!image.dataset.src) return;
        image.src = image.dataset.src;
        delete image.dataset.src;
        image.onload = () => image.classList.remove("lazy");
      }
    });
  }

  lazyLoad();

  window.addEventListener("scroll", _throttle(lazyLoad, 16));
  window.addEventListener("resize", _throttle(lazyLoad, 16));
});
