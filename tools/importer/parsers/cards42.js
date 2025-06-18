/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards42)'];

  // Find card containers (the two direct children that make up the card)
  const cardItems = element.querySelectorAll(':scope > .cmp-splitlayout > .cmp-splitlayout-40-60 > .cmp-splitlayout__container > .cmp-splitlayout__container-item');
  if (cardItems.length !== 2) return;

  // First column: image (reference the <img> element, not clone)
  const imageWrap = cardItems[0];
  let imageEl = imageWrap.querySelector('img');
  // Defensive: check if image exists
  imageEl = imageEl || '';

  // Second column: collect text block, preserve original elements
  const textCol = cardItems[1];
  const textParts = [];

  // Label (optional)
  const label = textCol.querySelector('.headertitleblock__labels');
  if (label) {
    textParts.push(label);
    // Add dotted border if present (not visible text, so not required in output structure)
  }

  // Heading
  const title = textCol.querySelector('h2, .headertitleblock__title');
  if (title) {
    textParts.push(title);
  }

  // Description (the .medium-text usually contains a <p>)
  const desc = textCol.querySelector('.medium-text');
  if (desc) {
    textParts.push(desc);
  }

  // CTA link (if any)
  const cta = textCol.querySelector('.cmp-multilinklist__list-item-link');
  if (cta) {
    textParts.push(cta);
  }

  // Arrange into blocks as per the structure: header, then [image, text]
  const rows = [
    headerRow,
    [imageEl, textParts]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
