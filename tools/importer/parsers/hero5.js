/* global WebImporter */
export default function parse(element, { document }) {
  // Derive table rows based on the markdown example:
  // 1. Header row: 'Hero'
  // 2. Image row: empty (no background image)
  // 3. Content row: heading, subheading, extra info as in the block

  // 1. Header row, exactly as the example
  const headerRow = ['Hero'];

  // 2. Image row (none in HTML, empty string)
  const imageRow = [''];

  // 3. Content row: collect all relevant content from the element
  // Use references to existing elements, not clones
  const contentCell = [];

  // Optional label at the top
  const label = element.querySelector('.headerblock__labels');
  if (label && label.textContent.trim()) {
    contentCell.push(label);
    contentCell.push(document.createElement('br'));
  }
  // Heading (h1)
  const h1 = element.querySelector('h1.headerblock__title');
  if (h1) {
    contentCell.push(h1);
  }
  // Subheading (author line)
  const subheading = element.querySelector('.headerblock__authors');
  if (subheading && subheading.textContent.trim()) {
    contentCell.push(subheading);
  }
  // Read time (optional at the bottom)
  const readTime = element.querySelector('.headerblock__read-time');
  if (readTime && readTime.textContent.trim()) {
    contentCell.push(document.createElement('br'));
    contentCell.push(readTime);
  }
  // Make sure cell is never empty
  if (contentCell.length === 0) {
    contentCell.push('');
  }
  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // No section metadata in example: do NOT add <hr> or Section Metadata table
  element.replaceWith(table);
}
