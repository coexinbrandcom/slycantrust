function setupCaption() {
  const figure = $("figure.w-lightbox-figure");
  const img = figure.children("img");
  const key = img.attr("src");
  const thumb = $(`img[ref-key='${key}'`);
  const caption = thumb.attr("alt");

  figure.children("figcaption").remove();

  if (caption) {
    const figcaption = $(`<figcaption class="w-lightbox-caption">${caption}</figcaption>`);
    figure.append(figcaption);

    // Check if the caption text is truncated
    const isTruncated = figcaption[0].scrollWidth > figcaption[0].clientWidth;

    if (isTruncated) {
      // Add a tooltip to show the complete caption on hover
      figcaption.attr("title", caption);
    }
  }
}
