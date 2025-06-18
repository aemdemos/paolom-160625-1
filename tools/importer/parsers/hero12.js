/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const headerRow = ['Hero'];
  // Second row: Background image (here it's empty)
  const bgRow = [''];

  // Third row: All relevant Hero content from the HTML, referenced not cloned
  const headerBlock = element.querySelector('.headertitleblock');
  let contentCell = [''];
  if (headerBlock) {
    const content = [];
    // Label (Get in touch) and border
    const h5 = headerBlock.querySelector('.h5');
    if (h5) content.push(h5);
    // Main title (h2)
    const h2 = headerBlock.querySelector('h2');
    if (h2) content.push(h2);
    // Subheading paragraph
    const mediumText = headerBlock.querySelector('.medium-text');
    if (mediumText) content.push(mediumText);
    // CTA button
    const cta = headerBlock.querySelector('.header-title__button');
    if (cta) content.push(cta);
    // Only set as cell if we have actual content
    if (content.length > 0) contentCell = [content];
  }

  // Compose the table rows
  const rows = [headerRow, bgRow, contentCell];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
