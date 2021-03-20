/**
 * This renders a Cookie consent banner into the page.
 */
(function (ready) {
  if (document.readyState === "complete") {
    ready();
  } else {
    document.addEventListener("readystatechange", function (event) {
      if (document.readyState === "complete") {
        ready();
      }
    });
  }
})(function main() {
  /* the document is now ready. */
  var consentBannerEl = document.createElement("div");
  consentBannerEl.classList.add("consent-banner");
  consentBannerEl.innerHTML = `
        <div class="container">
        <p>This website uses cookies to ensure you get the best experience on our website.</p>
        <div>
            <a href="javascript:void(0);" class="btn-decline">Decline</a>
            <a href="javascript:void(0);" class="btn-accept">I Understand</a>
        </div>
        </div>
      `;
  consentBannerEl.querySelector(".btn-decline").addEventListener("click", function () {
    document.body.removeChild(consentBannerEl);
  });
  consentBannerEl.querySelector(".btn-accept").addEventListener("click", function () {
    document.body.removeChild(consentBannerEl);
  });

  setTimeout(() => {
      document.body.insertBefore(consentBannerEl, document.body.children[0]);
  }, 1000);
});
