/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Cards (cards31)'];

  // Find all direct card teasers (ignore swiper-duplicate, etc. by unique href + title)
  const cardNodes = Array.from(element.querySelectorAll('.cmp-pmi-dynamic-carousel__teaser'));

  // Deduplicate cards based on href + title text
  const seen = new Set();
  const uniqueCards = [];
  cardNodes.forEach(card => {
    const link = card.querySelector('a[href]');
    const title = card.querySelector('.teaser-title');
    const key = (link ? link.getAttribute('href') : '') + '|' + (title ? title.textContent.trim() : '');
    if (!seen.has(key)) {
      seen.add(key);
      uniqueCards.push(card);
    }
  });

  // Build table rows for each card
  const rows = uniqueCards.map(card => {
    // First cell: image (with caption if present)
    let imageElem = null;
    const imgContainer = card.querySelector('.cmp-image');
    if (imgContainer) {
      // Use only the actual <img> element (do not clone)
      const img = imgContainer.querySelector('img');
      if (img) {
        // If there's a caption, include it as well, in a div
        const caption = imgContainer.querySelector('.cmp-image__title');
        if (caption) {
          // Wrap both img and caption in a div
          const wrapper = document.createElement('div');
          wrapper.appendChild(img);
          wrapper.appendChild(caption);
          imageElem = wrapper;
        } else {
          imageElem = img;
        }
      }
    }
    // Second cell: text (title, description)
    const textParts = [];
    const teaserTitle = card.querySelector('.teaser-title');
    if (teaserTitle) {
      // Example structure uses bold for the title
      const strong = document.createElement('strong');
      strong.innerHTML = teaserTitle.innerHTML;
      textParts.push(strong);
    }
    const desc = card.querySelector('.teaser-description');
    if (desc) {
      // Place description as a div (preserving its style as per source)
      const divDesc = document.createElement('div');
      divDesc.innerHTML = desc.innerHTML;
      textParts.push(divDesc);
    }
    // (No CTA link at the bottom in this block's HTML)
    return [imageElem, textParts];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
