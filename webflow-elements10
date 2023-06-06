import { WfuLightbox } from 'https://cdn.jsdelivr.net/gh/coexinbrandcom/slycantrust/webflow-element-lightbox.js';

$(function () {
  const wfuLightbox = new WfuLightbox();

  $("[wfu-lightbox-captions]").each(function () {
    wfuLightbox.initializeLightbox($(this));
  });

  let observer = new MutationObserver(lightBoxStateCallback);
  observer.observe(document.getElementsByTagName("html")[0], {
    childList: false,
    subtree: false,
    characterDataOldValue: false,
    attributes: true,
    attributeFilter: ["class"]
  });
});

const lightBoxStateCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'attributes') {
      if ($("html").hasClass("w-lightbox-noscroll")) {
        console.debug("Lightbox opened.");
        installLightBoxNavObserver();
      } else {
        console.debug("Lightbox closed.");
        uninstallLightBoxNavObserver();
      }
    }
  }
};

let lightboxNavObserver;

function setupCaption() {
  const figure = $(".w-lightbox-container .w-lightbox-view");
  const img = figure.children("img");
  const key = img.attr("src");
  const thumb = $(`img[ref-key='${key}']`);
  const caption = thumb.attr("alt");

  const captionBlock = $("<div class='caption-block'></div>");
  const captionText = $("<p class='caption-text'></p>").text(caption);

  figure.find(".caption-block").remove();

  if (caption) {
    captionBlock.append(captionText);
    figure.append(captionBlock);
  }
}

function uninstallLightBoxNavObserver() {
  if (lightboxNavObserver) {
    lightboxNavObserver.disconnect();
  }
}

function installLightBoxNavObserver() {
  setupCaption();

  lightboxNavObserver = new MutationObserver(lightBoxNavCallback);
  lightboxNavObserver.observe($(".w-lightbox-container")[0], {
    childList: true,
    subtree: true
  });
}

const lightBoxNavCallback = (mutationList, observer) => {
  for (let mutation of mutationList) {
    if ($(mutation.target).hasClass("w-lightbox-view")) {
      setupCaption();
    }
  }
};
