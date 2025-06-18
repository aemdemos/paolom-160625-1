/* global WebImporter */
export default function parse(element, { document }) {
  // Build cells for Hero block
  const cells = [];
  // 1. Header row: must be exactly 'Hero' (no markdown)
  cells.push(['Hero']);
  // 2. Second row: background image (none in this case)
  cells.push(['']);
  // 3. Third row: Title, subheading/label, and description
  const content = [];
  // Optional subheading label
  const label = element.querySelector('.headertitleblock__labels');
  if (label) content.push(label);
  // Main heading (h1)
  const h1 = element.querySelector('h1');
  if (h1) content.push(h1);
  // Paragraph/description
  const medium = element.querySelector('.medium-text');
  if (medium) content.push(medium);
  // Add row to table
  cells.push([content]);
  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}