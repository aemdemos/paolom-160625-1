/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards13)'];

  // Find the wrapper that contains the cards
  let cardsWrapper = element.querySelector('.cmp-pmi-dynamic-carousel__body-wrapper');
  if (!cardsWrapper) cardsWrapper = element;
  // Collect all direct children that are cards
  const teasers = Array.from(cardsWrapper.querySelectorAll(':scope > .cmp-pmi-dynamic-carousel__teaser'));

  const rows = [headerRow];

  // For each card, extract image (first cell), and title+desc (second cell)
  teasers.forEach(teaser => {
    // Card link (usually wraps the whole card)
    const cardLink = teaser.querySelector(':scope > a');
    const cardRoot = cardLink || teaser;
    
    // Find image (first image in the card)
    let img = cardRoot.querySelector('img');
    // Find title (prefer .teaser-title or .h3)
    let title = cardRoot.querySelector('.teaser-title, .h3');
    // Find description
    let desc = cardRoot.querySelector('.teaser-description');
    
    // Second cell: Title (strong), <br> (if desc), then desc (span), all as DOM elements
    const parts = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      parts.push(strong);
    }
    if (title && desc) {
      parts.push(document.createElement('br'));
    }
    if (desc) {
      const span = document.createElement('span');
      span.textContent = desc.textContent.trim();
      parts.push(span);
    }
    // Add to rows. Use referenced elements, not clones.
    rows.push([
      img || '',
      parts
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}