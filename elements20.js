import { WfuLightbox } from 'https://cdn.jsdelivr.net/gh/coexinbrandcom/slycantrust/webflow-element-lightbox.js';

$(function() {
    const wfuLightbox = new WfuLightbox();
    const fullCaptionDiv = $('#fullCaption');
  
    $("[wfu-lightbox-captions]").each(function() {
        wfuLightbox.initializeLightbox($(this));
    });
  
    let observer = new MutationObserver(lightBoxStateCallback);
    observer.observe(document.getElementsByTagName("html")[0], {
        attributes: true,
        attributeFilter: ["class"]
    });
  
    function lightBoxStateCallback(mutationList, observer) {
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
    }
  
    let lightboxNavObserver;
  
    function setupCaption() {
        const figure = $("figure.w-lightbox-figure");
        const img = figure.children("img");
        const key = img.attr("src");
        const thumb = $(`img[ref-key='${key}']`);
        const caption = thumb.attr("alt");

        fullCaptionDiv.text(caption);
      
        figure.children("figcaption").remove();
      
        if (caption) {
            figure.append(
                $(`<figcaption class="w-lightbox-caption">${caption}</figcaption>`)
            );
        }
    }
  
    function uninstallLightBoxNavObserver() {
        if (lightboxNavObserver)
            lightboxNavObserver.disconnect();
    }
  
    function installLightBoxNavObserver() {
        setupCaption();
      
        lightboxNavObserver = new MutationObserver(lightBoxNavCallback);
        lightboxNavObserver.observe($(".w-lightbox-container")[0], {
            childList: true,
            subtree: true
        });
    }
  
    function lightBoxNavCallback(mutationList, observer) {
        for (let mutation of mutationList) {
            if ($(mutation.target).hasClass("w-lightbox-content")) {
                setupCaption();
            }
        }
    }
});
