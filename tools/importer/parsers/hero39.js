/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero'];

  // Second row: Background image (none present)
  const backgroundRow = [''];

  // Third row: Content (heading, description, CTA)
  let contentCell = '';
  const headerBlock = element.querySelector('[data-cmp-is="header-generic-title-block"]');
  if (headerBlock) {
    const contentItems = [];
    // Heading
    const h1 = headerBlock.querySelector('h1');
    if (h1) contentItems.push(h1);
    // Description block
    const mediumText = headerBlock.querySelector('.medium-text');
    if (mediumText) contentItems.push(mediumText);
    // CTA Button
    const ctaDiv = headerBlock.querySelector('.header-title__button');
    if (ctaDiv) contentItems.push(ctaDiv);
    // if any content found, set as the cell value
    if (contentItems.length > 0) contentCell = contentItems;
  }

  const cells = [
    headerRow,
    backgroundRow,
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
