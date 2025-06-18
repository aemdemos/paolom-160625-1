/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel container for the cards
  const carouselBody = element.querySelector('.pmidynamiccarousel .cmp-teaser-container .cmp-pmi-dynamic-carousel__body-wrapper');
  if (!carouselBody) return;

  // Use a Set to deduplicate slides by their a[href] links
  const seenLinks = new Set();
  const cardRows = [];
  carouselBody.querySelectorAll(':scope > .cmp-pmi-dynamic-carousel__teaser').forEach(teaser => {
    const link = teaser.querySelector('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (seenLinks.has(href)) return;
    seenLinks.add(href);
    // Get image (prefer .cmp-image > img)
    const teaserContent = link.querySelector('.teaser');
    let imageEl = '';
    if (teaserContent) {
      const cmpImg = teaserContent.querySelector('.cmp-image');
      if (cmpImg) {
        const img = cmpImg.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Get title and description
    let titleEl = null;
    let descEl = null;
    if (teaserContent) {
      titleEl = teaserContent.querySelector('.teaser-title');
      descEl = teaserContent.querySelector('.teaser-description');
    }
    // Compose the right cell: title and description, as elements
    const rightCell = [];
    if (titleEl) rightCell.push(titleEl);
    if (descEl) rightCell.push(descEl);
    cardRows.push([imageEl, rightCell]);
  });

  // If no cards, don't replace
  if (!cardRows.length) return;

  // Create the table: header, then all cards
  const cells = [
    ['Cards (cards16)'],
    ...cardRows
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
